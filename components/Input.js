import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';

const Input = (props) => {
  return (
    <View style={{ ...styles.inputContainer, ...props.style }}>
      <View
        style={{ ...styles.inputLabelContainer, ...props.inputLabelContainer }}
      >
        <Text style={{ ...styles.label, ...props.inputLabel }}>
          {props.label}
        </Text>
      </View>
      <TextInput
        {...props}
        multiline={false}
        numberOfLines={props.numberOfLines}
        style={{ ...styles.input, ...props.inputBox }}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
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
  inputLabelContainer: {
    width: '100%',
    // borderColor: 'green',
    // borderWidth: 1,
  },
  label: {
    width: '100%',
    marginVertical: 8,
    fontSize: 18,
    fontWeight: 'bold',
    // borderColor: 'red',
    // borderWidth: 1,
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
