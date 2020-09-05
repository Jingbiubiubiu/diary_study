import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import CommonButton from '../components/CommonButton';
import Colors from '../constants/Colors';

const StudyItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [isClose, setIsClose] = useState(false);

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
      if (!isClose) {
        setIsClose(true);
      }
      return (
        <View>
          <Text>Closed</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <View style={styles.studyItemContainer}>
        <View style={styles.studyNumber}>
          <TouchableOpacity
            onPress={() => {
              showDetail ? setShowDetail(false) : setShowDetail(true);
              showLink ? setShowLink(false) : setShowLink(true);
            }}
          >
            <Text style={{ color: Colors.primary }}>{props.studyNumber}</Text>
          </TouchableOpacity>
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
      <View>
        {showDetail && !isClose && (
          <View style={styles.passwordContainer}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Study Password:</Text>{' '}
              {props.studyPassword}
            </Text>
          </View>
        )}
        {isClose && showLink && (
          <View style={styles.passwordContainer}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Answer link:</Text>{' '}
              {props.url}study/result/?studyNumber={props.studyNumber}
            </Text>
          </View>
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
  passwordContainer: {
    width: Dimensions.get('window').width * 0.85,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    // borderTopWidth: 1,
    paddingLeft: 10,
    borderColor: '#ccc',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default StudyItem;
