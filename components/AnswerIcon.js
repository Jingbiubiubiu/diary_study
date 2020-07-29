import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import * as Icons from '../components/Icons';

const chooseIcon = (answerType) => {
  switch (answerType) {
    case 'audio':
      return <Icons.AudioIcon />;
    case 'video':
      return <Icons.VideoIcon />;
    case 'camera':
      return <Icons.CameraIcon />;
    case 'imageFormGallery':
      return <Icons.TextIcon>Image from Gallery</Icons.TextIcon>;
    case 'typeAnswer':
      return <Icons.TextIcon>Type Answer</Icons.TextIcon>;
    case 'screenRecording':
      return <Icons.TextIcon>Screen Recording</Icons.TextIcon>;
    case 'multipleChoice':
      return <Icons.TextIcon>Multiple Choice</Icons.TextIcon>;
    case 'singleChoice':
      return <Icons.TextIcon>Single Choice</Icons.TextIcon>;
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
      <View style={styles.iconContainer1}>{chooseIcon(props.answerType1)}</View>
      <View style={styles.iconContainer2}>{chooseIcon(props.answerType2)}</View>
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
    width: '45%',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 16,
  },
  iconContainer1: {
    width: '23%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer2: {
    width: '23%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnswerIcon;
