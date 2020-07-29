import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

const CommonButton = (props) => {
  return (
    <TouchableOpacity {...props} onPress={props.onPress}>
      <View style={{ ...styles.buttonContainer, ...props.buttonContainer }}>
        <Text style={{ ...styles.text, ...props.text }}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'red',
  },
});

export default CommonButton;
