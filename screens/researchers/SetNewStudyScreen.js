import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import AddButton from '../../components/AddButton';
import CommonButton from '../../components/CommonButton';
import * as DATA from '../../data/dummy-questions';
import AnswerIcon from '../../components/AnswerIcon';
import * as studyActions from '../../store/actions/study';
import { cos } from 'react-native-reanimated';

const SetNewStudyScreen = (props) => {
  const [studyName, setStudyName] = useState();
  const consentForms = useSelector((state) => state.consentForm.consentForm);
  // const questions = DATA.QUESTION1;
  const questions = useSelector((state) => state.questions.questions);
  // const studies = useSelector((state) => state.studies.studies);
  const dispatch = useDispatch();

  // console.log(createTime());
  const content = () => {
    return `The study "${studyName}" has set up`;

    // please record the information,

    // you will need them to get the

    // result

    // the study number of it is 003

    // the study password is 123

    // the study establish time is

    // 08/08/2020. 10:00
    // ';
  };

  const submitHandler = () => {
    dispatch(studyActions.createStudy(studyName, consentForms, questions));
    console.log(consentForms);
    // 用Alert不太行，后面用Modal来做
    Alert.alert('Save successful', content(), ['OK']);
    // console.log(studies.length);
  };

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
        style={{ marginTop: 20 }}
        navigation={props.navigation}
        onPress={() => props.navigation.navigate('SetConsentForm')}
      >
        Set Consent Form
      </AddButton>
      {/* <Text>{consentForms.length}</Text> */}
      <AddButton
        style={{ marginTop: 5 }}
        navigation={props.navigation}
        onPress={() =>
          props.navigation.navigate('AddStudyQuestion', { sdName: studyName })
        }
      >
        Add New Question
      </AddButton>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.questionId}
        renderItem={(itemData) => (
          <AnswerIcon
            index={itemData.index + 1}
            content={itemData.item.content}
            answerType={itemData.item.answerType}
          />
        )}
      />
      <View style={styles.submitContainer}>
        <CommonButton onPress={submitHandler}>Submit</CommonButton>
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
