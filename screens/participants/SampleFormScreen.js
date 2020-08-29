import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import CheckBox from '@react-native-community/checkbox';
import { CheckBox } from 'react-native-elements';

import Colors from '../../constants/Colors';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import InputWithoutLabel from '../../components/InputWithoutLabel';
import CommonButton from '../../components/CommonButton';
import AnswerIcon from '../../components/AnswerIcon';
import SingleChoice from '../../components/SingleChoice';
import * as preStudyAnswersActions from '../../store/actions/preStudyAnswers';

const SampleFormScreen = (props) => {
  const studyNumber = props.navigation.getParam('studyNumber');
  const study = useSelector((state) =>
    state.studies.participant_studies.find(
      (sd) => sd.studyNumber === studyNumber
    )
  );
  const userName = useSelector((state) => state.userName.userName);
  const consentForm = study.consentForm;
  const [agree, setAgree] = useState(false);

  const [visibility, setVisibility] = useState(
    // create an array which length equals to the data's length,
    // and every element in the array is false
    Array(consentForm.preQuestions.length).fill(false)
  );

  const [answers, setAnswers] = useState(
    Array(consentForm.preQuestions.length).fill(null)
  );

  const dispatch = useDispatch();

  const updateAnswers = (index, value) => {
    let updateAnswers = [...answers];
    updateAnswers[index] = value;
    setAnswers(updateAnswers);
  };

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

  const createComponent = (answerType, index, itemData) => {
    switch (answerType) {
      case 'Type':
        return (
          visibility[index] && (
            <InputWithoutLabel
              value={answers[index]}
              onChangeText={(newText) => updateAnswers(itemData.index, newText)}
            />
          )
        );
      case 'Single':
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
    }
  };

  const submitHandler = () => {
    if (agree) {
      let answerwithtype = [];
      for (let i = 0; i < answers.length; i++) {
        answerwithtype.push({
          questionType: consentForm.preQuestions[i].answerType,
          result: answers[i],
        });
      }
      dispatch(preStudyAnswersActions.createPreStudyAnswers(answerwithtype));
      Alert.alert('Save successful!', '', [
        {
          text: 'OK',
          onPress: () =>
            props.navigation.navigate('StudyForm', {
              studyNumber: studyNumber,
            }),
        },
      ]);
    } else {
      Alert.alert('Insufficient Consent', 'Please agreen the consent form', [
        'OK',
      ]);
    }
  };

  return (
    <View style={styles.screen}>
      <TitleName style={styles.titleName}>{userName}</TitleName>
      <MainTitle style={styles.mainName}>Sample study</MainTitle>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle} numberOfLines={2}>
          Consent form, description and pre-study questions
        </Text>
      </View>

      <View style={styles.description}>
        <Text>{consentForm.description}</Text>
      </View>

      <FlatList
        data={consentForm.preQuestions}
        keyExtractor={(item) => item.questionNumber.toString()}
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

      <View style={styles.agreementContainer}>
        {/* <CheckBox
          value={agree}
          onValueChange={() => {
            agree ? setAgree(false) : setAgree(true);
          }}
          tintColors={{ true: Colors.primary }}
        /> */}
        <CheckBox
          checked={agree}
          checkedColor={Colors.primary}
          onIconPress={() => {
            agree ? setAgree(false) : setAgree(true);
          }}
        />
        <Text>{consentForm.agreement} </Text>
      </View>

      <Text>{agree}</Text>

      <View style={styles.buttonContainer}>
        <CommonButton onPress={submitHandler}>Submit</CommonButton>
      </View>
    </View>
  );
};

SampleFormScreen.navigationOptions = (davData) => {
  return {
    headerTitle: 'Sample Study',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  titleName: {
    marginTop: 10,
  },
  subtitleContainer: {
    width: '70%',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    marginTop: 8,
    width: '85%',
  },
  input: {
    marginVertical: 5,
  },
  inputBox: {
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  agreementContainer: {
    width: '83%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default SampleFormScreen;
