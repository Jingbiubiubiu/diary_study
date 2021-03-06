import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import StudyList from '../../components/StudyList';
import Colors from '../../constants/Colors';
import LogoutButton from '../../components/LogoutButton';
import StudyItem from '../../components/StudyItem';
import createTimestamp from '../../functions/createTimestamp';
import * as studyActions from '../../store/actions/study';
import * as consentFormActions from '../../store/actions/consentForm';
import * as questionActions from '../../store/actions/question';
import * as preStudyQuestionActions from '../../store/actions/preStudyQuestion';
import * as ShowInfo from '../../components/ShowInfo';
import URL from '../../constants/URL';

const ResStudyListScreen = (props) => {
  const userName = useSelector((state) => state.userName.userName);
  const studies = useSelector((state) => state.studies.researcher_studies);
  const [modalVisible, setModalVisible] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [answerLink, setAnswerLink] = useState(null);

  const dispatch = useDispatch();

  const ResearcherListRetrieval = () => {
    let url = URL.address + 'study/researcher/?email=' + userName;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(studyActions.initialize_researcher_studies(json));
      });
  };

  useEffect(() => {
    ResearcherListRetrieval();
  }, []);

  const onEndHandler = (id) => {
    Alert.alert(
      '',
      'Are you sure you want to end this study? You cannot undo this operation',
      [
        { text: 'Yes', onPress: () => endHandler(id) },
        { text: 'No', style: 'cancel' },
      ]
    );
  };

  const endHandler = (studyNumber) => {
    setAnswerLink(URL.address + 'study/result/?studyNumber=' + studyNumber);
    const endTime = createTimestamp();
    setEndTime(endTime);
    let url = URL.address + 'study/endstudy/?studyNumber=' + studyNumber;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        ResearcherListRetrieval();
        setModalVisible(true);
      });
  };

  const setupHandler = () => {
    dispatch(consentFormActions.clearConsentForm());
    dispatch(questionActions.clearQuestion());
    dispatch(preStudyQuestionActions.clearPreStudyQuestion());
    props.navigation.navigate('SetNewStudy');
  };

  return (
    <View style={styles.screen}>
      <StudyList
        userName={userName}
        mainTitle='Researcher Study List'
        setupContent='Set up a study'
        guide={true}
        isRes={true}
        guideContent='Guide to get answer'
        navigation={props.navigation}
        onPress={() => props.navigation.navigate('Guide')}
        onAddButton={() => {
          setupHandler();
        }}
      />

      <FlatList
        data={studies}
        keyExtractor={(item) => item.studyNumber}
        renderItem={(itemData) => (
          <StudyItem
            studyNumber={itemData.item.studyNumber}
            studyName={itemData.item.studyName}
            studyPassword={itemData.item.studyPassword}
            url={URL.address}
            isOpen={itemData.item.isOpen}
            buttonText='End'
            onPress={() => onEndHandler(itemData.item.studyNumber)}
          />
        )}
      />

      <ShowInfo.ShowShortInfo
        content='This study has been ended.'
        dateContent='End date and time:'
        time={endTime}
        endStudy={true}
        link={answerLink}
        visible={modalVisible}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </View>
  );
};

ResStudyListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Researcher Study List',
    headerRight: () => (
      <LogoutButton
        onPress={() => {
          navData.navigation.navigate('Signin');
        }}
      />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  text: {
    marginHorizontal: 5,
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default ResStudyListScreen;
