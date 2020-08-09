import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as DATA from '../../data/dummy-questions';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import CommonButton from '../../components/CommonButton';
import AnswerIcon from '../../components/AnswerIcon';
import SingleChoice from '../../components/SingleChoice';
import InputWithoutLabel from '../../components/InputWithoutLabel';
import * as answersActions from '../../store/actions/answers';

const StudyFormScreen = (props) => {
  const questions = DATA.QUESTION1;

  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(
    // create an array which length equals to the data's length,
    // and every element in the array is false
    Array(questions.length).fill(false)
  );

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  console.log(questions.length);

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
    console.log('Original: ' + updateAnswers.toString());
    updateAnswers[index] = value;
    setAnswers(updateAnswers);
    console.log('Update: ' + updateAnswers.toString());
  };

  const createComponent = (answerType, index, itemData) => {
    switch (answerType) {
      case 'audio':
        break;
      case 'video':
        break;
      case 'camera':
        break;
      case 'imageFormGallery':
        break;
      case 'typeAnswer':
        return (
          visibility[index] && (
            <InputWithoutLabel
              value={answers[index]}
              onChangeText={(newText) => updateAnswers(itemData.index, newText)}
            />
          )
        );
        break;
      case 'singleChoice':
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
      case 'multipleChoice':
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
    }
  };

  const saveHandler = () => {
    console.log('hi');
    dispatch(answersActions.createAnswers(answers));
  };

  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle>Personal Info</MainTitle>
      <FlatList
        data={questions}
        // listKey={(item) => item.questionId}
        keyExtractor={(item) => item.questionId}
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
      <Text>states:{visibility.toString()}</Text>
      <View style={styles.buttonContainer}>
        <CommonButton onPress={saveHandler}>Submit</CommonButton>
      </View>
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

  buttonContainer: {
    marginBottom: 20,
  },
});

export default StudyFormScreen;
