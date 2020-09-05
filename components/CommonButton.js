import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

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
    width: Dimensions.get('window').width * 0.4,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'red',
    // width: '80%',
  },
});

export default CommonButton;
