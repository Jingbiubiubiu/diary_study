export const CREATE_STUDY = 'CREATE_STUDY';
export const END_STUDY = 'END_STUDY';
export const INITIALIZE_STUDY = 'INITIALIZE_STUDY'

export const createStudy = (
  // studyId,
  studyName,
  studyNumber,
  studyPassword,
  consentForm,
  questions,
  establishTime
) => {
  return {
    type: CREATE_STUDY,
    studyData: {
      studyName,
      studyNumber,
      studyPassword,
      consentForm,
      questions,
      establishTime,
    },
  };
};

export const endStudy = (id, endTime) => {
  return {
    type: END_STUDY,
    sId: id,
    eTime: endTime,
  };
};

export const initialize_study = (studies) => {
  return {
    type: INITIALIZE_STUDY,
    study_list: studies
  };
};
