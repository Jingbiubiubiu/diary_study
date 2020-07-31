import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import * as Icons from '../components/Icons';

const chooseIcon = (answerType, onPress) => {
  switch (answerType) {
    case 'audio':
      return <Icons.AudioIcon onPress={onPress} />;
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
    // case 'singleChoice':
    //   return <Icons.TextIcon>Single Choice</Icons.TextIcon>;
    case 'singleChoice':
      return <Icons.SingleChoiceIcon onPress={() => console.log('single')} />;
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
      <View style={styles.iconContainer1}>
        {chooseIcon(props.answerType, props.onPress)}
      </View>
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
