import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import AddButton from '../../components/AddButton';
import CommonButton from '../../components/CommonButton';
import * as DATA from '../../data/dummy-questions';
import AnswerIcon from '../../components/AnswerIcon';

const SetNewStudyScreen = (props) => {
  const [studyName, setStudyName] = useState();
  const questions = DATA.QUESTION1;

  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle style={styles.mainTitle}>Setup New Study</MainTitle>
      <Input
        label='Study name'
        value={studyName}
        onChangeText={(newText) => setStudyName(newText)}
        style={styles.inputBoxContainer}
      />
      <AddButton
        navigation={props.navigation}
        onPress={() =>
          props.navigation.navigate('AddStudyQuestion', { sdName: studyName })
        }
      >
        Add new question
      </AddButton>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.questionId}
        renderItem={(itemData) => (
          <AnswerIcon
            index={itemData.index + 1}
            content={itemData.item.content}
            answerType1={itemData.item.answerType1}
            answerType2={itemData.item.answerType2}
          />
        )}
      />
      <View style={styles.submitContainer}>
        <CommonButton
          onPress={() => {
            console.log('Save form');
          }}
        >
          Submit
        </CommonButton>
      </View>
    </View>
  );
};

SetNewStudyScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Setup New Study',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    marginTop: 15,
  },
  inputBoxContainer: { marginTop: 15 },
  submitContainer: {
    marginVertical: 20,
  },
});

export default SetNewStudyScreen;
