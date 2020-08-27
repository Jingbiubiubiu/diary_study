import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import TitleName from '../components/TitleName';
import MainTitle from '../components/MainTitle';
import AddButton from '../components/AddButton';
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
      <View style={styles.guideContainer}>
        {props.guide && (
          <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.guideContent}>{props.guideContent}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.listTitleContainer}>
        <View
          style={{
            width: '20%',
            justifyContent: 'center',
          }}
        >
          <TitleName>Study Number</TitleName>
        </View>
        <View
          style={{
            width: '55%',
            alignItems: 'center',
          }}
        >
          <TitleName>Study Name</TitleName>
        </View>
        <View
          style={{
            width: '25%',
            alignItems: 'center',
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
  },
  guideContainer: {
    marginTop: 10,
  },
  guideContent: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  listTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'center',
  },
});

export default StudyList;
