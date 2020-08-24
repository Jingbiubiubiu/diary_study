import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Input from './Input';

export const SingleChoice = (props) => {
  return (
    <View style={styles.choiceContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
      <Input
        label='First Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
        value={props.option1}
        onChangeText={props.setOption1}
      />
      <Input
        label='Second Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
        value={props.option2}
        onChangeText={props.setOption2}
      />
      <Input
        label='Third Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
        value={props.option3}
        onChangeText={props.setOption3}
      />
      <Input
        label='Forth Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
        value={props.option4}
        onChangeText={props.setOption4}
      />
    </View>
  );
};

export const MultipleChoice = (props) => {
  return (
    <View style={styles.choiceContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
      <Input
        label='First Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
        value={props.option1}
        onChangeText={props.setOption1}
      />
      <Input
        label='Second Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
        value={props.option2}
        onChangeText={props.setOption2}
      />
      <Input
        label='Third Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
        value={props.option3}
        onChangeText={props.setOption3}
      />
      <Input
        label='Forth Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
        value={props.option4}
        onChangeText={props.setOption4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  choiceContainer: {
    marginTop: 20,
    // marginBottom: 10,
  },
  textContainer: {
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  inputBox: {
    width: '100%',
  },
});
