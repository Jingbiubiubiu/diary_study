import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';

import CommonButton from '../components/CommonButton';

const StudyItem = (props) => {
  const stateIdentifier = (isOpen, isSubmitted, onPress, text) => {
    if (isSubmitted) {
      return (
        <View>
          <Text>Finished</Text>
        </View>
      );
    } else if (isOpen) {
      return (
        <View>
          <CommonButton
            buttonContainer={styles.buttonContainer}
            onPress={onPress}
            text={{
              paddingVertical: 0,
              // paddingHorizontal: 15,
              fontSize: 14,
              width: '100%',
              // borderColor: 'red',
              // borderWidth: 1,
            }}
          >
            {text}
          </CommonButton>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Closed</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.studyItemContainer}>
      <View style={styles.studyNumber}>
        <Text>{props.studyNumber}</Text>
      </View>
      <View style={styles.studyName}>
        <Text>{props.studyName}</Text>
      </View>
      <View style={styles.status}>
        {stateIdentifier(
          props.isOpen,
          props.isSubmitted,
          props.onPress,
          props.buttonText
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  studyItemContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: Dimensions.get('window').width * 0.85,
  },
  studyNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    width: '25%',
    paddingVertical: 3,
    // marginLeft: Dimensions.get('window').width / 30,
  },
  studyName: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '50%',
    paddingVertical: 3,
    paddingHorizontal: 3,
    // marginLeft: Dimensions.get('window').width / 30,
  },
  status: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    width: '25%',
    paddingVertical: 3,
  },
  buttonContainer: {
    width: '100%',
  },
});

export default StudyItem;
