import React from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';

import CommonButton from './CommonButton';
import Colors from '../constants/Colors';

export const ShowLongInfo = (props) => {
  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.commonText}>
              The study{' '}
              <Text style={styles.highlight}>“{props.studyName}”</Text> has set
              up
            </Text>
          </View>
          <View style={styles.emphasisContainer}>
            <Text style={styles.emphasis}>
              Please write down or record the information below, you will need
              it to tell participants
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.commonText}>
              The study number is{' '}
              <Text style={styles.highlight}>{props.studyNumber}</Text>
            </Text>
            <Text style={styles.commonText}>
              The study password is{' '}
              <Text style={styles.highlight}>{props.studyPassword}</Text>
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <CommonButton onPress={props.onPress}>OK</CommonButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const ShowShortInfo = (props) => {
  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={styles.centeredView}>
        <View style={{ ...styles.modalView, ...styles.modalViewShort }}>
          <View>
            <Text style={styles.commonText}>{props.content}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.commonText}>
              {props.dateContent}
              {props.time}
            </Text>
          </View>
          {props.endStudy && (
            <View>
              <Text style={styles.emphasis}>
                Please write down or record the link below to get the answers:
              </Text>
              <View style={{ marginTop: 5 }}>
                <Text style={styles.linkText}>{props.link}</Text>
              </View>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <CommonButton onPress={props.onPress}>OK</CommonButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    justifyContent: 'space-around',
    width: '80%',
    height: '55%',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalViewShort: {
    width: '80%',
    height: '50%',
  },
  highlight: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emphasis: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  commonText: {
    fontSize: 18,
  },
  linkText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
