import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../../constants/Colors';

const TermsIcon = () => {
  const showTerms = () => {
    Alert.alert(
      'Terms and conditions',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra ',
      [{ text: 'OK' }]
    );
  };

  return (
    <TouchableOpacity onPress={showTerms}>
      <View>
        <Text style={{ color: 'blue' }}>terms and conditions</Text>
      </View>
    </TouchableOpacity>
  );
};

const SignUpScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [agree, setAgree] = useState(false);
  const [isPasswordDifferent, setIsPasswordDifferent] = useState(false);

  const SignupHandler = () => {
    if (password !== confirmedPassword) {
      isPasswordDifferent
        ? setIsPasswordDifferent(false)
        : setIsPasswordDifferent(true);
      return;
    }
    if (agree) {
      fetch('http://10.0.2.2:3000/users/signup/', {
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
      .then((response) => {
        console.log(response.status);
      })
      props.navigation.navigate('Role');
    } else {
      Alert.alert(
        'Insufficient Agree',
        'Please tick to agree the terms and conditons',
        [{ text: 'OK' }]
      );
    }
  };
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
      />
      <Input
        style={styles.inputBox}
        label='Password'
        value={password}
        onChangeText={(newText) => setPassword(newText)}
      />
      <Input
        style={styles.inputBox}
        label='Confirm Password'
        value={confirmedPassword}
        onChangeText={(newText) => setConfirmedPassword(newText)}
      />
      {isPasswordDifferent && (
        <Text style={styles.hintText}>Passwords are different</Text>
      )}

      <View style={styles.agreeContainer}>
        <CheckBox
          value={agree}
          onValueChange={() => {
            agree ? setAgree(false) : setAgree(true);
          }}
          tintColors={{ true: Colors.primary }}
        />
        <Text>I have read and agree to </Text>
        <TermsIcon />
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 30,
  },
  inputBox: {
    marginTop: 25,
    alignItems: 'flex-start',
    // justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  DOBContainer: {
    // borderColor: 'blue',
    // borderWidth: 1,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  hintText: {
    color: 'red',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 30,
  },
  agreeContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 30,
  },
  backButtonContainer: {
    marginTop: 20,
  },
});

export default SignUpScreen;
