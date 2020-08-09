class Study {
  constructor(
    // creatorId,
    studyId,
    studyName,
    studyNumber,
    studyPassword,
    consentForm,
    questions,
    establishTime,
    isOpen,
    endTime
  ) {
    // this.creatorId = creatorId;
    this.studyId = studyId;
    this.studyName = studyName;
    this.studyNumber = studyNumber;
    this.studyPassword = studyPassword;
    // consentForm是一个object
    this.consentForm = consentForm;
    // questions是一个object，里面都是由每个question组成
    this.questions = questions;
    this.establishTime = establishTime;
    this.isOpen = isOpen;
    this.endTime = endTime;
  }
}

export default Study;
