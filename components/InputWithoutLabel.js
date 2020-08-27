import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

const InputWithoutLabel = (props) => {
  return (
    <View style={{ ...styles.inputContainer, ...props.inputContainer }}>
      <TextInput
        style={{ ...styles.inputBox, ...props.inputBox }}
        multiline={true}
        numberOfLines={props.numberOfLines}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  inputBox: {
    width: Dimensions.get('window').width * 0.85,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

export default InputWithoutLabel;
