import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
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
        var index = 100;
        // if (!selectedAudio && selectList.length !== 0) {
        //   console.log(selectedAudio);
        //   for (var i = 0; i < selectList.length; i++) {
        //     if (selectList[i] === 'audio') {
        //       index = i;
        //     }
        //   }
        //   selectList.splice(i, 1);
        //   console.log('delete audio');
        //   console.log(selectList);
        // } else {
        //   console.log(selectedAudio);
        //   selectList.push('audio');
        //   console.log('add audio');
        //   console.log(selectList);
        //   console.log(selectedAudio);
        // }
        if (selectedAudio) {
          // setSelectList(selectList.concat('audio'));
          // console.log('add audio');
          // console.log(selectList);
          // console.log(selectedAudio);

          for (var i = 0; i < selectList.length; i++) {
            if (selectList[i] === 'audio') {
              index = i;
            }
          }
          setSelectList(selectList.filter(item => item !== 'audio'));
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
        selectedCamera ? setSelectedCamera(false) : setSelectedCamera(true);
        console.log('select camera');
        var index = -2;

        if (selectedCamera) {
          selectList.push('camera');
          console.log('add aucameradio');
          console.log(selectList);
          // console.log(selectedAudio);
        }
        if (!selectedCamera && selectList.length !== 0) {
          for (var i = 0; i < selectList.length; i++) {
            if (selectList[i] === 'camera') {
              index = i;
            }
          }
          selectList.splice(index, 1);
          console.log('delete camera');
          console.log(selectList);
          // console.log(selectedAudio);
        }
        break;
      case 'imageFromGallery':
        selectedImagefromGallery
          ? setSelectedImagefromGallery(false)
          : setSelectedImagefromGallery(true);
        console.log('select imageFromGallery');
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
    <ScrollView>
      <View style={styles.screen}>
        <TitleName>Jing Wu</TitleName>
        <MainTitle style={styles.mainTitle}>Study name : {studyName}</MainTitle>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitleText}>Add new question</Text>
        </View>
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
      </View>
      <Text>Audio:{selectedAudio.toString()}</Text>
      <Text>Camera:{selectedCamera.toString()}</Text>
      <Text>{selectList.toString()}</Text>
      {/* <DropDownPicker
        items={[
          {
            label: 'UK',
            value: 'uk',
            icon: () => <Icon name='flag' size={18} color='#900' />,
          },
          {
            label: 'France',
            value: 'france',
            icon: () => <Icon name='flag' size={18} color='#900' />,
          },
        ]}
        defaultValue={dropdown}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => setdropdown(item.value)}
      /> */}
      {/* <DropDownPicker
        items={[
          { label: 'Item 1', value: 'item1' },
          { label: 'Item 2', value: 'item2' },
        ]}
        defaultIndex={0}
        containerStyle={{ height: 40 }}
        onChangeItem={(item) => console.log(item.label, item.value)}
      /> */}
    </ScrollView>
  );
};

AddStudyQuestionScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Add Study question',
    headerRight: () => <SaveButton onPress={() => {}} />,
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
  subTitleContainer: {
    marginTop: 15,
  },
  subTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
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
