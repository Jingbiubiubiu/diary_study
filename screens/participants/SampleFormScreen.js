import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import * as Icons from '../../components/Icons';
import CommonButton from '../../components/CommonButton';
import * as DATA from '../../data/dummy-questions';

const screenWidth = Dimensions.get('window').height;

const SampleFormScreen = (props) => {
  const consentForm1 = DATA.CONSENTFORM1[0];
  const [agree, setAgree] = useState(false);

  // console.log(consentForm1.description);
  const agreeHandler = () => {
    agree ? setAgree(false) : setAgree(true);
  };

  return (
    <View style={styles.screen}>
      <TitleName style={styles.titleName}>Jing Wu</TitleName>
      <MainTitle style={styles.mainName}>Sample study</MainTitle>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle} numberOfLines={2}>
          Consent form, description and pre-study questions
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ width: '90%' }}>
        <View style={styles.description}>
          <Text>{consentForm1.description}</Text>
        </View>

        <View>
          <Icons.CommonCheckbox
            value={agree}
            onChangeText={agreeHandler}
            onPress={agreeHandler}
          >
            {consentForm1.agreement}
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
    // alignItems: 'center',
    borderColor: 'green',
    borderWidth: 1,
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
