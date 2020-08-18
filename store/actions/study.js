export const CREATE_STUDY = 'CREATE_STUDY';
export const END_STUDY = 'END_STUDY';
export const INITIALIZE_RESEARCHER_STUDIES = 'INITIALIZE_RESEARCHER_STUDIES'
export const INITIALIZE_PARTICIPANT_STUDIES = 'INITIALIZE_PARTICIPANT_STUDIES'

export const createStudy = (
  userName,
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
      userName,
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

export const initialize_researcher_studies = (studies) => {
  return {
    type: INITIALIZE_RESEARCHER_STUDIES,
    study_list: studies
  };
};

export const initialize_participant_studies = (studies) => {
  return {
    type: INITIALIZE_PARTICIPANT_STUDIES,
    study_list: studies
  };
};
