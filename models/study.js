class Study {
  constructor(
    // creatorId,
    creatorEmail,
    studyName,
    studyNumber,
    studyPassword,
    consentForm,
    questions,
    establishTime,
    isOpen,
    endTime
  ) {
    this.creatorEmail = creatorEmail;
    this.studyName = studyName;
    this.studyNumber = studyNumber;
    this.studyPassword = studyPassword;
    this.consentForm = consentForm;
    this.questions = questions;
    this.establishTime = establishTime;
    this.isOpen = isOpen;
    this.endTime = endTime;
  }
}

export default Study;
