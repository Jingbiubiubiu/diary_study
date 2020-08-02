import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import * as DATA from '../../data/dummy-questions';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import AnswerIcon from '../../components/AnswerIcon';
import SingleChoice from '../../components/SingleChoice';

const StudyFormScreen = (props) => {
  const questions = DATA.QUESTION1;
  const [selectSingleChoice, setSelectSingleChoice] = useState(false);
  const [dropdown, setDropdown] = useState('');

  const functionIdentifier = (answerType) => {
    console.log(answerType);
    switch (answerType) {
      case 'audio':
        console.log('audio');
        break;
      case 'video':
        console.log('video');
        break;
      case 'camera':
        console.log('camera');
        break;
      case 'imageFormGallery':
        console.log('imageFormGallery');
        break;
      case 'typeAnswer':
        console.log('typeAnswer');
        break;
      case 'multipleChoice':
        console.log('multipleChoice');
        break;
      case 'singleChoice':
        selectSingleChoice
          ? setSelectSingleChoice(false)
          : setSelectSingleChoice(true);
        break;
    }
  };
  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle>Personal Info</MainTitle>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.questionId}
        renderItem={(itemData) => (
          <View>
            <AnswerIcon
              index={itemData.index + 1}
              content={itemData.item.content}
              answerType={itemData.item.answerType}
              onSelect={() => {
                functionIdentifier(itemData.item.answerType);
              }}
            />
            {selectSingleChoice && itemData.item.option1 !== null && (
              <View style={{ zIndex: 5 }}>
                <SingleChoice
                  questionOptions={[
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
                  defaultValue={dropdown}
                  placeholder='Select the answer'
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  onChangeItem={(item) => setDropdown(item.value)}
                />
              </View>
            )}
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <CommonButton>Submit</CommonButton>
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
