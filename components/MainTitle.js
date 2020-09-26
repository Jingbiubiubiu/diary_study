import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

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
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
});

export default MainTitle;
