import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import StudyList from '../../components/StudyList';
import Colors from '../../constants/Colors';
import LogoutButton from '../../components/LogoutButton';
import * as DATA from '../../data/dummy-questions';
import StudyItem from '../../components/StudyItem';

const ParStudyListScreen = (props) => {
  const study = useSelector((state) => state.studies.participant_studies);

  return (
    <View style={styles.screen}>
      <StudyList
        userName='Jing Wu'
        mainTitle='Participant Study List'
        setupContent='Join a study'
        navigation={props.navigation}
        onAddButton={() => props.navigation.navigate('Joinin')}
      />
      <FlatList
        data={study}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => (
          <StudyItem
            studyNumber={itemData.item.studyNumber}
            studyName={itemData.item.studyName}
            isOpen={itemData.item.isOpen}
            buttonText='Start'
            onPress={() =>
              props.navigation.navigate('SampleForm', {
                sId: itemData.item.studyId,
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
      // <LogoutButton onPress={() => navData.navigation.navigate('Signin')} />
      <LogoutButton onPress={() => navData.navigation.navigate('Role')} />
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
    // justifyContent: 'center',
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
