export const CREATE_PRESTUDYANSWERS = 'CREATE_PRESTUDYANSWERS';

export const createPreStudyAnswers = (preStudyAnswers) => {
  return {
    type: CREATE_PRESTUDYANSWERS,
    preStudyAnswersData: preStudyAnswers,
  };
};
