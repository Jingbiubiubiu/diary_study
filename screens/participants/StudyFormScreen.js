import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import * as DATA from '../../data/dummy-questions';
import TitleName from '../../components/TitleName';
import MainTitle from '../../components/MainTitle';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import AnswerIcon from '../../components/AnswerIcon';
import SingleChoice from '../../components/SingleChoice';

const StudyFormScreen = (props) => {
  const questions = DATA.QUESTION1;

  const [dropdown, setDropdown] = useState('');
  const [dropdown1, setDropdown1] = useState('');

  const [visibility, setVisibility] = useState(
    // create an array which length equals to the data's length,
    // and every element in the array is false
    Array(questions.length).fill(false)
  );

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
      case 'audio':
        break;
      case 'video':
        break;
      case 'camera':
        break;
      case 'imageFormGallery':
        break;
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
      case 'multipleChoice':
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
                  {
                    label: itemData.item.option5,
                    value: itemData.item.option5,
                  },
                  {
                    label: itemData.item.option6,
                    value: itemData.item.option6,
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

  return (
    <View style={styles.screen}>
      <TitleName>Jing Wu</TitleName>
      <MainTitle>Personal Info</MainTitle>
      <FlatList
        data={questions}
        // listKey={(item) => item.questionId}
        keyExtractor={(item) => item.questionId}
        renderItem={(itemData) => (
          <View>
            <AnswerIcon
              index={itemData.index + 1}
              content={itemData.item.content}
              answerType={itemData.item.answerType}
              onSelect={() => updateVisibility(itemData.index)}
            />
            {createComponent(
              itemData.item.answerType,
              itemData.index,
              itemData
            )}
          </View>
        )}
      />
      <Text>Audio:{visibility.toString()}</Text>
      <View style={styles.buttonContainer}>
        <CommonButton>Submit</CommonButton>
      </View>
    </View>
  );
};

StudyFormScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Study Form',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },

  buttonContainer: {
    marginBottom: 20,
  },
});

export default StudyFormScreen;
