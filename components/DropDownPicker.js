import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';

import DropDownPicker from 'react-native-dropdown-picker';

// const screenWidth = Dimensions.get('window').width;

export const DisplayOptionsDropdownPicker = (props) => {
  return (
    <View style={styles.container}>
      <DropDownPicker
        items={props.items}
        defaultValue={props.defaultValue}
        containerStyle={styles.dropdownMenu}
        placeholder={props.placeholder}
        itemStyle={props.itemStyle}
        labelStyle={styles.dropdownLabel}
        onChangeItem={props.onChangeItem}
        dropDownStyle={styles.dropDownStyle}
        style={{ backgroundColor: '#ffffff' }}
      />

      <FlatList
        data={[
          { title: '1. Das Leben ist nicht fair' },
          { title: '2. Wir werden trotzdem sterben' },
          { title: '3. Aber lass uns so leben, wie wir wollen' },
          { title: '4. Das ist besser' },
        ]}
        renderItem={(item, index) => (
          <Text style={{ color: 'transparent' }}>{item.item.title}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{
          marginTop: 40,
        }}
        contentContainerStyle={{
          borderRadius: 5,
          padding: 15,
          backgroundColor: 'red',
        }}
      />
    </View>
  );
};

export const ChooseTypeDropdownPicker = (props) => {
  return (
    <View style={styles.dropdownContainer2}>
      <DropDownPicker
        items={props.items}
        defaultValue={props.defaultValue}
        containerStyle={styles.dropdownMenu2}
        placeholder={props.placeholder}
        itemStyle={props.itemStyle}
        labelStyle={styles.dropdownLabel2}
        onChangeItem={props.onChangeItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 15,
    borderColor: 'red',
    borderWidth: 1,
  },
  dropdownMenu: {
    height: 50,
    width: Dimensions.get('window').width * 0.85,
    // zIndex: 2000000,
  },
  dropdownLabel: {
    fontSize: 18,
  },
  dropDownStyle: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    height: Dimensions.get('window').height * 0.3,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownContainer2: {
    marginVertical: 15,
  },
  dropdownMenu2: {
    height: 50,
    width: Dimensions.get('window').width * 0.85,
  },
  dropdownLabel2: {
    fontSize: 18,
  },
});

// export default AnsDropdownPicker;
