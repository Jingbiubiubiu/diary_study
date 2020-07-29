import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const TitleName = (props) => {
  return (
    <View>
      <Text style={{ ...styles.titleName, ...props.style }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleName: {
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // color: Colors.primary,
  },
});

export default TitleName;
