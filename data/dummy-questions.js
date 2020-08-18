import Question from '../models/question';
import Study from '../models/study';
import ConsentForm from '../models/consentForm';
import PreStudyQuestion from '../models/preStudyQuestion';

export const PreSTUDYQUESTIONS = [
  new Question(
    '1',
    'How old are you?',
    'typeAnswer',
    null,
    null,
    null,
    null
  ),
  new Question(
    '2',
    'which is your favorite color?',
    'singleChoice',
    'red',
    'yellow',
    'green',
    'blue'
  ),
  new Question(
    '3',
    'which is your favorite color?',
    'singleChoice',
    'pink',
    'yellow',
    'green',
    'blue'
  ),
  new Question(
    '4',
    'which is your favorite color?',
    'singleChoice',
    'pink',
    'yellow',
    'green',
    'blue'
  ),
];

export const CONSENTFORM1 = new ConsentForm(
  'Description of the study and of consent etc. Lorem ipsum dolor sitamet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo',
  PreSTUDYQUESTIONS,
  'asdfasohfoaisgoasuoawjsfoajoaiugdoufnavduo afoasfianodfuoafaosfiaog'
);

export const QUESTION1 = [
  new Question(
    's1q5',
    'Which one you prefer? green or gray or black?',
    'singleChoice',
    'green',
    'gray',
    'black',
    'red',
    null,
    null
  ),
  new Question(
    's1q6',
    'Which one you prefer?',
    'multipleChoice',
    'green',
    'gray',
    'black',
    'red',
    'yellow',
    'pink'
  ),
  new Question(
    's1q7',
    'How old are you?',
    'typeAnswer',
    null,
    null,
    null,
    null,
    null,
    null
  ),
  new Question(
    's1q1',
    'How are you?',
    'audio',
    null,
    null,
    null,
    null,
    null,
    null
  ),
  new Question(
    's1q2',
    'Do you like red?',
    'video',
    null,
    null,
    null,
    null,
    null,
    null
  ),
  new Question(
    's1q3',
    'Do you like blue?',
    'camera',
    null,
    null,
    null,
    null,
    null,
    null
  ),
  new Question(
    's1q4',
    'Do you like blue?',
    'imageFormGallery',
    null,
    null,
    null,
    null,
    null,
    null
  ),
];

export const STUDY1 = [
  new Study(
    's1',
    'Personal Info',
    '123qwe',
    '123qwe',
    CONSENTFORM1,
    QUESTION1,
    null,
    true,
    null
  ),
  new Study(
    's2',
    'Favorite color',
    'qwe123',
    'qwe123',
    CONSENTFORM1,
    QUESTION1,
    null,
    false,
    null
  ),
];
