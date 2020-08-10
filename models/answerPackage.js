class AnswerPackage {
  constructor(studyId, answers, preStudyQuestions, submitTime, participantId) {
    this.studyId = studyId;
    // preStudyAnswers is a object，made of answerItems
    this.preStudyQuestions = preStudyQuestions;
    // answers is a object，made of answerItems
    this.answers = answers;
    this.submitTime = submitTime;
    this.participantId = participantId;
  }
}

export default AnswerPackage;
