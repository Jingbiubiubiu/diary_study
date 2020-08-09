import { CREATE_QUESTION } from '../actions/question';
import Question from '../../models/question';

const initialState = {
  // questions: DATA.QUESTION1,
  questions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUESTION:
      const newQuestion = new Question(
        new Date().toString(),
        action.questionData.content,
        action.questionData.answerType,
        action.questionData.option1,
        action.questionData.option2,
        action.questionData.option3,
        action.questionData.option4,
        action.questionData.option5,
        action.questionData.option6
      );
      // console.log(newQuestion);
      // console.log(state.questions);
      return {
        ...state,
        questions: state.questions.concat(newQuestion),
      };
  }
  return state;
};
