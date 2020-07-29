import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

const LogoutButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
      <Text style={styles.text}>Log out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: 10,
  },
  text: {
    marginHorizontal: 5,
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
