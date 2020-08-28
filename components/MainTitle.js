import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const MainTitle = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={{ ...styles.mainTitle, ...props.textStyle }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    // color: Colors.primary,
  },
});

export default MainTitle;
