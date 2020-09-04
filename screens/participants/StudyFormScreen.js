import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

import Colors from '../../constants/Colors';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import CommonButton from '../../components/CommonButton';
import AnswerIcon from '../../components/AnswerIcon';
import SingleChoice from '../../components/SingleChoice';
import InputWithoutLabel from '../../components/InputWithoutLabel';
import * as studyActions from '../../store/actions/study';
import createTimestamp from '../../functions/createTimestamp';
import * as ShowInfo from '../../components/ShowInfo';
import URL from '../../constants/URL';

const StudyFormScreen = (props) => {
  const studyNumber = props.navigation.getParam('studyNumber');
  const userName = useSelector((state) => state.userName.userName);

  const study = useSelector((state) =>
    state.studies.participant_studies.find(
      (sd) => sd.studyNumber === studyNumber
    )
  );
  const preStudyAnswers = useSelector(
    (state) => state.preStudyAnswers.preStudyAnswers
  );

  const questions = study.questions;

  const [modalVisible, setModalVisible] = useState(false);
  const [submitTime, setSubmitTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(
    // create an array which length equals to the data's length,
    // and every element in the array is false
    Array(questions.length).fill(false)
  );

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const ParticipantListRetrieval = () => {
    let url = URL.address + 'study/participant/?email=' + userName;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(studyActions.initialize_participant_studies(json));
      });
  };

  const updateVisibility = (index) => {
    const previous = visibility[index];
    if (previous) {
      let markers = [...visibility];
      markers[index] = false;
      setVisibility(markers);
    } else {
      let markers = [...visibility];
      markers[index] = true;
      setVisibility(markers);
    }
  };

  const updateAnswers = (index, value) => {
    let updateAnswers = [...answers];
    updateAnswers[index] = value;
    setAnswers(updateAnswers);
  };

  const recordingOptions = {
    // android not currently in use, but parameters are required
    android: {
      extension: '.m4a',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const startRecording = async (index) => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') return;
    // some of these are not applicable, but are required
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });

    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
    } catch (error) {
      console.log(error);
      await recording.stopAndUnloadAsync();
    }
    updateAnswers(index, recording);
  };

  const stopRecording = async (index) => {
    await answers[index].stopAndUnloadAsync();
    const base64 = await FileSystem.readAsStringAsync(answers[index].getURI(), {
      encoding: FileSystem.EncodingType.Base64,
    });
    updateAnswers(index, { uri: answers[index].getURI(), base64: base64 });
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permission to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeVideoHandler = async (index) => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const video = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    const base64 = await FileSystem.readAsStringAsync(video.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    updateAnswers(index, { uri: video.uri, base64: base64 });
  };

  const takeImageHandler = async (index) => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      // quality between 0-1, 1 is highest
      quality: 0.5,
      base64: true,
    });

    updateAnswers(index, { uri: image.uri, base64: image.base64 });
  };

  const getImageHandler = async (index, type) => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
        base64: true,
      });
      if (!image.cancelled) {
        updateAnswers(index, { uri: image.uri, base64: image.base64, mediaType: type });
      }
    } catch (E) {
      console.log(E);
    }
  };

  const createComponent = (answerType, index, itemData) => {
    switch (answerType) {
      case 'Audio':
        return (
          visibility[index] && (
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPressIn={() => startRecording(index)}
                onPressOut={() => stopRecording(index)}
              >
                <View style={{ alignItems: 'center' }}>
                  <View style={styles.audioButtonContainer}>
                    <Text style={styles.text}>Hold to record</Text>
                  </View>
                  <View style={{ marginBottom: 5 }}>
                    <Text style={{ color: Colors.primary }}>
                      Please less than 20 seconds
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        );
      case 'Video':
        return (
          visibility[index] && (
            <View style={styles.imagePicker}>
              <View style={styles.imageButtonContainer}>
                <CommonButton
                  text={styles.imageButtonText}
                  onPress={() => takeVideoHandler(index)}
                >
                  Take Video
                </CommonButton>
                <View style={{ marginBottom: 5 }}>
                  <Text style={{ color: Colors.primary }}>
                    Please less than 20 seconds
                  </Text>
                </View>
              </View>
              <View style={styles.imagePreview}>
                {answers[index] === null ? (
                  <Text>No video taken yet.</Text>
                ) : (
                  <Image
                    style={styles.image}
                    source={{ uri: answers[index].uri }}
                  />
                )}
              </View>
            </View>
          )
        );
      case 'Photo':
        return (
          visibility[index] && (
            <View style={styles.imagePicker}>
              <View style={styles.imageButtonContainer}>
                <CommonButton
                  text={styles.imageButtonText}
                  onPress={() => takeImageHandler(index)}
                >
                  Take Image
                </CommonButton>
              </View>
              <View style={styles.imagePreview}>
                {answers[index] === null ? (
                  <Text>No image taken yet.</Text>
                ) : (
                  <Image
                    style={styles.image}
                    source={{ uri: answers[index].uri }}
                  />
                )}
              </View>
            </View>
          )
        );
      case 'Gallary':
        return (
          visibility[index] && (
            <View style={styles.imagePicker}>
              <View style={styles.imageButtonContainer}>
                <CommonButton
                  text={styles.imageButtonText}
                  onPress={() => getImageHandler(index, 'image')}
                >
                  Select Image
                </CommonButton>
                <CommonButton
                  text={styles.imageButtonText}
                  onPress={() => getImageHandler(index, 'video')}
                >
                  Select Video
                </CommonButton>
              </View>
              <View style={styles.imagePreview}>
                {answers[index] === null ? (
                  <Text>No image picked yet.</Text>
                ) : (
                  <Image
                    style={styles.image}
                    source={{ uri: answers[index].uri }}
                  />
                )}
              </View>
            </View>
          )
        );
      case 'Type':
        return (
          visibility[index] && (
            <InputWithoutLabel
              value={answers[index]}
              onChangeText={(newText) => updateAnswers(itemData.index, newText)}
            />
          )
        );
      case 'Single':
        return (
          visibility[index] && (
            <View>
              <SingleChoice
                items={[
                  {
                    label: itemData.item.option1,
                    value: itemData.item.option1,
                  },
                  {
                    label: itemData.item.option2,
                    value: itemData.item.option2,
                  },
                  {
                    label: itemData.item.option3,
                    value: itemData.item.option3,
                  },
                  {
                    label: itemData.item.option4,
                    value: itemData.item.option4,
                  },
                ]}
                defaultValue={answers[itemData.index]}
                placeholder='Select the answer'
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                onChangeItem={(item) =>
                  updateAnswers(itemData.index, item.value)
                }
              />
            </View>
          )
        );
      case 'Multiple':
        return (
          visibility[index] && (
            <View>
              <SingleChoice
                items={[
                  {
                    label: itemData.item.option1,
                    value: itemData.item.option1,
                  },
                  {
                    label: itemData.item.option2,
                    value: itemData.item.option2,
                  },
                  {
                    label: itemData.item.option3,
                    value: itemData.item.option3,
                  },
                  {
                    label: itemData.item.option4,
                    value: itemData.item.option4,
                  },
                ]}
                defaultValue={answers[itemData.index]}
                placeholder='Select the answer'
                multiple={true}
                multipleText='%d items have been selected.'
                min={0}
                max={6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                onChangeItem={(item) => {
                  updateAnswers(itemData.index, item);
                }}
              />
            </View>
          )
        );
    }
  };

  const onSubmitHandler = () => {
    Alert.alert(
      '',
      'Are you sure you want to submit? \nYou cannot undo this operation',
      [
        { text: 'Yes', onPress: () => submitHandler() },
        { text: 'No', style: 'cancel' },
      ]
    );
  };

  const submitHandler = () => {
    setIsLoading(true);
    const submitTime = createTimestamp();
    setSubmitTime(submitTime);
    let answerwithtype = [];
    for (let i = 0; i < answers.length; i++) {
      if (questions[i].answerType == 'Multiple') {
        if (answers[i]) {
          answerwithtype.push({
            questionType: questions[i].answerType,
            result: answers[i].toString(),
          });
        } else {
          answerwithtype.push({
            questionType: questions[i].answerType,
            result: null,
          });
        }
      } else {
        answerwithtype.push({
          questionType: questions[i].answerType,
          result: answers[i],
        });
      }
    }

    let url = URL.address + 'study/submitanswer/';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studyNumber: studyNumber,
        preAnswers: preStudyAnswers,
        answers: answerwithtype,
        participantEmail: userName,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success == true) {
          console.log(json);
          ParticipantListRetrieval();
          setModalVisible(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          Alert.alert('', 'Something is wrong. Please try again later', ['OK']);
        }
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size='large' color={Colors.primary} />
        <View style={styles.uploadContainer}>
          <Text
            style={{
              color: Colors.primary,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            It takes some time to upload you answers, please wait.
          </Text>
          <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
            Thank you!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleName>{userName}</TitleName>
      <MainTitle>{study.studyName}</MainTitle>

      <FlatList
        style={styles.flatList}
        data={questions}
        keyExtractor={(item) => item.questionNumber.toString()}
        renderItem={(itemData) => (
          <View style={styles.flatListItemsContainer}>
            <AnswerIcon
              index={itemData.index + 1}
              content={itemData.item.content}
              answerType={itemData.item.answerType}
              onSelect={() => updateVisibility(itemData.index)}
            />
            {createComponent(
              itemData.item.answerType,
              itemData.index,
              itemData
            )}
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <CommonButton onPress={() => onSubmitHandler()}>Submit</CommonButton>
      </View>

      <ShowInfo.ShowShortInfo
        content='Thank you for your submission.'
        dateContent='Submission date and time:'
        time={submitTime}
        visible={modalVisible}
        onPress={() => {
          setModalVisible(!modalVisible);
          props.navigation.navigate('ParStudyList');
        }}
      />
    </View>
  );
};

StudyFormScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Study Form',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioButtonContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    width: Dimensions.get('window').width * 0.5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  flatList: {
    // borderColor: 'green',
    // borderWidth: 1,
    marginBottom: 10,
  },
  flatListItemsContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  imagePicker: {
    alignItems: 'center',
    marginVertical: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageButtonContainer: {
    marginBottom: 8,
    alignItems: 'center',
  },
  imageButtonText: {
    fontSize: 12,
  },

  buttonContainer: {
    marginBottom: 20,
  },
  uploadContainer: {
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StudyFormScreen;
