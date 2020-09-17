import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';

const SubtitleInput = (props) => {
  return (
    <View style={{ ...styles.subTitleContainer, ...props.style }}>
      <Text style={styles.subTitleText}>{props.children}</Text>
      <TextInput
        multiline={true}
        numberOfLines={props.numberOfLines}
        placeholder={props.placeholder}
        style={{ ...styles.input, ...props.input }}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  subTitleContainer: {
    marginTop: 15,
    alignItems: 'flex-start',
    // borderColor: 'blue',
    // borderWidth: 1,
    width: '100%',
  },
  subTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    // height: Dimensions.get('window').height * 0.15,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

export default SubtitleInput;
