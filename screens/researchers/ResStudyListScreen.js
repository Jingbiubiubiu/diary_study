import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import StudyList from '../../components/StudyList';
import Colors from '../../constants/Colors';
import LogoutButton from '../../components/LogoutButton';
import StudyItem from '../../components/StudyItem';
import createTimestamp from '../../finctions/createTimestamp';
import * as studyActions from '../../store/actions/study';

const ResStudyListScreen = (props) => {
  // const studies = DATA.STUDY1;
  const studies = useSelector((state) => state.studies.studies);
  const dispatch = useDispatch();

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

  const endHandler = (id) => {
    // console.log(id);
    dispatch(studyActions.endStudy(id));
    // console.log(studies);
  };

  return (
    <View style={styles.screen}>
      <StudyList
        userName='Jing Wu'
        mainTitle='Researcher Study List'
        setupContent='Set up a study'
        navigation={props.navigation}
        onAddButton={() => {
          props.navigation.navigate('SetNewStudy');
        }}
      />
      <FlatList
        data={studies}
        keyExtractor={(item) => item.studyId}
        renderItem={(itemData) => (
          <StudyItem
            studyNumber={itemData.item.studyNumber}
            studyName={itemData.item.studyName}
            isOpen={itemData.item.isOpen}
            buttonText='End'
            onPress={() => onEndHandler(itemData.item.studyId)}
          />
        )}
      />
    </View>
  );
};

ResStudyListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Researcher Study List',
    headerRight: () => (
      // <LogoutButton onPress={() => navData.navigation.navigate('Signin')} />
      <LogoutButton onPress={() => navData.navigation.navigate('Role')} />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 5,
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default ResStudyListScreen;
