import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

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
    width: Dimensions.get('window').width * 0.85,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',

    // color: Colors.primary,
  },
});

export default MainTitle;
