import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import SubTitle from '../../components/SubTitle';
import CommonButton from '../../components/CommonButton';
import SubtitleInput from '../../components/SubtitleInput';
import Input from '../../components/Input';
import * as DropdownPicker from '../../components/DropDownPicker';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SetPreQuestionsScreen = (props) => {
  const [dropdown, setDropdown] = useState('text');
  const [isSingleChoice, setIsSingleChoice] = useState(false);
  const dropdownItems = [
    {
      label: 'Text',
      value: 'text',
    },
    {
      label: 'Single Choice',
      value: 'single choice',
    },
  ];

  const dropdownHandler = (value) => {
    setDropdown(value);
    if (value === 'single choice') {
      setIsSingleChoice(true);
    }
    if (value !== 'single choice') {
      setIsSingleChoice(false);
    }
  };

  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle style={styles.mainTitle}>Setup Pre-study Questions</MainTitle>

      <ScrollView contentContainerStyle={{ height: screenHeight * 0.85 }}>
        <View style={styles.scrollContainer}>
          <SubtitleInput numberOfLines={4} style={{ marginBottom: 10 }}>
            Type the quetion
          </SubtitleInput>
          <SubTitle>Select the answer type</SubTitle>
          <DropdownPicker.ChooseTypeDropdownPicker
            items={dropdownItems}
            defaultValue={dropdown}
            // containerStyle={styles.dropdownMenu}
            placeholder='Select the answer type'
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            // labelStyle={styles.dropdownLabel}
            onChangeItem={(item) => dropdownHandler(item.value)}
          />

          {isSingleChoice && (
            <View>
              <Input label='Input first option:' style={styles.input} />
              <Input label='Input second option:' style={styles.input} />
              <Input label='Input third option:' style={styles.input} />
              <Input label='Input forth option:' style={styles.input} />
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CommonButton
          buttonContainer={{ width: screenWidth * 0.25 }}
          onPress={() => props.navigation.navigate('SetConsentForm')}
        >
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
    width: screenWidth * 0.8,
    alignItems: 'center',
  },
  // subTitleContainer: {
  //   alignItems: 'stretch',
  // },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginTop: 10,
  },
  scrollContainer: {
    // borderColor: 'blue',
    // borderWidth: 1,
    flex: 1,
  },
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
  },
  dropdownContainer: {
    marginVertical: 15,
  },
  dropdownMenu: {
    height: 50,
    width: screenWidth * 0.85,
  },
  dropdownLabel: {
    fontSize: 18,
  },
  input: {
    alignItems: 'flex-start',
    width: '100%',
  },
});

export default SetPreQuestionsScreen;
