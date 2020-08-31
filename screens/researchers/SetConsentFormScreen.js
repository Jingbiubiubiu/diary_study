import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import SubTitle from '../../components/SubTitle';
import AddButton from '../../components/AddButton';
import CommonButton from '../../components/CommonButton';
import SubtitleInput from '../../components/SubtitleInput';
import AnswerIcon from '../../components/AnswerIcon';
import * as consentFormActions from '../../store/actions/consentForm';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SetConsentFormScreen = (props) => {
  const userName = useSelector((state) => state.userName.userName);

  const consentForm = useSelector((state) => state.consentForm.consentForm);

  const preQuestions = useSelector(
    (state) => state.preStudyQuesitons.preStudyQuesitons
  );

  const [description, setDescription] =
    consentForm === null ? useState() : useState(consentForm.description);

  const [agreement, setAgreement] =
    consentForm === null ? useState() : useState(consentForm.agreement);

  const dispatch = useDispatch();

  const onSaveHandler = () => {
    if (description === undefined) {
      Alert.alert('Error', 'There is no description. Please set.');
    }
    if (agreement === undefined) {
      Alert.alert('Error', 'There is no consent agreement. Please set.');
    }
    Alert.alert('', 'Are you sure you want to set up this consent form?', [
      { text: 'Yes', onPress: () => saveHandler() },
      { text: 'No', style: 'cancel' },
    ]);
  };

  const saveHandler = () => {
    if (description !== undefined && agreement !== undefined) {
      dispatch(
        consentFormActions.createConsentForm(
          description,
          preQuestions,
          agreement
        )
      );
      Alert.alert('Save successful!', '', [
        {
          text: 'OK',
          onPress: () => props.navigation.goBack(),
        },
      ]);
    }
  };

  return (
    <View style={styles.screen}>
      <TitleName>{userName}</TitleName>
      <MainTitle style={styles.mainTitle}>Setup Consent Form</MainTitle>

      {/*since FlatList connot be nested in the ScrollView*/}
      {/* add the elements which should be scrollable to the ListHeaderComponent */}
      <FlatList
        ListHeaderComponent={
          <View style={styles.scrollContainer}>
            <SubtitleInput
              numberOfLines={4}
              value={description}
              onChangeText={(newText) => setDescription(newText)}
            >
              Input the description of the study
            </SubtitleInput>

            <SubtitleInput
              numberOfLines={4}
              placeholder='Input what you would like to say as consent agreement. For example:By clicking "Submit", I consent to all the above and confirm that they are corrent to the best of my knowledge'
              value={agreement}
              onChangeText={(newText) => setAgreement(newText)}
            >
              Set up consent agreement
            </SubtitleInput>

            <View style={{ alignItem: 'flex-start' }}>
              <SubTitle>Set up pre-study questions</SubTitle>
            </View>

            <AddButton
              style={{ marginTop: 20 }}
              navigation={props.navigation}
              onPress={() => props.navigation.navigate('SetPreQuestion')}
            >
              Press here to start
            </AddButton>
          </View>
        }
        style={styles.preQuestionsContainer}
        data={preQuestions}
        keyExtractor={(item) => item.questionNumber.toString()}
        renderItem={(itemData) => (
          <View style={styles.flatListItemsContainer}>
            <AnswerIcon
              index={itemData.index + 1}
              content={itemData.item.content}
              answerType={itemData.item.answerType}
            />
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <CommonButton
          buttonContainer={{ width: screenWidth * 0.25 }}
          onPress={() => onSaveHandler()}
        >
          Save
        </CommonButton>
      </View>
    </View>
  );
};

SetConsentFormScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Set Consent Form',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    // width: screenWidth * 0.85,
  },
  mainTitle: {
    alignItems: 'center',
  },
  scrollContainer: {
    width: screenWidth * 0.85,
    flex: 1,

    // borderColor: 'red',
    // borderWidth: 1,
  },
  preQuestionsContainer: {
    height: screenHeight * 0.22,
  },
  flatListItemsContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default SetConsentFormScreen;
