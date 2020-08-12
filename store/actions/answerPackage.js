export const CREATE_ANSWERPACKAGE = 'CREATE_ANSWERPACKAGE';

export const createAnswerPackage = (
  studyId,
  preStudyAnswers,
  answers
  // submitTime
) => {
  return {
    type: CREATE_ANSWERPACKAGE,
    answerData: {
      studyId,
      preStudyAnswers,
      answers,
    },
  };
};
