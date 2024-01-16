class UserPassedTestBadRequestException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400
    }
}


class UserPassedTestNotFoundException extends Error {
    constructor() {
        super("User-Passed Test Not Found");
        this.statusCode = 404
    }
}


module.exports = {
    UserPassedTestNotFoundException,
    UserPassedTestBadRequestException
}

