import * as DATA from '../../data/dummy-questions';
import { CREATE_PREQUESTION } from '../actions/preStudyQuestion';
import PreStudyQuestion from '../../models/preStudyQuestion';

const initialState = {
  // preStudyQuesitons: DATA.PreSTUDYQUESTIONS,
  preStudyQuesitons: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PREQUESTION:
      const newQuestion = new PreStudyQuestion(
        new Date().toString(),
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
  }
  return state;
};
