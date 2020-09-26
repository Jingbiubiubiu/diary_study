import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TitleName;
