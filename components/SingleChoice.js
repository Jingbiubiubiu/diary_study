import React from 'react';
import { StyleSheet } from 'react-native';

import * as DropdownPicker from '../components/DropDownPicker';

const SingleChoice = (props) => {
  return (
    <DropdownPicker.DisplayOptionsDropdownPicker
      {...props}
      items={props.items}
      defaultValue={props.defaultValue}
      placeholder='Select the answer'
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      onChangeItem={props.onChangeItem}
    />
  );
};

const styles = StyleSheet.create({});

export default SingleChoice;
