import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';

const SignInScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const SigninHandler = () => {
    fetch('http://10.0.2.2:3000/users/signin/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.success == true) {
        props.navigation.navigate('Role', { id:  email})
      } else {
        Alert.alert(
          'Login failed',
          json.detail,
          [{ text: 'OK' }]
        );
      }
    })
  };

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
            onPress={SigninHandler}
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
