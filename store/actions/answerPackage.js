export const CREATE_ANSWERPACKAGE = 'CREATE_QUESTION';

export const createQuestion = (
  studyId,
  preStudyAnswers,
  answers
  // submitTime
) => {
  return {
    type: CREATE_QUESTION,
    answerData: {
      studyId,
      preStudyAnswers,
      answers,
    },
  };
};
