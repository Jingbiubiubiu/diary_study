import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import StudyList from '../../components/StudyList';
import Colors from '../../constants/Colors';
import LogoutButton from '../../components/LogoutButton';
import StudyItem from '../../components/StudyItem';
import createTimestamp from '../../functions/createTimestamp';
import * as studyActions from '../../store/actions/study';
import * as ShowInfo from '../../components/ShowInfo';

const ResStudyListScreen = (props) => {
  // const studies = DATA.STUDY1;
  const userName = useSelector((state) => state.userName.userName);
  const studies = useSelector((state) => state.studies.researcher_studies);
  const [modalVisible, setModalVisible] = useState(false);
  const [endTime, setEndTime] = useState(false);

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
    const endTime = createTimestamp();
    setEndTime(endTime);
    dispatch(studyActions.endStudy(id, endTime));
    setModalVisible(true);
  };

  return (
    <View style={styles.screen}>
      <StudyList
        userName={userName}
        mainTitle='Researcher Study List'
        setupContent='Set up a study'
        navigation={props.navigation}
        onAddButton={() => {
          props.navigation.navigate('SetNewStudy');
        }}
      />
      <FlatList
        data={studies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => (
          <StudyItem
            studyNumber={itemData.item.studyNumber}
            studyName={itemData.item.studyName}
            isOpen={itemData.item.isOpen}
            buttonText='End'
            onPress={() => onEndHandler(itemData.item.id)}
          />
        )}
      />
      <ShowInfo.ShowShortInfo
        content='This study has been ended.'
        dateContent='End date and time:'
        time={endTime}
        visible={modalVisible}
        onPress={() => {
          setModalVisible(!modalVisible);
          // props.navigation.navigate('ResStudyList');
        }}
      />
    </View>
  );
};

ResStudyListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Researcher Study List',
    headerRight: () => (
      <LogoutButton onPress={() => navData.navigation.navigate('Signin')} />
      // <LogoutButton onPress={() => navData.navigation.navigate('Role')} />
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
