import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import SubTitle from '../../components/SubTitle';
import CommonButton from '../../components/CommonButton';
import SubtitleInput from '../../components/SubtitleInput';
import Input from '../../components/Input';
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

  // const [dropdown, setDropdown] = useState('text');
  const [isSingleChoice, setIsSingleChoice] = useState(false);
  const dispatch = useDispatch();

  const dropdownItems = [
    {
      label: 'Type answer',
      value: 'typeAnswer',
    },
    {
      label: 'Single Choice',
      value: 'singleChoice',
    },
  ];

  const dropdownHandler = (value) => {
    setAnswerType(value);
    if (value === 'singleChoice') {
      setIsSingleChoice(true);
    }
    if (value !== 'singleChoice') {
      setIsSingleChoice(false);
    }
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
    props.navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <TitleName>{userName}</TitleName>
      <MainTitle style={styles.mainTitle}>Setup Pre-study Questions</MainTitle>

      <ScrollView contentContainerStyle={{ height: screenHeight * 0.85 }}>
        <View style={styles.scrollContainer}>
          <SubtitleInput
            style={{ marginBottom: 10 }}
            numberOfLines={4}
            value={questionContent}
            onChangeText={(newText) => setQuetionContent(newText)}
          >
            Type the quetion
          </SubtitleInput>
          <SubTitle>Select the answer type</SubTitle>
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

          {isSingleChoice && (
            <View>
              {/* <Input label='Input first option:' style={styles.input} />
              <Input label='Input second option:' style={styles.input} />
              <Input label='Input third option:' style={styles.input} />
              <Input label='Input forth option:' style={styles.input} /> */}
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
          onPress={saveHandler}
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
  // subTitleContainer: {
  //   alignItems: 'stretch',
  // },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginTop: 10,
  },
  scrollContainer: {
    // borderColor: 'blue',
    // borderWidth: 1,
    flex: 1,
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
