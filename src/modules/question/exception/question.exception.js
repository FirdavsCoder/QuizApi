class QuestionBadRequestException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400
    }
}

class QuestionNotFound extends Error {
    constructor() {
        super("Question Not Found!");
        this.statusCode = 404
    }
}


module.exports = {
    QuestionBadRequestException,
    QuestionNotFound
}

