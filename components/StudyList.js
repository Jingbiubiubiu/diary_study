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

      <View style={styles.guideContainer}>
        {props.guide && (
          <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.guideContent}>{props.guideContent}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>All studies</Text>
      </View>
      {props.isRes && (
        <View style={{ width: Dimensions.get('window').width * 0.85 }}>
          <Text style={{ textAlign: 'center' }}>
            Study Numbers could be clicked to show more information
          </Text>
        </View>
      )}
      <View style={styles.listTitleContainer}>
        <View
          style={{
            width: '25%',
            ...styles.listTitle,
          }}
        >
          <TitleName style={{ marginTop: 0 }}>Study Number</TitleName>
        </View>
        <View
          style={{
            width: '50%',
            ...styles.listTitle,
          }}
        >
          <TitleName style={{ marginTop: 0 }}>Study Name</TitleName>
        </View>
        <View
          style={{
            width: '25%',
            borderRightWidth: 1,
            ...styles.listTitle,
          }}
        >
          <TitleName style={{ marginTop: 0 }}>Status </TitleName>
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
  subTitleContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  guideContainer: {
    marginTop: 0,
  },
  guideContent: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  listTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'stretch',
  },
  listTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
});

export default StudyList;
