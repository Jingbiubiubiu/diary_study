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
import DropdownPicker from '../../components/DropDownPicker';
import SubtitleInput from '../../components/SubtitleInput';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AddStudyQuestionScreen = (props) => {
  const [questionContent, setQuetionContent] = useState();

  const studyName = props.navigation.getParam('sdName');

  const [dropdown, setDropdown] = useState();
  const [isSingleChoice, setIsSingleChoice] = useState(false);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);

  const dropdownItems = [
    {
      label: 'Single Choice',
      value: 'single choice',
    },
    {
      label: 'Multiple Choice',
      value: 'multiple choice',
    },
    {
      label: 'Audio',
      value: 'audio',
    },
    {
      label: 'Take photo',
      value: 'camera',
    },
    {
      label: 'Image from Gallery',
      value: 'gallery',
    },
    {
      label: 'Type answer',
      value: 'Type answer',
    },
    {
      label: 'Take video',
      value: 'video',
    },
  ];

  const dropdownHandler = (value) => {
    setDropdown(value);
    if (value === 'single choice') {
      setIsSingleChoice(true);
    }
    if (value !== 'single choice') {
      setIsSingleChoice(false);
    }
    if (value === 'multiple choice') {
      setIsMultipleChoice(true);
    }
    if (value !== 'multiple choice') {
      setIsMultipleChoice(false);
    }
  };

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle style={styles.mainTitle}>Study name : {studyName}</MainTitle>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          height: screenHeight * 0.85,
        }}
      >
        <SubTitle style={{ alignItems: 'center' }}>Add new question</SubTitle>
        <Input
          style={styles.inputBox}
          label='Type Question'
          inputLabel={styles.inputLabel}
          value={questionContent}
          onChangeText={(newText) => setQuetionContent(newText)}
        />
        <View style={styles.dropdownContainer}>
          <SubTitle subTitleText={{ fontSize: 20, fontWeight: 'bold' }}>
            Select answer types
          </SubTitle>

          <DropdownPicker
            items={dropdownItems}
            defaultValue={dropdown}
            // containerStyle={styles.dropdownMenu}
            placeholder='Select the answer type'
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            // labelStyle={styles.dropdownLabel}
            onChangeItem={(item) => dropdownHandler(item.value)}
          />
        </View>

        <View style={styles.optionsContainer}>
          {/* {selectedSingleChoice && ( */}
          {isSingleChoice && (
            <View>
              <Choice>
                Set the <Text style={styles.hightlightText}>single</Text>{' '}
                choice's options
              </Choice>
            </View>
          )}
        </View>
        <View style={styles.optionsContainer}>
          {/* {selectedMultiChoice && ( */}
          {isMultipleChoice && (
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
        {/* <Text>Audio:{selectedAudio.toString()}</Text>
        <Text>Camera:{selectedCamera.toString()}</Text>
        <Text>{selectList.toString()}</Text> */}
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
    width: screenWidth * 0.85,
    // borderColor: 'blue',
    // borderWidth: 1,
  },

  inputBox: {
    marginTop: 15,
    width: screenWidth * 0.85,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  inputLabel: {
    fontSize: 20,
  },
  dropdownContainer: {
    alignItems: 'flex-start',
    // borderWidth: 1,
    // borderColor: 'green',
    width: screenWidth * 0.85,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  hightlightText: {
    color: Colors.primary,
  },
  optionsContainer: {
    width: Dimensions.get('window').width * 0.85,
  },
});

export default AddStudyQuestionScreen;
