import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SubTitle from '../components/SubTitle';
import DropdownPicker from '../components/DropDownPicker';

const SingleChoice = (props) => {
  return (
    <View style={{ ...props.style }}>
      {/* <SubTitle>{props.questionContent}</SubTitle> */}
      <DropdownPicker
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
    </View>
  );
};

const styles = StyleSheet.create({});

export default SingleChoice;
