import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';

const JoininScreen = (props) => {
  const [studyNumber, setStudyNumber] = useState();
  const [studyPassword, setStudyPassword] = useState();

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
      </View>
      <View style={styles.buttonContainer}>
        <CommonButton onPress={() => props.navigation.navigate('SampleForm')}>
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
  buttonContainer: {
    marginTop: 20,
    width: '30%',
  },
});

export default JoininScreen;
