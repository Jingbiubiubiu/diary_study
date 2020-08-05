import Question from '../models/question';
import Study from '../models/study';
import ConsentForm from '../models/consentForm';

export const CONSENTFORM1 = [
  new ConsentForm(
    'Description of the study and of consent etc. Lorem ipsum dolor sitamet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo',
    QUESTION1,
    'asdfasohfoaisgoasuoawjsfoajoaiugdoufnavduo afoasfianodfuoafaosfiaog'
  ),
];

export const STUDY1 = [
  new Study('s1', 'Personal Info', true, 'ABC123', 'ABC123', null, QUESTION1),
  new Study('s2', 'Favorite color', false, '123ABC', '123ABC', null, QUESTION1),
];

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
