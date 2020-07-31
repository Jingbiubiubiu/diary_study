import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubTitle = (props) => {
  return (
    <View style={{ ...styles.subTitleContainer, ...props.style }}>
      <Text style={{ ...styles.subTitleText, ...props.subTitleText }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitleContainer: {
    marginTop: 15,
    alignItems: 'flex-start',
    // borderColor: 'blue',
    // borderWidth: 1,
    width: '85%',
  },
  subTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default SubTitle;
