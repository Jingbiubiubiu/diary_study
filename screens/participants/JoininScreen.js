import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import * as DATA from '../../data/dummy-questions';
import { useSelector, useDispatch } from 'react-redux';
import * as studyActions from '../../store/actions/study';
import URL from '../../constants/URL';

const JoininScreen = (props) => {
  const [studyNumber, setStudyNumber] = useState();
  const [studyPassword, setStudyPassword] = useState();
  const [feedback, setFeedback] = useState();
  const userName = useSelector((state) => state.userName.userName);

  const studies = useSelector((state) => state.studies.participant_studies);
  // const studies = DATA.STUDY1;
  // console.log(studies);

  const dispatch = useDispatch();

  const joinHandler = (studyNumber, studyPassword) => {
    let url = URL.address + 'study/join/';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studyNumber: studyNumber,
        studyPassword: studyPassword,
        userName: userName,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.success == true) {
          ParticipantListRetrieval();
          props.navigation.navigate('ParStudyList');
        } else {
          setFeedback(json.detail);
        }
      });
  };

  const ParticipantListRetrieval = () => {
    let url = URL.address + 'study/participant/?email=' + userName;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(studyActions.initialize_participant_studies(json));
      });
  };

  return (
    <View style={styles.screen}>
      <TitleName style={styles.titleName}>{userName}</TitleName>
      <MainTitle style={styles.mainName}>Participent Menu</MainTitle>
      <View style={styles.inputContainer}>
        <Input
          style={styles.inputStyle}
          label='Study Number'
          value={studyNumber}
          onChangeText={(newText) => setStudyNumber(newText)}
        />
        <Input
          style={styles.inputStyle}
          label='Study Password'
          value={studyPassword}
          onChangeText={(newText) => setStudyPassword(newText)}
        />
        <Text style={styles.hintText}>{feedback}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CommonButton onPress={() => joinHandler(studyNumber, studyPassword)}>
          Join
        </CommonButton>
      </View>
    </View>
  );
};

JoininScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Participent Menu',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  titleName: {
    marginTop: 50,
  },
  mainName: {
    marginTop: 40,
  },
  inputContainer: {
    marginTop: 30,
  },
  inputStyle: {
    marginBottom: 20,
  },
  hintText: {
    color: 'red',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    width: '30%',
  },
});

export default JoininScreen;
