import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as DATA from '../../data/dummy-questions';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import CommonButton from '../../components/CommonButton';
import AnswerIcon from '../../components/AnswerIcon';
import SingleChoice from '../../components/SingleChoice';
import InputWithoutLabel from '../../components/InputWithoutLabel';
import * as answersActions from '../../store/actions/answers';
import * as answerPackageActions from '../../store/actions/answerPackage';
import createTimestamp from '../../finctions/createTimestamp';
import * as ShowInfo from '../../components/ShowInfo';

const StudyFormScreen = (props) => {
  const studyId = props.navigation.getParam('sId');
  const study = useSelector((state) =>
    state.studies.studies.find((sd) => sd.studyId === studyId)
  );
  const preStudyAnswers = useSelector(
    (state) => state.preStudyAnswers.preStudyAnswers
  );

  // console.log('preAnswe:', preStudyAnswers);
  const questions = study.questions;

  const [modalVisible, setModalVisible] = useState(false);

  const [submitTime, setSubmitTime] = useState(false);

  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(
    // create an array which length equals to the data's length,
    // and every element in the array is false
    Array(questions.length).fill(false)
  );

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const updateVisibility = (index) => {
    const previous = visibility[index];
    if (previous) {
      let markers = [...visibility];
      markers[index] = false;
      setVisibility(markers);
    } else {
      let markers = [...visibility];
      markers[index] = true;
      setVisibility(markers);
    }
  };

  const updateAnswers = (index, value) => {
    // console.log(index, value);
    let updateAnswers = [...answers];
    // console.log('Original: ', updateAnswers);
    updateAnswers[index] = value;
    setAnswers(updateAnswers);
    // console.log('Update: ', updateAnswers);
  };

  const createComponent = (answerType, index, itemData) => {
    switch (answerType) {
      case 'audio':
        break;
      case 'video':
        break;
      case 'camera':
        break;
      case 'imageFormGallery':
        break;
      case 'typeAnswer':
        return (
          visibility[index] && (
            <InputWithoutLabel
              value={answers[index]}
              onChangeText={(newText) => updateAnswers(itemData.index, newText)}
            />
          )
        );
        break;
      case 'singleChoice':
        return (
          visibility[index] && (
            <View>
              <SingleChoice
                items={[
                  {
                    label: itemData.item.option1,
                    value: itemData.item.option1,
                  },
                  {
                    label: itemData.item.option2,
                    value: itemData.item.option2,
                  },
                  {
                    label: itemData.item.option3,
                    value: itemData.item.option3,
                  },
                  {
                    label: itemData.item.option4,
                    value: itemData.item.option4,
                  },
                ]}
                defaultValue={answers[itemData.index]}
                placeholder='Select the answer'
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                onChangeItem={(item) =>
                  updateAnswers(itemData.index, item.value)
                }
              />
            </View>
          )
        );
        break;
      case 'multipleChoice':
        // let values = [];
        return (
          visibility[index] && (
            <View>
              <SingleChoice
                items={[
                  {
                    label: itemData.item.option1,
                    value: itemData.item.option1,
                  },
                  {
                    label: itemData.item.option2,
                    value: itemData.item.option2,
                  },
                  {
                    label: itemData.item.option3,
                    value: itemData.item.option3,
                  },
                  {
                    label: itemData.item.option4,
                    value: itemData.item.option4,
                  },
                  {
                    label: itemData.item.option5,
                    value: itemData.item.option5,
                  },
                  {
                    label: itemData.item.option6,
                    value: itemData.item.option6,
                  },
                ]}
                defaultValue={answers[itemData.index]}
                // defaultValue={values}
                placeholder='Select the answer'
                multiple={true}
                multipleText='%d items have been selected.'
                min={0}
                max={6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                // onChangeItem={(item) =>
                //   updateAnswers(itemData.index, item.value)
                // }
                onChangeItem={(item) => {
                  // setValues(item);
                  updateAnswers(itemData.index, item);
                  // console.log(item);
                }}
              />
            </View>
          )
        );
        break;
    }
  };

  const onSubmitHandler = () => {
    Alert.alert(
      '',
      'Are you sure you want to submit? You cannot undo this operation',
      [
        { text: 'Yes', onPress: () => submitHandler() },
        { text: 'No', style: 'cancel' },
      ]
    );
  };

  const submitHandler = () => {
    const submitTime = createTimestamp();
    setSubmitTime(submitTime);

    dispatch(
      answerPackageActions.createAnswerPackage(
        studyId,
        preStudyAnswers,
        answers,
        submitTime
      )
    );
    setModalVisible(true);
  };

  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle>{study.studyName}</MainTitle>
      <FlatList
        data={questions}
        // listKey={(item) => item.questionId}
        keyExtractor={(item) => item.questionId}
        renderItem={(itemData) => (
          <View>
            <AnswerIcon
              index={itemData.index + 1}
              content={itemData.item.content}
              answerType={itemData.item.answerType}
              onSelect={() => updateVisibility(itemData.index)}
            />
            {createComponent(
              itemData.item.answerType,
              itemData.index,
              itemData
            )}
          </View>
        )}
      />

      <Text>Answers:{answers.toString()}</Text>
      {/* <Text>states:{visibility.toString()}</Text> */}
      {/* <Text>{values.toString()}</Text> */}
      <View style={styles.buttonContainer}>
        <CommonButton onPress={() => onSubmitHandler()}>Submit</CommonButton>
      </View>
      <ShowInfo.ShowShortInfo
        content='Thank you for your submission.'
        dateContent='Submission date and time:'
        time={submitTime}
        visible={modalVisible}
        onPress={() => {
          setModalVisible(!modalVisible);
          props.navigation.navigate('ParStudyList');
        }}
      />
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

  buttonContainer: {
    marginBottom: 20,
  },
});

export default StudyFormScreen;
