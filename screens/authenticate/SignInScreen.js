import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import * as userNameActions from '../../store/actions/userName';

const SignInScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <MainTitle style={styles.mainTitle}>Welcome</MainTitle>
      <Input
        style={styles.inputBox}
        label='Email'
        value={email}
        onChangeText={(newText) => setEmail(newText)}
      />
      <Input
        style={styles.inputBox}
        label='Password'
        value={password}
        onChangeText={(newText) => setPassword(newText)}
      />
      <View style={styles.buttonTotalContainer}>
        <View style={styles.buttonContainer}>
          <CommonButton
            onPress={() => {
              dispatch(userNameActions.updateUserName(email));
              props.navigation.navigate('Role', { name: email });
            }}
          >
            Sign In
          </CommonButton>
        </View>
        <View style={styles.buttonContainer}>
          <CommonButton
            onPress={() => {
              props.navigation.navigate('Signup');
            }}
          >
            Sign Up
          </CommonButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    marginTop: 50,
    marginBottom: 30,
  },
  inputBox: {
    marginTop: 20,
  },
  buttonTotalContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default SignInScreen;
