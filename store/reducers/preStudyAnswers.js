import { CREATE_PRESTUDYANSWERS } from '../actions/preStudyAnswers';

const initialState = {
  preStudyAnswers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRESTUDYANSWERS:
      const newAnswers = action.preStudyAnswersData;
      return {
        ...state,
        preStudyAnswers: newAnswers,
      };
  }
  return state;
};
