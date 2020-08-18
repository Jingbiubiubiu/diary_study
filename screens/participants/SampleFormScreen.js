import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';

import Colors from '../../constants/Colors';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import InputWithoutLabel from '../../components/InputWithoutLabel';
import * as Icons from '../../components/Icons';
import CommonButton from '../../components/CommonButton';
import * as DATA from '../../data/dummy-questions';
import AnswerIcon from '../../components/AnswerIcon';
import SingleChoice from '../../components/SingleChoice';
import * as preStudyAnswersActions from '../../store/actions/preStudyAnswers';

const screenWidth = Dimensions.get('window').height;

const SampleFormScreen = (props) => {
  const studyId = props.navigation.getParam('sId');
  // const studyId = 's1';
  // const consentForm = DATA.consentForm[0];
  const study = useSelector((state) =>
    state.studies.participant_studies.find((sd) => sd.studyId === studyId)
  );
  const consentForm = study.consentForm;
  console.log(consentForm);
  // console.log(consentForm);

  const [agree, setAgree] = useState(false);
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(
    // create an array which length equals to the data's length,
    // and every element in the array is false
    Array(consentForm.preQuestions.length).fill(false)
  );

  const [answers, setAnswers] = useState(
    Array(consentForm.preQuestions.length).fill(null)
  );

  const updateAnswers = (index, value) => {
    // console.log(index, value);
    let updateAnswers = [...answers];
    // console.log('Original: ' + updateAnswers.toString());
    updateAnswers[index] = value;
    setAnswers(updateAnswers);
    // console.log('Update: ' + updateAnswers.toString());
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
    console.log(answerType);
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
        break;
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
        break;
    }
  };

  const submitHandler = () => {
    if (agree) {
      dispatch(preStudyAnswersActions.createPreStudyAnswers(answers));
      Alert.alert('Save successful!', '', [
        {
          text: 'OK',
          onPress: () =>
            props.navigation.navigate('StudyForm', { sId: studyId }),
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
      <TitleName style={styles.titleName}>Jing Wu</TitleName>
      <MainTitle style={styles.mainName}>Sample study</MainTitle>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle} numberOfLines={2}>
          Consent form, description and pre-study questions
        </Text>
      </View>
      {/* <ScrollView contentContainerStyle={styles.scrollView}> */}
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
        {/* <Icons.CommonCheckbox
          value={agree}
          onChangeText={agreeHandler}
          onPress={agreeHandler}
        >
          {consentForm.agreement}
        </Icons.CommonCheckbox> */}
        <CheckBox
          value={agree}
          onValueChange={() => {
            agree ? setAgree(false) : setAgree(true);
          }}
          tintColors={{ true: Colors.primary }}
        />
        <Text>{consentForm.agreement} </Text>
      </View>
      {/* </ScrollView> */}
      {/* <Text>Answers:{answers.toString()}</Text> */}
      <Text>{agree}</Text>
      {/* <Text>states:{visibility.toString()}</Text> */}

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
    // width: screenWidth,
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
    // alignItems: 'center',
    // borderColor: 'green',
    // borderWidth: 1,
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
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  buttonContainer: {
    marginBottom: 30,
  },
});

export default SampleFormScreen;
