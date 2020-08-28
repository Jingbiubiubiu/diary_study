import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import StudyList from '../../components/StudyList';
import Colors from '../../constants/Colors';
import LogoutButton from '../../components/LogoutButton';
import StudyItem from '../../components/StudyItem';
import * as studyActions from '../../store/actions/study';
import URL from '../../constants/URL';

const ParStudyListScreen = (props) => {
  const study = useSelector((state) => state.studies.participant_studies);
  const userName = useSelector((state) => state.userName.userName);

  const dispatch = useDispatch();

  const ParticipantListRetrieval = () => {
    let url = URL.address + 'study/participant/?email=' + userName;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(studyActions.initialize_participant_studies(json));
      });
  };

  useEffect(() => {
    ParticipantListRetrieval();
  }, []);

  return (
    <View style={styles.screen}>
      <StudyList
        userName={userName}
        mainTitle='Participant Study List'
        setupContent='Join a study'
        navigation={props.navigation}
        onAddButton={() => props.navigation.navigate('Joinin')}
      />

      <FlatList
        data={study}
        keyExtractor={(item) => item.studyNumber}
        renderItem={(itemData) => (
          <StudyItem
            studyNumber={itemData.item.studyNumber}
            studyName={itemData.item.studyName}
            isOpen={itemData.item.isOpen}
            isSubmitted={itemData.item.submitted}
            buttonText='Start'
            onPress={() =>
              props.navigation.navigate('SampleForm', {
                studyNumber: itemData.item.studyNumber,
              })
            }
          />
        )}
      />
    </View>
  );
};

ParStudyListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Participant Study List',
    headerRight: () => (
      <LogoutButton onPress={() => navData.navigation.navigate('Signin')} />
    ),
  };
};

const styles = StyleSheet.create({
  studyItemContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.85,
  },
  table: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 5,
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default ParStudyListScreen;
