class AnswerPackage {
  constructor(studyId, answers, submitTime) {
    this.studyId = studyId;
    // answers is a object，made of answerItems
    this.answers = answers;
    this.submitTime = submitTime;
    // userAge need to be stored and passed?？
    // this.age = age;
  }
}

export default AnswerPackage;
