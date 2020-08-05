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
import * as Choice from '../../components/Choice';
import Colors from '../../constants/Colors';
import * as questionActions from '../../store/actions/question';
import SaveButton from '../../components/SaveButton';
import * as DropdownPicker from '../../components/DropDownPicker';
import SubtitleInput from '../../components/SubtitleInput';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AddStudyQuestionScreen = (props) => {
  const [questionContent, setQuetionContent] = useState();

  const studyName = props.navigation.getParam('sdName');

  const [dropdown, setDropdown] = useState();
  const [isSingleChoice, setIsSingleChoice] = useState(false);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);

  const [option1, setOption1] = useState();
  const [option2, setOption2] = useState();
  const [option3, setOption3] = useState();
  const [option4, setOption4] = useState();
  const [option5, setOption5] = useState();
  const [option6, setOption6] = useState();

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
    setOption1();
    setOption2();
    setOption3();
    setOption4();
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
          height: screenHeight,
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

          <DropdownPicker.ChooseTypeDropdownPicker
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
              <Choice.SingleChoice
                option1={option1}
                setOption1={(newText) => setOption1(newText)}
                option2={option2}
                setOption2={(newText) => setOption2(newText)}
                option3={option3}
                setOption3={(newText) => setOption3(newText)}
                option4={option4}
                setOption4={(newText) => setOption4(newText)}
              >
                Set the <Text style={styles.hightlightText}>single</Text>{' '}
                choice's options
              </Choice.SingleChoice>
            </View>
          )}
        </View>
        <View style={styles.optionsContainer}>
          {/* {selectedMultiChoice && ( */}
          {isMultipleChoice && (
            <View>
              <Choice.MultipleChoice
                option1={option1}
                setOption1={(newText) => setOption1(newText)}
                option2={option2}
                setOption2={(newText) => setOption2(newText)}
                option3={option3}
                setOption3={(newText) => setOption3(newText)}
                option4={option4}
                setOption4={(newText) => setOption4(newText)}
                option5={option5}
                setOption5={(newText) => setOption5(newText)}
                option6={option6}
                setOption6={(newText) => setOption6(newText)}
              >
                Set the <Text style={styles.hightlightText}>multiple</Text>{' '}
                choice's options
              </Choice.MultipleChoice>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {/* <Text>Audio:{selectedAudio.toString()}</Text>
        <Text>Camera:{selectedCamera.toString()}</Text>
        <Text>{selectList.toString()}</Text> */}
        <CommonButton
          onPress={() => console.log(option1, option2, option3, option4)}
        >
          Save
        </CommonButton>
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
    borderWidth: 1,
    borderColor: 'green',
  },
});

export default AddStudyQuestionScreen;
