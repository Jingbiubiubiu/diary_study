export const CREATE_STUDY = 'CREATE_STUDY';

export const createStudy = (
  // studyId,
  studyName,
  // studyNumber,
  // studyPassword,
  consentForm,
  questions
  // establishTime
) => {
  return {
    type: CREATE_STUDY,
    studyData: {
      studyName,
      // studyNumber,
      // studyPassword,
      consentForm,
      questions,
      // establishTime,
    },
  };
};
