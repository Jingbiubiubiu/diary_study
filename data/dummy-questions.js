import Question from '../models/question';
import Study from '../models/study';

export const STUDY1 = [
  new Study('s1', 'Personal Info', true, 'ABC123', 'ABC123', null, QUESTION1),
  new Study('s2', 'Favorite color', false, '123ABC', '123ABC', null, QUESTION1),
];

export const QUESTION1 = [
  new Question('s1q1', 'How are you?', 'audio', null, null, null, null),
  new Question('s1q2', 'Do you like red?', 'video', null, null, null, null),
  new Question('s1q3', 'Do you like blue?', 'camera', null, null, null, null),
  new Question(
    's1q4',
    'Do you like blue?',
    'imageFormGallery',
    null,
    null,
    null,
    null
  ),
  new Question(
    's1q5',
    'Which one you prefer? green or gray or black?',
    'singleChoice',
    'green',
    'gray',
    'black',
    'none'
  ),
];
