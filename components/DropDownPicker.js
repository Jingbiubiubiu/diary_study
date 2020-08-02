import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

// const screenWidth = Dimensions.get('window').width;

const CusDropdownPicker = (props) => {
  return (
    // <View style={styles.dropdownContainer}>
    <View
      style={{
        // The solution: Apply zIndex to any device except Android
        ...(Platform.OS !== 'android' && {
          zIndex: 10,
        }),
      }}
    >
      <DropDownPicker
        items={props.items}
        defaultValue={props.defaultValue}
        containerStyle={styles.dropdownMenu}
        placeholder={props.placeholder}
        itemStyle={props.itemStyle}
        labelStyle={styles.dropdownLabel}
        onChangeItem={props.onChangeItem}
        // zIndex={10000}
        dropDownStyle={styles.dropDownStyle}
        style={{ backgroundColor: '#ffffff' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 15,

    borderColor: 'red',
    borderWidth: 1,
  },
  dropdownMenu: {
    height: 50,
    width: Dimensions.get('window').width * 0.85,
    zIndex: 10,
    // zIndex: 2000000,
  },
  dropdownLabel: {
    fontSize: 18,
  },
  dropDownStyle: {
    // borderColor: 'blue',
    // borderWidth: 1,
    // backgroundColor: 'red',
    // zIndex: 2,
    backgroundColor: 'white',
  },
});

export default CusDropdownPicker;
