class AnswerPackage {
  constructor(studyNumber, preStudyQuestions, answers, userName) {
    this.studyNumber = studyNumber;
    // preStudyAnswers is a object，made of answerItems
    this.preAnswers = preStudyQuestions;
    // answers is a object，made of answerItems
    this.answers = answers;
    this.participantEmail = userName;
  }
}

export default AnswerPackage;
