export const CREATE_ANSWERPACKAGE = 'CREATE_ANSWERPACKAGE';

export const createAnswerPackage = (
  studyNumber,
  preStudyAnswers,
  answers,
  userName
) => {
  return {
    type: CREATE_ANSWERPACKAGE,
    answerData: {
      studyNumber,
      preStudyAnswers,
      answers,
      userName,
    },
  };
};
