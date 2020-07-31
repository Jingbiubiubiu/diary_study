import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';

import TitleName from '../components/TitleName';
import MainTitle from '../components/MainTitle';
import AddButton from '../components/AddButton';
import LogoutButton from '../components/LogoutButton';
import Colors from '../constants/Colors';

const StudyList = (props) => {
  return (
    <View style={styles.overallContainer}>
      <View style={styles.titleContainer}>
        <TitleName>{props.userName}</TitleName>
        <MainTitle>{props.mainTitle}</MainTitle>
        <AddButton onPress={props.onAddButton}>{props.setupContent}</AddButton>
      </View>
      <View subTitleContainer>
        <Text style={styles.subTitle}>All studies</Text>
      </View>
      <View style={styles.listTitleContainer}>
        <View
          style={{
            width: '20%',
            justifyContent: 'center',
            // alignItems: 'center',
            // borderColor: 'green',
            // borderWidth: 1,
          }}
        >
          <TitleName>Study Number</TitleName>
        </View>
        <View
          style={{
            width: '60%',
            alignItems: 'center',
            // borderColor: 'green',
            // borderWidth: 1,
          }}
        >
          <TitleName>Study Name</TitleName>
        </View>
        <View
          style={{
            width: '20%',
            alignItems: 'center',
            // borderColor: 'green',
            // borderWidth: 1,
          }}
        >
          <TitleName>Status </TitleName>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overallContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    // color: Colors.primary,
  },
  listTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'center',
    // borderColor: 'blue',
    // borderWidth: 1,
  },
});

export default StudyList;
