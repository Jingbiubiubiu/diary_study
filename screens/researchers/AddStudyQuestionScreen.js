import React, { useState } from 'react';
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
import SubtitleInput from '../../components/SubtitleInput';
import CommonButton from '../../components/CommonButton';
import * as Choice from '../../components/Choice';
import Colors from '../../constants/Colors';
import * as questionActions from '../../store/actions/question';
import * as DropdownPicker from '../../components/DropDownPicker';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AddStudyQuestionScreen = (props) => {
  const userName = useSelector((state) => state.userName.userName);
  const studyName = props.navigation.getParam('sdName');
  const [questionContent, setQuetionContent] = useState();
  const [answerType, setAnswerType] = useState();
  const [isSingleChoice, setIsSingleChoice] = useState(false);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [option1, setOption1] = useState(null);
  const [option2, setOption2] = useState(null);
  const [option3, setOption3] = useState(null);
  const [option4, setOption4] = useState(null);

  const dispatch = useDispatch();

  const dropdownItems = [
    {
      label: 'Type answer',
      value: 'Type',
    },
    {
      label: 'Single Choice',
      value: 'Single',
    },
    {
      label: 'Multiple Choice',
      value: 'Multiple',
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
      label: 'Take video',
      value: 'Video',
    },
    {
      label: 'Audio',
      value: 'Audio',
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

  const onSaveHandler = () => {
    if (questionContent === undefined) {
      Alert.alert('Error', 'The question is empty. Please set.');
      return;
    }
    if (answerType === undefined) {
      Alert.alert('Error', 'The answer type has not been chosen. Please set.');
      return;
    }
    Alert.alert(
      '',
      'Are you sure you want to set up this question? \nYou cannot undo this operation',
      [
        { text: 'Yes', onPress: () => saveHandler() },
        { text: 'No', style: 'cancel' },
      ]
    );
    // dispatch(
    //   questionActions.createQuestion(
    //     questionContent,
    //     answerType,
    //     option1,
    //     option2,
    //     option3,
    //     option4
    //   )
    // );
    // props.navigation.goBack();
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
    Alert.alert('Save successful!', '', [
      {
        text: 'OK',
        onPress: () => props.navigation.goBack(),
      },
    ]);
    // props.navigation.goBack();
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
        <SubtitleInput
          style={{ marginBottom: 10, width: screenWidth * 0.85 }}
          numberOfLines={4}
          value={questionContent}
          onChangeText={(newText) => setQuetionContent(newText)}
        >
          Type the quetion
        </SubtitleInput>

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
        <CommonButton onPress={onSaveHandler}>Save</CommonButton>
      </View>
    </View>
  );
};

AddStudyQuestionScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Add Study Question',
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
  },
  inputBox: {
    marginTop: 15,
    width: screenWidth * 0.85,
  },
  inputLabel: {
    fontSize: 20,
  },
  dropdownContainer: {
    alignItems: 'flex-start',
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
  },
});

export default AddStudyQuestionScreen;
