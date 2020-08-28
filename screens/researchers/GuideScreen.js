import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import MainTitle from '../../components/MainTitle';
import Colors from '../../constants/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const GuideScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <MainTitle>Guite to get answers</MainTitle>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.commonTextContainer}>
              <Text>
                When you end a study, there will be a popping up window to tell
                you a link (the purper one) to find all anwers, like the picture
                show below.
              </Text>
            </View>

            <Image
              style={styles.image}
              source={require('../../assets/popupWindow.png')}
            />

            <View style={styles.commonTextContainer}>
              <Text>Please follow the steps:</Text>
              <Text style={{ fontSize: 5 }}></Text>
              <Text>1. Record that link</Text>
              <Text style={{ fontSize: 5 }}></Text>

              <Text>
                2. Open your browser and input that link, you will say all
                answers in JSON format.
              </Text>
              <Text style={{ fontSize: 5 }}></Text>

              <Text>
                * If you think this raw format JSON is difficult for you to
                understand, you can copy all the JSON, and open
                https://jsonformatter.curiousconcept.com/, and then paste. Then
                you will have a clear view.
              </Text>
              <Text style={{ fontSize: 5 }}></Text>

              <Text>
                3. If your set the answer type is ‘type answer’, ‘single choice’
                or ‘multiple choice’("answerType": "Type", "Single", "Multiple"
                in JSON), you can simply check all the answers from JSON, like
                the picture shown below (using 'jsonformatter')
              </Text>
              <Text style={{ fontSize: 5 }}></Text>
            </View>

            <Image
              style={styles.image}
              source={require('../../assets/simpleAnswers.png')}
            />

            <View style={styles.commonTextContainer}>
              <Text style={{ fontSize: 5 }}></Text>

              <Text>
                4. If you set your answer type is ‘take photo’, ‘image from
                gallery’, ’audio’ or ‘take video’, you will see all the answers’
                file name in the JSON (like the picture below), then you need to
                build a link for each file to download them yourself.
              </Text>
              <Text style={{ fontSize: 5 }}></Text>
            </View>

            <Image
              style={styles.image}
              source={require('../../assets/fileNameAnswers.png')}
            />

            <View style={styles.commonTextContainer}>
              <Text style={{ fontSize: 5 }}></Text>

              <Text>
                4.1 Get the <Text style={styles.emphasis}>basic link</Text> from
                the link in the popping up window: link before the ‘/link’,
              </Text>
              <Text>e.g: https://0a9cf7ef32e6.ngrok.io</Text>
              <Text style={{ fontSize: 5 }}></Text>

              <Text>
                4.2 To get photos from answer types ‘take a photo’("answerType":
                "Photo" in JSON) and ‘select a photo from gallery'("answerType":
                "Gallary" in JSON) : the link should be:
              </Text>
              <Text style={styles.emphasis}>
                Basic link/download/image/file name
              </Text>
              <Text>
                e.g:
                https://0a9cf7ef32e6.ngrok.io/download/image/6a209de8-232d-4630-917c-65cca1921ded.png
              </Text>
              <Text style={{ fontSize: 5 }}></Text>

              <Text>
                4.3 To get audio files from answer types ‘Audio’ ("answerType":
                "Audio" in JSON), the link should be:
              </Text>
              <Text style={styles.emphasis}>
                Basic link/download/audio/file name
              </Text>
              <Text>
                e.g:
                https://0a9cf7ef32e6.ngrok.io/download/audio/521ee54b-1a1c-42fc-b6e7-124e42b7c23c.m4a
              </Text>
              <Text style={{ fontSize: 5 }}></Text>

              <Text>
                4.4 To get videos from answer types ‘Video’("answerType":
                "Video" in JSON) , the link should be:
              </Text>
              <Text style={styles.emphasis}>
                Basic link/download/video/file name
              </Text>
              <Text>
                e.g:
                https://0a9cf7ef32e6.ngrok.io/download/video/a0d52d3c-79b7-4601-a307-e2fcb85da5a6.mp4
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 10,
    width: screenWidth * 0.85,
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 5,
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    width: screenWidth * 0.85,
  },
  commonTextContainer: {
    width: '100%',
  },
  image: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.3,
    marginVertical: 5,
  },
  emphasis: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default GuideScreen;
