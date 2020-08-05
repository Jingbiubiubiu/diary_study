import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SubTitle from '../components/SubTitle';
import * as DropdownPicker from '../components/DropDownPicker';

const SingleChoice = (props) => {
  return (
    <DropdownPicker.DisplayOptionsDropdownPicker
      items={props.questionOptions}
      defaultValue={props.defaultValue}
      // containerStyle={styles.dropdownMenu}
      placeholder='Select the answer'
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      // labelStyle={styles.dropdownLabel}
      onChangeItem={props.onChangeItem}
    />
  );
};

const styles = StyleSheet.create({});

export default SingleChoice;
