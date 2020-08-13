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
import createRandom from '../../finctions/createRandom';
import createTimestamp from '../../finctions/createTimestamp';
import * as ShowInfo from '../../components/ShowInfo';

const SetNewStudyScreen = (props) => {
  const [studyName, setStudyName] = useState();
  const consentForms = useSelector((state) => state.consentForm.consentForm);
  // const questions = DATA.QUESTION1;
  const questions = useSelector((state) => state.questions.questions);
  // const studies = useSelector((state) => state.studies.studies);
  const [studyNumber, setStudyNumber] = useState();
  const [studyPassword, setStudyPassword] = useState();
  const [establishTime, setEstablishTime] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [test, setTest] = useState();

  const dispatch = useDispatch();

  const submitHandler = () => {
    // let ttest = createRandom();
    // setTest(ttest);
    // console.log(test);

    setStudyNumber(createRandom());
    console.log(studyNumber);
    // setStudyPassword(createRandom());
    // console.log(studyPassword);

    // setEstablishTime(createTimestamp());
    // console.log(establishTime);

    dispatch(
      studyActions.createStudy(
        studyName,
        studyNumber,
        // studyPassword,
        consentForms,
        questions
        // establishTime
      )
    );
    setModalVisible(true);
    // showInfo(studyName, studyNumber, studyPassword);

    // props.navigation.navigate('ResStudyList');
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
        onPress={() => {
          props.navigation.navigate('SetConsentForm');
        }}
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
        <CommonButton onPress={() => submitHandler()}>
          {/* <CommonButton onPress={() => setModalVisible(true)}> */}
          Submit
        </CommonButton>
        <ShowInfo.ShowLongInfo
          studyName={studyName}
          studyNumber={studyNumber}
          studyPassword={studyPassword}
          visible={modalVisible}
          onPress={() => {
            setModalVisible(!modalVisible);
            props.navigation.navigate('ResStudyList');
          }}
        />
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
