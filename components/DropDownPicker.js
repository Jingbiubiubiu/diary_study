import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

const screenWidth = Dimensions.get('window').width;

const CusDropdownPicker = (props) => {
  return (
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        items={props.items}
        defaultValue={items.defaultValue}
        containerStyle={styles.dropdownMenu}
        placeholder={props.placeholder}
        itemStyle={props.itemStyle}
        labelStyle={styles.dropdownLabel}
        onChangeItem={props.onChangeItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 15,
  },
  dropdownMenu: {
    height: 50,
    width: Dimensions.get('window').width * 0.85,
  },
  dropdownLabel: {
    fontSize: 18,
  },
});

export default CusDropdownPicker;
