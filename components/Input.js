import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';

const Input = (props) => {
  return (
    <View style={{ ...styles.inputContainer, ...props.style }}>
      <View style={props.inputLabelContainer}>
        <Text style={{ ...styles.label, ...props.inputLabel }}>
          {props.label}
        </Text>
      </View>
      <TextInput
        {...props}
        multiline={true}
        numberOfLines={props.numberOfLines}
        style={{ ...styles.input, ...props.inputBox }}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // flexDirection: 'row',
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // borderColor: 'blue',
    // borderWidth: 1,
    // marginBottom: 30,
  },
  label: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default Input;
