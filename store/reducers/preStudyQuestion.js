import * as DATA from '../../data/dummy-questions';
import {
  CREATE_PREQUESTION,
  CLEAR_PREQUESTION,
} from '../actions/preStudyQuestion';
import Question from '../../models/question';

const initialState = {
  // preStudyQuesitons: DATA.PreSTUDYQUESTIONS,
  preStudyQuesitons: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PREQUESTION:
      let questionNumber = state.preStudyQuesitons.length + 1;
      const newQuestion = new Question(
        questionNumber,
        action.questionData.content,
        action.questionData.answerType,
        action.questionData.option1,
        action.questionData.option2,
        action.questionData.option3,
        action.questionData.option4
      );
      // console.log(newQuestion);
      // console.log(state.preStudyQuesitons);
      return {
        ...state,
        preStudyQuesitons: state.preStudyQuesitons.concat(newQuestion),
      };
    case CLEAR_PREQUESTION:
      return {
        ...state,
        preStudyQuesitons: [],
      };
  }
  return state;
};
