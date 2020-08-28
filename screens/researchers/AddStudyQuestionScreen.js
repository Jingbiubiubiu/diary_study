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
import CommonButton from '../../components/CommonButton';
import * as Choice from '../../components/Choice';
import Colors from '../../constants/Colors';
import * as questionActions from '../../store/actions/question';
import * as DropdownPicker from '../../components/DropDownPicker';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AddStudyQuestionScreen = (props) => {
  const userName = useSelector((state) => state.userName.userName);

  const [questionContent, setQuetionContent] = useState();

  const studyName = props.navigation.getParam('sdName');

  const [answerType, setAnswerType] = useState();
  const [isSingleChoice, setIsSingleChoice] = useState(false);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);

  const dispatch = useDispatch();

  const [option1, setOption1] = useState(null);
  const [option2, setOption2] = useState(null);
  const [option3, setOption3] = useState(null);
  const [option4, setOption4] = useState(null);

  const dropdownItems = [
    {
      label: 'Single Choice',
      value: 'Single',
    },
    {
      label: 'Multiple Choice',
      value: 'Multiple',
    },
    {
      label: 'Audio',
      value: 'Audio',
    },
    {
      label: 'Take photo',
      value: 'Photo',
    },
    {
      label: 'Image from Gallery',
      value: 'Gallary',
    },
    {
      label: 'Type answer',
      value: 'Type',
    },
    {
      label: 'Take video',
      value: 'Video',
    },
  ];

  const dropdownHandler = (value) => {
    setAnswerType(value);
    setOption1();
    setOption2();
    setOption3();
    setOption4();
    if (value === 'Single') {
      setIsSingleChoice(true);
    }
    if (value !== 'Single') {
      setIsSingleChoice(false);
    }
    if (value === 'Multiple') {
      setIsMultipleChoice(true);
    }
    if (value !== 'Multiple') {
      setIsMultipleChoice(false);
    }
  };

  const saveHandler = () => {
    dispatch(
      questionActions.createQuestion(
        questionContent,
        answerType,
        option1,
        option2,
        option3,
        option4
      )
    );
    props.navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <TitleName>{userName}</TitleName>
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
          numberOfLines={4}
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
            defaultValue={answerType}
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
          // onPress={() => console.log(option1, option2, option3, option4)}
          onPress={saveHandler}
        >
          Save
        </CommonButton>
      </View>
    </View>
  );
};

AddStudyQuestionScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Add Study Question',
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
    marginVertical: 20,
  },
  hightlightText: {
    color: Colors.primary,
  },
  optionsContainer: {
    width: Dimensions.get('window').width * 0.85,
    // borderWidth: 1,
    // borderColor: 'green',
  },
});

export default AddStudyQuestionScreen;
