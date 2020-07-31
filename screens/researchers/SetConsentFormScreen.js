import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import SubTitle from '../../components/SubTitle';
import AddButton from '../../components/AddButton';
import CommonButton from '../../components/CommonButton';
import SubtitleInput from '../../components/SubtitleInput';

const screenWidth = Dimensions.get('window').width;

const SetConsentFormScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle style={styles.mainTitle}>Setup Consent Form</MainTitle>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SubtitleInput numberOfLines={7}>Type the quetion</SubtitleInput>
        <View style={{ alignItem: 'flex-start' }}>
          <SubTitle>Set up pre-study questions</SubTitle>
        </View>
        <AddButton
          style={{ marginTop: 20 }}
          navigation={props.navigation}
          onPress={() => props.navigation.navigate('SetPreQuestion')}
        >
          Press here to start
        </AddButton>
        <SubtitleInput
          numberOfLines={5}
          placeholder='Input what you would like to say as consent agreement. For example:By clicking "Submit", I consent to all the above and confirm that they are corrent to the best of my knowledge'
        >
          Set up consent agreement
        </SubtitleInput>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CommonButton buttonContainer={{ width: screenWidth * 0.25 }}>
          Save
        </CommonButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    alignItems: 'center',
  },
  scrollContainer: {
    // alignItems: 'center',
    width: screenWidth * 0.85,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
  },
});

export default SetConsentFormScreen;
