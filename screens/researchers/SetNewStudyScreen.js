import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import AddButton from '../../components/AddButton';
import CommonButton from '../../components/CommonButton';
import * as DATA from '../../data/dummy-questions';
import AnswerIcon from '../../components/AnswerIcon';
import * as studyActions from '../../store/actions/study';
import * as consentFormActions from '../../store/actions/consentForm';
import * as questionActions from '../../store/actions/question';
import * as preStudyQuestionActions from '../../store/actions/preStudyQuestion';
import createRandom from '../../functions/createRandom';
import createTimestamp from '../../functions/createTimestamp';
import * as ShowInfo from '../../components/ShowInfo';
import URL from '../../constants/URL';

const SetNewStudyScreen = (props) => {
  const [studyName, setStudyName] = useState();
  const userName = useSelector((state) => state.userName.userName);
  const consentForms = useSelector((state) => state.consentForm.consentForm);
  const questions = useSelector((state) => state.questions.questions);
  const [studyNumber, setStudyNumber] = useState();
  const [studyPassword, setStudyPassword] = useState();
  const [establishTime, setEstablishTime] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const ResearcherListRetrieval = () => {
    let url = URL.address + 'study/researcher/?email=' + userName;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(studyActions.initialize_researcher_studies(json));
        props.navigation.navigate('ResStudyList');
      });
  };

  const submitHandler = () => {
    if (consentForms === null) {
      Alert.alert('Error', 'Consent Form is empty. Please set.');
    }
    if (questions.length === 0) {
      Alert.alert('Error', 'There is no question. Please set.');
    }
    if (consentForms !== null && questions.length !== 0) {
      const studyNumber = createRandom();
      setStudyNumber(studyNumber);

      const studyPassword = createRandom();
      setStudyPassword(studyPassword);

      const establishTime = createTimestamp();
      setEstablishTime(establishTime);
      setIsLoading(true);

      dispatch(
        studyActions.createStudy(
          userName,
          studyName,
          studyNumber,
          studyPassword,
          consentForms,
          questions,
          establishTime
        )
      );
      setModalVisible(true);
      dispatch(consentFormActions.clearConsentForm());
      dispatch(questionActions.clearQuestion());
      dispatch(preStudyQuestionActions.clearPreStudyQuestion());
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <TitleName>{userName}</TitleName>
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
        keyExtractor={(item) => item.questionNumber.toString()}
        renderItem={(itemData) => (
          <AnswerIcon
            index={itemData.index + 1}
            content={itemData.item.content}
            answerType={itemData.item.answerType}
          />
        )}
      />
      <View style={styles.submitContainer}>
        <CommonButton onPress={() => submitHandler()}>Submit</CommonButton>
        <ShowInfo.ShowLongInfo
          studyName={studyName}
          studyNumber={studyNumber}
          studyPassword={studyPassword}
          visible={modalVisible}
          onPress={() => {
            setModalVisible(!modalVisible);
            ResearcherListRetrieval();
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
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
