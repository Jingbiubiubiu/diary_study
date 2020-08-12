import { CREATE_PRESTUDYANSWERS } from '../actions/preStudyAnswers';

const initialState = {
  preStudyAnswers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRESTUDYANSWERS:
      const newAnswers = action.preStudyAnswersData;
      // console.log(action);
      // console.log(newAnswers);
      // console.log(state.questions);
      return {
        ...state,
        preStudyAnswers: state.preStudyAnswers.concat(newAnswers),
      };
  }
  return state;
};
