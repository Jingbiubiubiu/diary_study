import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';

import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import * as userNameActions from '../../store/actions/userName';
import URL from '../../constants/URL';

const SignInScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // 分割线
  const SigninHandler = () => {
    setIsLoading(true);
    let url = URL.address + 'users/signin/';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success == true) {
          dispatch(userNameActions.updateUserName(email));
          setIsLoading(false);
          props.navigation.navigate('Role');
        } else {
          setIsLoading(false);
          Alert.alert('Signin failed', json.detail, [{ text: 'OK' }]);
        }
      });
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
      <MainTitle style={styles.mainTitle}>Welcome</MainTitle>

      {/* 分割线 */}
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
        // multiline={false}
        secureTextEntry={true}
        onChangeText={(newText) => setPassword(newText)}
      />
      {/* <TextInput
        style={{ borderColor: 'red', borderWidth: 1 }}
        secureTextEntry={true}
      /> */}
      <View style={styles.buttonTotalContainer}>
        <View style={styles.buttonContainer}>
          <CommonButton onPress={SigninHandler}>Sign In</CommonButton>
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

SignInScreen.navigationOptions = () => {
  return {
    headerTitle: 'Sign In',
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
