import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as DATA from '../../data/dummy-questions';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import CommonButton from '../../components/CommonButton';
import AnswerIcon from '../../components/AnswerIcon';
import SingleChoice from '../../components/SingleChoice';
import InputWithoutLabel from '../../components/InputWithoutLabel';
import * as answersActions from '../../store/actions/answers';
import * as answerPackageActions from '../../store/actions/answerPackage';
import createTimestamp from '../../functions/createTimestamp';
import * as ShowInfo from '../../components/ShowInfo';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const StudyFormScreen = (props) => {
  const studyNumber = props.navigation.getParam('studyNumber');
  const study = useSelector((state) =>
    state.studies.participant_studies.find((sd) => sd.studyNumber === studyNumber)
  );
  const preStudyAnswers = useSelector(
    (state) => state.preStudyAnswers.preStudyAnswers
  );

  // console.log('preAnswe:', preStudyAnswers);
  const questions = study.questions;

  const [modalVisible, setModalVisible] = useState(false);

  const [submitTime, setSubmitTime] = useState(false);

  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(
    // create an array which length equals to the data's length,
    // and every element in the array is false
    Array(questions.length).fill(false)
  );

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

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
    // console.log(index, value);
    let updateAnswers = [...answers];
    // console.log('Original: ', updateAnswers);
    updateAnswers[index] = value;
    setAnswers(updateAnswers);
    // console.log('Update: ', updateAnswers);
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

  const takeImageHandler = async (index) => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      // quality between 0-1, 1 is highest
      quality: 0.5,
    });

    // setPickedImage(image.uri);
    updateAnswers(index, image.uri);
    console.log(pickedImage);

    // props.onImageTaken(image.uri);
  };

  const createComponent = (answerType, index, itemData) => {
    switch (answerType) {
      case 'Audio':
        break;
      case 'Video':
        break;
      case 'Photo':
        return (
          visibility[index] &&
          takeImageHandler(itemData.index) && (
            <Image style={styles.image} source={{ uri: answers[index] }} />
          )
        );
        break;
      case 'Gallary':
        break;
      case 'Type':
        return (
          visibility[index] && (
            <InputWithoutLabel
              value={answers[index]}
              onChangeText={(newText) => updateAnswers(itemData.index, newText)}
            />
          )
        );
        break;
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
        break;
      case 'Multiple':
        // let values = [];
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
                  {
                    label: itemData.item.option5,
                    value: itemData.item.option5,
                  },
                  {
                    label: itemData.item.option6,
                    value: itemData.item.option6,
                  },
                ]}
                defaultValue={answers[itemData.index]}
                // defaultValue={values}
                placeholder='Select the answer'
                multiple={true}
                multipleText='%d items have been selected.'
                min={0}
                max={6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                // onChangeItem={(item) =>
                //   updateAnswers(itemData.index, item.value)
                // }
                onChangeItem={(item) => {
                  // setValues(item);
                  updateAnswers(itemData.index, item);
                  // console.log(item);
                }}
              />
            </View>
          )
        );
        break;
    }
  };

  const onSubmitHandler = () => {
    Alert.alert(
      '',
      'Are you sure you want to submit? You cannot undo this operation',
      [
        { text: 'Yes', onPress: () => submitHandler() },
        { text: 'No', style: 'cancel' },
      ]
    );
  };

  const submitHandler = () => {
    const submitTime = createTimestamp();
    setSubmitTime(submitTime);

    dispatch(
      answerPackageActions.createAnswerPackage(
        studyNumber,
        preStudyAnswers,
        answers,
        submitTime
      )
    );
    setModalVisible(true);
  };

  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle>{study.studyName}</MainTitle>
      <FlatList
        data={questions}
        // listKey={(item) => item.questionId}
        keyExtractor={(item) => item.questionNumber.toString()}
        renderItem={(itemData) => (
          <View>
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

      <Text>Answers:{answers.toString()}</Text>
      {/* <Text>states:{visibility.toString()}</Text> */}
      {/* <Text>{values.toString()}</Text> */}
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
  image: {
    // height: '100%',
    // width: '100%',
    width: Dimensions.get('window').width * 0.85,
    height: 200,
  },

  buttonContainer: {
    marginBottom: 20,
  },
});

export default StudyFormScreen;
