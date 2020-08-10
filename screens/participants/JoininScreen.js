import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import * as DATA from '../../data/dummy-questions';
import { useSelector, useDispatch } from 'react-redux';
import study from '../../store/reducers/study';

const JoininScreen = (props) => {
  const [studyNumber, setStudyNumber] = useState();
  const [studyPassword, setStudyPassword] = useState();
  const [feedback, setFeedback] = useState();

  const studies = useSelector((state) => state.studies.studies);
  // const studies = DATA.STUDY1;
  // console.log(studies);

  const joinHandler = (studyNumber, studyPassword) => {
    let correctNumber = false;
    let correctPassword = false;
    let index;
    for (let i = 0; i < studies.length; i++) {
      // console.log(studies[i].studyNumber);
      if (studies[i].studyNumber === studyNumber) {
        correctNumber = true;
        if (studies[i].studyPassword === studyPassword) {
          correctPassword = true;
          index = i;
        }
      }
    }
    if (correctNumber && correctPassword) {
      // setFeedback('correct');
      props.navigation.navigate('SampleForm', { sId: studies[index].studyId });
    }
    if (correctNumber && !correctPassword) {
      setFeedback('Wrong study password');
    }
    if (!correctNumber) {
      setFeedback('Wrong study number');
    }
  };

  return (
    <View style={styles.screen}>
      <TitleName style={styles.titleName}>Jing Wu</TitleName>
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
          {/* <CommonButton onPress={() => props.navigation.navigate('SampleForm')}> */}
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
