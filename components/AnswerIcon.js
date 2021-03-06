import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import * as Icons from '../components/Icons';

const chooseIcon = (props) => {
  switch (props.answerType) {
    case 'Audio':
      return <Icons.AudioIcon {...props} />;
    case 'Video':
      return <Icons.VideoIcon {...props} />;
    case 'Photo':
      return <Icons.CameraIcon {...props} />;
    case 'Gallary':
      return (
        <Icons.TextIcon
          {...props}
          textStyle={{
            fontSize: 13,
          }}
        >
          Select from Gallery
        </Icons.TextIcon>
      );
    case 'Type':
      return <Icons.TextIcon {...props}>Type Answer</Icons.TextIcon>;
    case 'Multiple':
      return <Icons.TextIcon {...props}>Multiple Choice</Icons.TextIcon>;
    case 'Single':
      return <Icons.TextIcon {...props}>Single Choice</Icons.TextIcon>;
    default:
      return;
  }
};

const AnswerIcon = (props) => {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionTextContainer}>
        <Text style={{ ...styles.questionText, ...props.questionText }}>
          {props.index}. {props.content}
        </Text>
      </View>
      <View style={styles.iconContainer1}>{chooseIcon(props)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.85,
  },
  questionTextContainer: {
    width: '70%',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 16,
  },
  iconContainer1: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnswerIcon;
