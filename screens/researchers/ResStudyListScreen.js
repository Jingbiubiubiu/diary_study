import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';

import StudyList from '../../components/StudyList';
import Colors from '../../constants/Colors';
import LogoutButton from '../../components/LogoutButton';
import * as DATA from '../../data/dummy-questions';
import StudyItem from '../../components/StudyItem';

const onEndHandler = () => {
  Alert.alert(
    '',
    'Are you sure you want to end this study? You cannot undo this operation',
    [
      { text: 'Yes', onPress: () => console.log('Yes') },
      { text: 'No', style: 'cancel' },
    ]
  );
};

const ResStudyListScreen = (props) => {
  const study = DATA.STUDY1;

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
        data={study}
        keyExtractor={(item) => item.studyId}
        renderItem={(itemData) => (
          <StudyItem
            studyNumber={itemData.item.studyNumber}
            studyName={itemData.item.studyName}
            isOpen={itemData.item.isOpen}
            buttonText='End'
            onPress={onEndHandler}
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
