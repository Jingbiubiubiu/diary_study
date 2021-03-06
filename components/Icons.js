import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';

import Colors from '../constants/Colors';

export const AudioIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View>
        <Feather name='mic' color='black' size={32} />
      </View>
    </TouchableOpacity>
  );
};

export const CameraIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View>
        <Feather name='camera' color='black' size={32} />
      </View>
    </TouchableOpacity>
  );
};

export const VideoIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View>
        <Feather name='video' color='black' size={32} />
      </View>
    </TouchableOpacity>
  );
};

export const TextIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.checkboxTextContainer}>
        <Text
          style={{ ...styles.checkboxText, ...props.textStyle }}
          numberOfLines={2}
        >
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const CommonCheckbox = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.checkboxContainer, ...props.containerStyle }}>
        <CheckBox
          id={props.id}
          value={props.value}
          onValueChange={props.onValueChange}
          tintColors={{ true: Colors.primary }}
        />
        <Text>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const AudioCheckbox = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          id={props.id}
          value={props.value}
          onValueChange={props.onValueChange}
          tintColors={{ true: Colors.primary }}
        />
        <AudioIcon />
      </View>
    </TouchableOpacity>
  );
};

export const CameraCheckbox = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          id={props.id}
          value={props.value}
          onValueChange={props.onValueChange}
          tintColors={{ true: Colors.primary }}
        />
        <CameraIcon />
      </View>
    </TouchableOpacity>
  );
};

export const VideoCheckbox = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          id={props.id}
          value={props.value}
          onValueChange={props.onValueChange}
          tintColors={{ true: Colors.primary }}
        />
        <VideoIcon />
      </View>
    </TouchableOpacity>
  );
};

export const ImagefromGalleryCheckbox = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.checkboxWithTextContainer, ...props.style }}>
        <CheckBox
          value={props.value}
          onValueChange={props.onValueChange}
          tintColors={{ true: Colors.primary }}
        />
        <TextIcon textStyle={props.textStyle}>Image from Gallery</TextIcon>
      </View>
    </TouchableOpacity>
  );
};

export const TypeAnswerCheckbox = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.checkboxWithTextContainer, ...props.style }}>
        <CheckBox
          value={props.value}
          onValueChange={props.onValueChange}
          tintColors={{ true: Colors.primary }}
        />
        <TextIcon textStyle={props.textStyle}>Type Answer</TextIcon>
      </View>
    </TouchableOpacity>
  );
};

export const SingleChoiceCheckbox = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.checkboxWithTextContainer, ...props.style }}>
        <CheckBox
          value={props.value}
          onValueChange={props.onValueChange}
          tintColors={{ true: Colors.primary }}
        />
        <TextIcon textStyle={props.textStyle}>Single Choice</TextIcon>
      </View>
    </TouchableOpacity>
  );
};

export const MultipleChoiceCheckbox = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.checkboxWithTextContainer, ...props.style }}>
        <CheckBox
          value={props.value}
          onValueChange={props.onValueChange}
          tintColors={{ true: Colors.primary }}
        />
        <TextIcon textStyle={props.textStyle}>Multiple Choice</TextIcon>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxWithTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTextContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  checkboxText: {
    fontSize: 14,
    fontWeight: 'bold',
    width: Dimensions.get('window').width / 5,
    textAlign: 'center',
    color: 'white',
  },
});
