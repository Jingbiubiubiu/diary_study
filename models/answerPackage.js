class AnswerPackage {
  constructor(studyNumber, preStudyQuestions, answers, userName) {
    this.studyNumber = studyNumber;
    this.preAnswers = preStudyQuestions;
    this.answers = answers;
    this.participantEmail = userName;
  }
}

export default AnswerPackage;
