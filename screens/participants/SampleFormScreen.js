import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import * as Icons from '../../components/Icons';
import CommonButton from '../../components/CommonButton';

const SampleFormScreen = (props) => {
  const [Q1, setQ1] = useState();
  const [Q2, setQ2] = useState();
  const [Q3, setQ3] = useState();
  const [Q4, setQ4] = useState();
  const [Q5Choice1, setQ5Choice1] = useState(false);
  const [Q5Choice2, setQ5Choice2] = useState(false);
  const [Q5Choice3, setQ5Choice3] = useState(false);
  const [Q5Choice4, setQ5Choice4] = useState(false);
  const [agree, setAgree] = useState(false);

  const selectionIdentifier = (buttonId) => {
    switch (buttonId) {
      case 'choice1':
        Q5Choice1 ? setQ5Choice1(false) : setQ5Choice1(true);
        console.log('choice1');
        break;
      case 'choice2':
        Q5Choice2 ? setQ5Choice2(false) : setQ5Choice2(true);
        console.log('choice2');
        break;
      case 'choice3':
        Q5Choice3 ? setQ5Choice3(false) : setQ5Choice3(true);
        console.log('choice3');
        break;
      case 'choice4':
        Q5Choice4 ? setQ5Choice4(false) : setQ5Choice4(true);
        console.log('choice4');
        break;
    }
  };

  const agreeHandler = () => {
    agree ? setAgree(false) : setAgree(true);
  };

  return (
    <View style={styles.screen}>
      <TitleName style={styles.titleName}>Jing Wu</TitleName>
      <MainTitle style={styles.mainName}>Sample study</MainTitle>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle} numberOfLines={2}>
          Consent form, briefing and pre-study questions
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ width: '90%' }}>
        <View style={styles.description}>
          <Text>
            Description of the study and of consent etc. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
            Proin gravida dolor sit amet lacus accumsan et viverra justo
          </Text>
        </View>
        <Input
          style={styles.input}
          inputBox={styles.inputBox}
          label='Pre-study Quetion 1'
          value={Q1}
          onChangeText={(newText) => setQ1(newText)}
        />
        <Input
          style={styles.input}
          inputBox={styles.inputBox}
          label='Pre-study Quetion 2'
          value={Q2}
          onChangeText={(newText) => setQ2(newText)}
        />
        <Input
          style={styles.input}
          inputBox={styles.inputBox}
          label='Pre-study Quetion 3'
          value={Q3}
          onChangeText={(newText) => setQ3(newText)}
        />
        <Input
          style={styles.input}
          inputBox={styles.inputBox}
          label='Pre-study Quetion 4'
          value={Q4}
          onChangeText={(newText) => setQ4(newText)}
        />
        <View style={styles.Q5Container}>
          <Text style={{ fontSize: 16 }}>Pre-study Quetion 5</Text>
          <View style={styles.Q5Choices}>
            <Icons.CommonCheckbox
              id='choice1'
              value={Q5Choice1}
              onChangeText={() => selectionIdentifier('choice1')}
              onPress={() => selectionIdentifier('choice1')}
            >
              1-5
            </Icons.CommonCheckbox>
            <Icons.CommonCheckbox
              id='choice2'
              value={Q5Choice2}
              onChangeText={() => selectionIdentifier('choice2')}
              onPress={() => selectionIdentifier('choice2')}
            >
              6-10
            </Icons.CommonCheckbox>
            <Icons.CommonCheckbox
              id='choice3'
              value={Q5Choice3}
              onChangeText={() => selectionIdentifier('choice3')}
              onPress={() => selectionIdentifier('choice3')}
            >
              11-12
            </Icons.CommonCheckbox>
            <Icons.CommonCheckbox
              id='choice4'
              value={Q5Choice4}
              onChangeText={() => selectionIdentifier('choice4')}
              onPress={() => selectionIdentifier('choice4')}
            >
              13-14
            </Icons.CommonCheckbox>
          </View>
        </View>
        <View>
          <Icons.CommonCheckbox
            value={agree}
            onChangeText={agreeHandler}
            onPress={agreeHandler}
          >
            By clicking 'Submit' you consent to the above
          </Icons.CommonCheckbox>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CommonButton onPress={() => props.navigation.navigate('StudyForm')}>
          Submit
        </CommonButton>
      </View>
    </View>
  );
};

SampleFormScreen.navigationOptions = (davData) => {
  return {
    headerTitle: 'Sample Study',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  titleName: {
    marginTop: 10,
  },
  subtitleContainer: {
    width: '70%',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    marginTop: 8,
    width: '90%',
  },
  input: {
    marginVertical: 5,
  },
  inputBox: {
    width: '100%',
  },
  audioContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  Q5Container: {
    flexDirection: 'row',
    marginVertical: 8,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  Q5Choices: {
    // borderColor: 'blue',
    // borderWidth: 1,
    marginLeft: 10,
  },
  buttonContainer: {
    marginBottom: 30,
  },
});

export default SampleFormScreen;
