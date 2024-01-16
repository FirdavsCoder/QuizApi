class UserPassedTestsEntity {
    constructor(data) {
        this.user_id = data.user_id
        this.test_id = data.test_id
        this.total_questions = data.total_questions
        this.passed_questions = data.passed_questions
    }
}

module.exports = {
    UserPassedTestsEntity
}

