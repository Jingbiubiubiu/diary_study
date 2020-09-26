import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';

const RoleScreen = (props) => {
  const userName = useSelector((state) => state.userName.userName);

  return (
    <View style={styles.screen}>
      <View style={styles.welcome}>
        <Text style={{ color: Colors.primary }}>
          Welcome <Text style={styles.highlight}>{userName}</Text>
        </Text>
      </View>

      <View style={styles.title}>
        <Text style={styles.titleText}>Choose the Role</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title='Researcher'
            color={Colors.primary}
            onPress={() => props.navigation.navigate('Res')}
          />
        </View>

        <View style={styles.buttonContainer}></View>

        <Button
          title='Participant'
          color={Colors.primary}
          onPress={() => props.navigation.navigate('Par')}
        />
      </View>
    </View>
  );
};

RoleScreen.navigationOptions = () => {
  return {
    headerTitle: 'Role',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcome: {
    marginTop: 150,
  },
  highlight: {
    fontWeight: 'bold',
  },
  title: {
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 25,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default RoleScreen;
