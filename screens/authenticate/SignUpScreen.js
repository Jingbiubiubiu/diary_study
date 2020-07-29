import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../../constants/Colors';

// const DOBIcon = (show, birthday, setBirthday) => {
//   // const onPressHandler = () => {};

//   return (
//     <View style={styles.DOBContainer}>
//       <Text>DOB</Text>
//       <View style={{ marginRight: 80 }}>
//         <Feather
//           name='calendar'
//           size={30}
//           onPress={show ? setShow(false) : setShow(true)}
//         />
//         {show && (
//           <DateTimePicker
//             testID='datePicker'
//             value={birthday}
//             mode='date'
//             onChange={() => {
//               setBirthday(birthday);
//             }}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

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

const SignupHandler = (agree, navigation) => {
  if (agree) {
    navigation.navigate('Role');
  } else {
    Alert.alert(
      'Insufficient Agree',
      'Please tick to agree the terms and conditons',
      [{ text: 'OK' }]
    );
  }
};

const SignUpScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [surname, setSurName] = useState();
  const [agree, setAgree] = useState(false);
  const [birthday, setBirthday] = useState(new Date(1960, 0, 1));
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShow(false);
    setBirthday(currentDate);

    // console.log(birthday);
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
        inputLabelContainer={{ width: '30%' }}
      />
      {/* <View style={styles.DOBContainer}>
        <Text>DOB</Text>
        <View style={{ marginRight: 80 }}>
          <Feather
            name='calendar'
            size={30}
            onPress={() => (show ? setShow(false) : setShow(true))}
          />
          {show && (
            <DateTimePicker
              testID='datePicker'
              value={birthday}
              mode='date'
              onChange={onDateChange}
            />
          )}
        </View>
      </View>
      <Input
        style={styles.inputBox}
        label='Firstname'
        value={firstName}
        onChangeText={(newText) => setFirstName(newText)}
      />
      <Input
        style={styles.inputBox}
        label='Surname'
        value={surname}
        onChangeText={(newText) => setSurName(newText)}
      /> */}

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
        <CommonButton onPress={() => SignupHandler(agree, props.navigation)}>
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
    alignItems: 'center',
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
