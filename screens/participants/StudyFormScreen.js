import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

import * as DATA from '../../data/dummy-questions';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import * as Icons from '../../components/Icons';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import AnswerIcon from '../../components/AnswerIcon';

// const chooseIcon = (answerType) => {
//   switch (answerType) {
//     case 'audio':
//       return <Icons.AudioIcon />;
//     case 'video':
//       return <Icons.VideoIcon />;
//     case 'camera':
//       return <Icons.CameraIcon />;
//     case 'imageFormGallery':
//       return <Icons.TextIcon>Image from Gallery</Icons.TextIcon>;
//     case 'typeAnswer':
//       return <Icons.TextIcon>Type Answer</Icons.TextIcon>;
//     case 'screenRecording':
//       return <Icons.TextIcon>Screen Recording</Icons.TextIcon>;
//     case 'multipleChoice':
//       return <Icons.TextIcon>Multiple Choice</Icons.TextIcon>;
//     case 'singleChoice':
//       return <Icons.TextIcon>Single Choice</Icons.TextIcon>;
//     default:
//       return;
//   }
// };

// const QuestionItem = (props) => {
//   return (
//     <View style={styles.questionContainer}>
//       <View style={styles.questionTextContainer}>
//         <Text style={styles.questionText}>
//           {props.index}. {props.content}
//         </Text>
//       </View>
//       <View style={styles.iconContainer1}>{chooseIcon(props.answerType1)}</View>
//       <View style={styles.iconContainer2}>{chooseIcon(props.answerType2)}</View>
//     </View>
//   );
// };

const StudyFormScreen = (props) => {
  const questions = DATA.QUESTION1;
  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle>Personal Info</MainTitle>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.questionId}
        renderItem={(itemData) => (
          <AnswerIcon
            index={itemData.index + 1}
            content={itemData.item.content}
            answerType1={itemData.item.answerType1}
            answerType2={itemData.item.answerType2}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <CommonButton>Submit</CommonButton>
      </View>
    </View>
  );
};

StudyFormScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Study Form',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  // questionContainer: {
  //   marginTop: 15,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   width: Dimensions.get('window').width * 0.85,
  // },
  // questionTextContainer: {
  //   width: '45%',
  //   justifyContent: 'center',
  // },
  // questionText: {
  //   fontSize: 16,
  // },
  // iconContainer1: {
  //   width: '23%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // iconContainer2: {
  //   width: '23%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default StudyFormScreen;
