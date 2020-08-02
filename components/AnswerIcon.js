import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import * as Icons from '../components/Icons';

const chooseIcon = (props) => {
  switch (props.answerType) {
    case 'audio':
      return <Icons.AudioIcon {...props} />;
    case 'video':
      return <Icons.VideoIcon {...props} />;
    case 'camera':
      return <Icons.CameraIcon {...props} />;
    case 'imageFormGallery':
      return <Icons.TextIcon {...props}>Image from Gallery</Icons.TextIcon>;
    case 'typeAnswer':
      return <Icons.TextIcon {...props}>Type Answer</Icons.TextIcon>;
    case 'multipleChoice':
      return <Icons.TextIcon {...props}>Multiple Choice</Icons.TextIcon>;
    case 'singleChoice':
      return <Icons.TextIcon {...props}>Single Choice</Icons.TextIcon>;
    default:
      return;
  }
};

const AnswerIcon = (props) => {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionTextContainer}>
        <Text style={styles.questionText}>
          {props.index}. {props.content}
        </Text>
      </View>
      <View style={styles.iconContainer1}>{chooseIcon(props)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginTop: 15,
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
  // iconContainer1: {
  //   width: '23%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderColor: 'red',
  //   borderWidth: 1,
  // },
  iconContainer1: {
    width: '23%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 1,
  },
});

export default AnswerIcon;
