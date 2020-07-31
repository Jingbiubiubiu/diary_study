import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import SubTitle from '../../components/SubTitle';
import Input from '../../components/Input';
import * as Icons from '../../components/Icons';
import CommonButton from '../../components/CommonButton';
import Choice from '../../components/Choice';
import Colors from '../../constants/Colors';
import * as questionActions from '../../store/actions/question';
import SaveButton from '../../components/SaveButton';

const AddStudyQuestionScreen = (props) => {
  const [questionContent, setQuetionContent] = useState();
  const [selectedAudio, setSelectedAudio] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(false);
  const [selectedImagefromGallery, setSelectedImagefromGallery] = useState(
    false
  );
  const [selectedTypeAnswer, setSelectedTypeAnswer] = useState(false);
  const [selectedSingleChoice, setSelectedSingleChoice] = useState(false);
  const [selectedMultiChoice, setSelectedMultiChoice] = useState(false);
  const [selectList, setSelectList] = useState([]);

  const dispatch = useDispatch();

  const selectionIdentifier = (buttonId) => {
    switch (buttonId) {
      case 'audio':
        if (selectedAudio) {
          setSelectList(selectList.filter((item) => item !== 'audio'));
          console.log('delete audio');
          selectedAudio ? setSelectedAudio(false) : setSelectedAudio(true);
        }
        if (!selectedAudio && selectList.length <= 1) {
          setSelectList(selectList.concat('audio'));
          console.log('add audio');
          selectedAudio ? setSelectedAudio(false) : setSelectedAudio(true);
        }

        break;

      case 'camera':
        if (selectedCamera) {
          setSelectList(selectList.filter((item) => item !== 'camera'));
          console.log('delete camera');
          selectedCamera ? setSelectedCamera(false) : setSelectedCamera(true);
        }
        if (!selectedCamera && selectList.length <= 1) {
          setSelectList(selectList.concat('camera'));
          console.log('add camera');
          selectedCamera ? setSelectedCamera(false) : setSelectedCamera(true);
        }
        break;

      case 'imageFromGallery':
        if (selectedImagefromGallery) {
          setSelectList(
            selectList.filter((item) => item !== 'imageFromGallery')
          );
          console.log('delete imageFromGallery');
          selectedImagefromGallery
            ? setSelectedImagefromGallery(false)
            : setSelectedImagefromGallery(true);
        }
        if (!selectedImagefromGallery && selectList.length <= 1) {
          setSelectList(selectList.concat('imageFromGallery'));
          console.log('add imageFromGallery');
          selectedImagefromGallery
            ? setSelectedImagefromGallery(false)
            : setSelectedImagefromGallery(true);
        }
        break;
      case 'typeAnswer':
        selectedTypeAnswer
          ? setSelectedTypeAnswer(false)
          : setSelectedTypeAnswer(true);
        console.log('select typeAnswer');
        break;
      case 'video':
        selectedVideo ? setSelectedVideo(false) : setSelectedVideo(true);
        console.log('select video');
        break;
      case 'singleChoice':
        selectedSingleChoice
          ? setSelectedSingleChoice(false)
          : setSelectedSingleChoice(true);
        console.log('select singleChoice');
        break;
      case 'multipleChoice':
        selectedMultiChoice
          ? setSelectedMultiChoice(false)
          : setSelectedMultiChoice(true);
        console.log('select multipleChoice');
        break;
    }
  };

  // useEffect(() => selectionIdentifier, [selectionIdentifier]);

  const studyName = props.navigation.getParam('sdName');
  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle style={styles.mainTitle}>Study name : {studyName}</MainTitle>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <SubTitle>Add new question</SubTitle>
        <Input
          style={styles.inputBox}
          label='Type Question'
          inputLabel={styles.inputLabel}
          value={questionContent}
          onChangeText={(newText) => setQuetionContent(newText)}
        />
        <View style={styles.selectTypesContainer}>
          <Text style={styles.selectTypesText}>Select answer types</Text>
        </View>
        <View>
          <View style={styles.threeRows}>
            <View style={styles.IconsColumn}>
              <Icons.AudioCheckbox
                id='audio'
                value={selectedAudio}
                onPress={() => selectionIdentifier('audio')}
                onValueChange={() => selectionIdentifier('audio')}
              />
              <Icons.TypeAnswerCheckbox
                id='typeAnswer'
                value={selectedTypeAnswer}
                onPress={() => selectionIdentifier('typeAnswer')}
                onValueChange={() => selectionIdentifier('typeAnswer')}
                textStyle={{ width: Dimensions.get('window').width / 6 }}
              />
            </View>
            <View style={styles.IconsColumn}>
              <Icons.CameraCheckbox
                id='camera'
                value={selectedCamera}
                onPress={() => selectionIdentifier('camera')}
                onValueChange={() => selectionIdentifier('camera')}
              />
              <Icons.VideoCheckbox
                id='video'
                value={selectedVideo}
                onPress={() => selectionIdentifier('video')}
                onValueChange={() => selectionIdentifier('video')}
              />
            </View>

            <View style={styles.IconsColumn}>
              <Icons.ImagefromGalleryCheckbox
                id='imageFromGallery'
                value={selectedImagefromGallery}
                onPress={() => selectionIdentifier('imageFromGallery')}
                onValueChange={() => selectionIdentifier('imageFromGallery')}
              />
              <Icons.SingleChoiceCheckbox
                id='singleChoice'
                value={selectedSingleChoice}
                onPress={() => selectionIdentifier('singleChoice')}
                onValueChange={() => selectionIdentifier('singleChoice')}
              />
            </View>
          </View>
          <View style={styles.lastRow}>
            <Icons.MultipleChoiceCheckbox
              id='multipleChoice'
              value={selectedMultiChoice}
              onPress={() => selectionIdentifier('multipleChoice')}
              onValueChange={() => selectionIdentifier('multipleChoice')}
            />
          </View>
        </View>
        <View>
          {selectedSingleChoice && (
            <View>
              <Choice>
                Set the <Text style={styles.hightlightText}>single</Text>{' '}
                choice's options
              </Choice>
            </View>
          )}
        </View>
        <View>
          {selectedMultiChoice && (
            <View>
              <Choice>
                Set the <Text style={styles.hightlightText}>multiple</Text>{' '}
                choice's options
              </Choice>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Text>Audio:{selectedAudio.toString()}</Text>
        <Text>Camera:{selectedCamera.toString()}</Text>
        <Text>{selectList.toString()}</Text>
        <CommonButton>Save</CommonButton>
      </View>
    </View>
  );
};

AddStudyQuestionScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Add Study question',
    // headerRight: () => <SaveButton onPress={() => {}} />,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    marginTop: 15,
    width: Dimensions.get('window').width * 0.85,
  },

  inputBox: {
    marginTop: 15,
  },
  inputLabel: {
    fontSize: 18,
  },
  selectTypesContainer: {
    marginTop: 20,
  },
  selectTypesText: {
    fontSize: 18,
  },
  threeRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.85,
  },

  IconsColumn: {
    // borderColor: 'red',
    // borderWidth: 1,
    height: Dimensions.get('window').height * 0.14,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  lastRow: {
    marginTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    marginVertical: 30,
  },
  hightlightText: {
    color: Colors.primary,
  },
});

export default AddStudyQuestionScreen;
