import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import SubTitle from '../../components/SubTitle';
import CommonButton from '../../components/CommonButton';
import SubtitleInput from '../../components/SubtitleInput';
import * as Choice from '../../components/Choice';
import * as DropdownPicker from '../../components/DropDownPicker';
import * as preStudyQuestionActions from '../../store/actions/preStudyQuestion';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SetPreQuestionsScreen = (props) => {
  const userName = useSelector((state) => state.userName.userName);
  const [questionContent, setQuetionContent] = useState();
  const [answerType, setAnswerType] = useState();
  const [option1, setOption1] = useState(null);
  const [option2, setOption2] = useState(null);
  const [option3, setOption3] = useState(null);
  const [option4, setOption4] = useState(null);

  const [isSingleChoice, setIsSingleChoice] = useState(false);
  const dispatch = useDispatch();

  const dropdownItems = [
    {
      label: 'Type Answer',
      value: 'Type',
    },
    {
      label: 'Single Choice',
      value: 'Single',
    },
  ];

  const dropdownHandler = (value) => {
    setAnswerType(value);
    if (value === 'Single') {
      setIsSingleChoice(true);
    }
    if (value !== 'Single') {
      setIsSingleChoice(false);
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
      'Are you sure you want to set up this pre-study question? \nYou cannot undo this operation',
      [
        { text: 'Yes', onPress: () => saveHandler() },
        { text: 'No', style: 'cancel' },
      ]
    );
  };
  const saveHandler = () => {
    dispatch(
      preStudyQuestionActions.createPreStudyQuestion(
        questionContent,
        answerType,
        option1,
        option2,
        option3,
        option4
      )
    );
    // Alert.alert('Save successful!', '', [
    //   {
    //     text: 'OK',
    //     onPress: () => props.navigation.goBack(),
    //   },
    // ]);
    props.navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <TitleName>{userName}</TitleName>
      <MainTitle style={styles.mainTitle}>Setup Pre-study Questions</MainTitle>

      <ScrollView
        contentContainerStyle={{
          height: screenHeight,
          // borderColor: 'red',
          // borderWidth: 1,
        }}
      >
        {/* <ScrollView> */}
        <View style={styles.scrollContainer}>
          <SubtitleInput
            style={{ marginBottom: 10 }}
            numberOfLines={4}
            input={{ height: screenHeight * 0.15 }}
            value={questionContent}
            onChangeText={(newText) => setQuetionContent(newText)}
          >
            Type the question
          </SubtitleInput>

          <SubTitle>Select the answer type</SubTitle>

          <DropdownPicker.ChooseTypeDropdownPicker
            items={dropdownItems}
            defaultValue={answerType}
            placeholder='Select the answer type'
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            onChangeItem={(item) => dropdownHandler(item.value)}
          />

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
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CommonButton
          buttonContainer={{ width: screenWidth * 0.25 }}
          onPress={onSaveHandler}
        >
          Save
        </CommonButton>
      </View>
    </View>
  );
};

SetPreQuestionsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Set Pre-Study Question',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    width: screenWidth * 0.8,
    alignItems: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
    width: screenWidth * 0.85,
  },
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
  },
  dropdownContainer: {
    marginVertical: 15,
  },
  dropdownMenu: {
    height: 50,
    width: screenWidth * 0.85,
  },
  dropdownLabel: {
    fontSize: 18,
  },
  input: {
    alignItems: 'flex-start',
    width: '100%',
  },
});

export default SetPreQuestionsScreen;
