class Study {
  constructor(
    studyId,
    studyName,
    isOpen,
    studyNumber,
    studyPassword,
    endTime,
    questions
  ) {
    this.studyId = studyId;
    this.studyName = studyName;
    this.isOpen = isOpen;
    this.studyNumber = studyNumber;
    this.studyPassword = studyPassword;
    this.endTime = endTime;
    // questions是一个object，里面都是由每个question组成
    this.questions = questions;
  }
}

export default Study;
