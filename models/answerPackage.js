class AnswerPackage {
  constructor(studyId, answers, preStudyQuestions, submitTime) {
    this.studyId = studyId;
    // preStudyAnswers is a object，made of answerItems
    this.preStudyQuestions = preStudyQuestions;
    // answers is a object，made of answerItems
    this.answers = answers;
    this.submitTime = submitTime;
  }
}

export default AnswerPackage;
