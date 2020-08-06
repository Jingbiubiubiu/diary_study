import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';

import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import * as Icons from '../../components/Icons';
import CommonButton from '../../components/CommonButton';
import * as DATA from '../../data/dummy-questions';
import AnswerIcon from '../../components/AnswerIcon';

const screenWidth = Dimensions.get('window').height;

const SampleFormScreen = (props) => {
  const consentForm1 = DATA.CONSENTFORM1[0];
  const [agree, setAgree] = useState(false);

  const [visibility, setVisibility] = useState(
    // create an array which length equals to the data's length,
    // and every element in the array is false
    Array(consentForm1.preQuetions.length).fill(false)
  );

  console.log(consentForm1.preQuetions.length);
  console.log(consentForm1);

  const [answer, setAnswer] = useState([{}, {}, {}, {}, {}, {}]);

  const updateVisibility = (index) => {
    const previous = visibility[index];
    if (previous) {
      let markers = [...visibility];
      markers[index] = false;
      setVisibility(markers);
    } else {
      let markers = [...visibility];
      markers[index] = true;
      setVisibility(markers);
    }
  };

  const createComponent = (answerType, index, itemData) => {
    switch (answerType) {
      case 'typeAnswer':
        break;
      case 'singleChoice':
        return (
          visibility[index] && (
            <View>
              <SingleChoice
                questionOptions={[
                  {
                    label: itemData.item.option1,
                    value: itemData.item.option1,
                  },
                  {
                    label: itemData.item.option2,
                    value: itemData.item.option2,
                  },
                  {
                    label: itemData.item.option3,
                    value: itemData.item.option3,
                  },
                  {
                    label: itemData.item.option4,
                    value: itemData.item.option4,
                  },
                ]}
                defaultValue={dropdown}
                placeholder='Select the answer'
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                onChangeItem={(item) => setDropdown(item.value)}
              />
            </View>
          )
        );
        break;
    }
  };

  const agreeHandler = () => {
    agree ? setAgree(false) : setAgree(true);
  };

  return (
    <View style={styles.screen}>
      <TitleName style={styles.titleName}>Jing Wu</TitleName>
      <MainTitle style={styles.mainName}>Sample study</MainTitle>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle} numberOfLines={2}>
          Consent form, description and pre-study questions
        </Text>
      </View>
      {/* <ScrollView contentContainerStyle={styles.scrollView}> */}
      <View style={styles.description}>
        <Text>{consentForm1.description}</Text>
      </View>
      <FlatList
        style={{ borderColor: 'red', borderWidth: 1, width: '85%' }}
        data={consentForm1.preQuetions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => {
          <View>
            <Text>hi</Text>
            <AnswerIcon
              index={itemData.index + 1}
              content={itemData.item.question}
              answerType={itemData.item.answerType}
              onSelect={() => updateVisibility(itemData.index)}
            />
            {createComponent(
              itemData.item.answerType,
              itemData.index,
              itemData
            )}
          </View>;
        }}
      />

      <View style={styles.agreementContainer}>
        <Icons.CommonCheckbox
          value={agree}
          onChangeText={agreeHandler}
          onPress={agreeHandler}
        >
          {consentForm1.agreement}
        </Icons.CommonCheckbox>
      </View>
      {/* </ScrollView> */}
      <Text>Audio:{visibility.toString()}</Text>
      <View style={styles.buttonContainer}>
        <CommonButton onPress={() => props.navigation.navigate('StudyForm')}>
          Submit
        </CommonButton>
      </View>
    </View>
  );
};

SampleFormScreen.navigationOptions = (davData) => {
  return {
    headerTitle: 'Sample Study',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    // width: screenWidth,
  },
  titleName: {
    marginTop: 10,
  },
  subtitleContainer: {
    width: '70%',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  // scrollView: {
  //   width: '95%',
  //   alignItems: 'center',
  //   borderColor: 'red',
  //   borderWidth: 1,
  // },
  description: {
    marginTop: 8,
    width: '85%',
    // alignItems: 'center',
    borderColor: 'green',
    borderWidth: 1,
  },
  input: {
    marginVertical: 5,
  },
  inputBox: {
    width: '100%',
  },
  agreementContainer: {
    width: '83%',

    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
  },
  buttonContainer: {
    marginBottom: 30,
  },
});

export default SampleFormScreen;
