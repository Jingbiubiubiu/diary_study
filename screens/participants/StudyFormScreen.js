import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import * as DATA from '../../data/dummy-questions';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import AnswerIcon from '../../components/AnswerIcon';

const StudyFormScreen = (props) => {
  const questions = DATA.QUESTION1;

  const functionIdentifier = (answerType) => {
    console.log(answerType);
    switch (answerType) {
      case 'audio':
        console.log('audio');
        break;
      case 'video':
        console.log('video');
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
          <AnswerIcon
            index={itemData.index + 1}
            content={itemData.item.content}
            answerType={itemData.item.answerType}
            onSelect={() => {functionIdentifier(itemData.item.answerType)}}
            // onPress={functionIdentifier(itemData.item.answerType)}
          />
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
