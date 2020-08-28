import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../../constants/Colors';
import URL from '../../constants/URL';
import * as userNameActions from '../../store/actions/userName';

const SignUpScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);
  const [isPasswordDifferent, setIsPasswordDifferent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const dispatch = useDispatch();

  const showTerms = () => {
    Alert.alert(
      'Terms and conditions',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra ',
      [{ text: 'OK' }]
    );
  };

  const emailValidation = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === undefined) {
      // emptyEmail ? setEmptyEmail(false) : setEmptyEmail(true);
      if (!emptyEmail) {
        setEmptyEmail(true);
      }
      return;
    }
    if (emptyEmail) {
      setEmptyEmail(false);
    }
    if (!emailRegex.test(email.toLowerCase())) {
      // emptyEmail ? setEmptyEmail(false) : setEmptyEmail(true);
      // invalidEmail ? setInvalidEmail(false) : setInvalidEmail(true);
      if (!invalidEmail) {
        setInvalidEmail(true);
      }
      return;
    }
    if (invalidEmail) {
      setInvalidEmail(false);
    }
  };

  const passwordValidation = () => {
    if (password === undefined || password.length < 5) {
      // shortPassword ? setShortPassword(false) : setShortPassword(true);
      if (!shortPassword) {
        setShortPassword(true);
      }
      return;
    }
    if (shortPassword) {
      setShortPassword(false);
    }
  };

  const confirmPasswordValidation = () => {
    if (password !== confirmedPassword) {
      // isPasswordDifferent
      //   ? setIsPasswordDifferent(false)
      //   : setIsPasswordDifferent(true);
      if (!isPasswordDifferent) {
        setIsPasswordDifferent(true);
      }
      return;
    }

    if (isPasswordDifferent) {
      setIsPasswordDifferent(false);
    }
  };

  const SignupHandler = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === undefined) {
      if (!emptyEmail) {
        setEmptyEmail(true);
      }
      return;
    }
    if (emptyEmail) {
      setEmptyEmail(false);
    }
    if (!emailRegex.test(email.toLowerCase())) {
      if (!invalidEmail) {
        setInvalidEmail(true);
      }
      return;
    }
    if (invalidEmail) {
      setInvalidEmail(false);
    }

    if (password === undefined || password.length < 5) {
      if (!shortPassword) {
        setShortPassword(true);
      }
      return;
    }
    if (shortPassword) {
      setShortPassword(false);
    }

    if (password !== confirmedPassword) {
      if (!isPasswordDifferent) {
        setIsPasswordDifferent(true);
      }
      return;
    }

    if (isPasswordDifferent) {
      setIsPasswordDifferent(false);
    }

    if (agree) {
      setIsLoading(true);
      let url = URL.address + 'users/signup/';
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
          console.log(json);
          if (json.success == true) {
            dispatch(userNameActions.updateUserName(email));
            setIsLoading(false);
            props.navigation.navigate('Role');
          } else {
            setIsLoading(false);
            Alert.alert('Signup failed', json.detail, [{ text: 'OK' }]);
          }
        });
    } else {
      Alert.alert(
        'Insufficient Consent',
        'Please agreen the terms and conditions',
        ['OK']
      );
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
      <View style={styles.titleContainer}>
        <MainTitle style={styles.mainTitle}>Sign Up</MainTitle>
      </View>

      <Input
        style={styles.inputBox}
        label='Email'
        value={email}
        onChangeText={(newText) => setEmail(newText)}
        onBlur={() => emailValidation()}
      />

      <View
        style={{
          width: Dimensions.get('window').width * 0.8,
          marginTop: 3,
        }}
      >
        {emptyEmail && (
          <Text style={styles.hintText}>Please input your Email</Text>
        )}
        {invalidEmail && (
          <Text style={styles.hintText}>Please input a valid Email</Text>
        )}
      </View>

      <Input
        style={styles.inputBox}
        label='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={(newText) => setPassword(newText)}
        onBlur={() => passwordValidation()}
      />

      <View style={styles.passwordPrompt}>
        <Text style={styles.passwordPromptText}>At least 5 characters</Text>
      </View>

      <View
        style={{
          width: Dimensions.get('window').width * 0.8,
          marginTop: 3,
        }}
      >
        {shortPassword && (
          <Text style={styles.hintText}>The password is too short</Text>
        )}
      </View>

      <Input
        style={styles.inputBox}
        label='Confirm Password'
        value={confirmedPassword}
        secureTextEntry={true}
        onChangeText={(newText) => setConfirmedPassword(newText)}
        onBlur={() => confirmPasswordValidation()}
      />

      <View
        style={{
          width: Dimensions.get('window').width * 0.8,
          marginTop: 3,
        }}
      >
        {isPasswordDifferent && (
          <Text style={styles.hintText}>Passwords are different</Text>
        )}
      </View>

      <View style={styles.agreeContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            value={agree}
            onValueChange={() => {
              agree ? setAgree(false) : setAgree(true);
            }}
            tintColors={{ true: Colors.primary }}
          />
          <Text>I have read and agree to </Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => showTerms()}>
            <Text style={{ color: Colors.primary }}>terms and conditions</Text>
            {/* <Text style={{ color: 'blue' }}>conditions</Text> */}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CommonButton onPress={() => SignupHandler()}>
          {/* <CommonButton onPress={SignupHandler}> */}
          Sign Up
        </CommonButton>
      </View>

      <View style={styles.backButtonContainer}>
        <CommonButton onPress={() => props.navigation.navigate('Signin')}>
          Back to Sign in
        </CommonButton>
        {/* <Text>{birthday.toISOString()}</Text> */}
      </View>
    </View>
  );
};

SignUpScreen.navigationOptions = () => {
  return {
    headerTitle: 'Sign Up',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 30,
  },
  inputBox: {
    marginTop: 25,
    alignItems: 'flex-start',
  },
  passwordPrompt: {
    width: Dimensions.get('window').width * 0.8,
    marginTop: 3,
  },
  passwordPromptText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  hintText: {
    color: 'red',
    fontSize: 18,
    alignContent: 'flex-start',
  },
  buttonContainer: {
    marginTop: 30,
  },
  agreeContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  buttonContainer: {
    marginTop: 30,
  },
  backButtonContainer: {
    marginTop: 20,
  },
});

export default SignUpScreen;
