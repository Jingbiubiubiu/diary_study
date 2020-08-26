import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
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
  const [agree, setAgree] = useState(false);
  const [isPasswordDifferent, setIsPasswordDifferent] = useState(false);
  const dispatch = useDispatch();

  // const TermsIcon = () => {
  //   const showTerms = () => {
  //     Alert.alert(
  //       'Terms and conditions',
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra ',
  //       [{ text: 'OK' }]
  //     );
  //   };

  //   return (
  //     <View style={{ borderWidth: 1, borderColor: 'red' }}>
  //       <TouchableOpacity onPress={showTerms}>
  //         <Text style={{ color: 'blue' }}>terms and conditions</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const showTerms = () => {
    Alert.alert(
      'Terms and conditions',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra ',
      [{ text: 'OK' }]
    );
  };

  const SignupHandler = () => {
    if (password !== confirmedPassword) {
      isPasswordDifferent
        ? setIsPasswordDifferent(false)
        : setIsPasswordDifferent(true);
      return;
    }
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
          props.navigation.navigate('Role');
        } else {
          Alert.alert('Signup failed', json.detail, [{ text: 'OK' }]);
        }
      });
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
        secureTextEntry={true}
        onChangeText={(newText) => setPassword(newText)}
      />
      <Input
        style={styles.inputBox}
        label='Confirm Password'
        value={confirmedPassword}
        secureTextEntry={true}
        onChangeText={(newText) => setConfirmedPassword(newText)}
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
        {/* <TermsIcon /> */}
        <View>
          <TouchableOpacity onPress={() => showTerms()}>
            <Text style={{ color: 'blue' }}>terms and conditions</Text>
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
    alignContent: 'flex-start',
  },
  buttonContainer: {
    marginTop: 30,
  },
  agreeContainer: {
    // flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  buttonContainer: {
    marginTop: 30,
  },
  backButtonContainer: {
    marginTop: 20,
  },
});

export default SignUpScreen;
