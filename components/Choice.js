import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Input from '../components/Input';

const Choice = (props) => {
  return (
    <View style={styles.choiceContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
      <Input
        label='First Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
      />
      <Input
        label='Second Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
      />
      <Input
        label='Third Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
      />
      <Input
        label='Forth Option:'
        style={styles.inputContainer}
        inputBox={styles.inputBox}
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

export default Choice;
