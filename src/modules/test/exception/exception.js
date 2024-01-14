class TestNotFoundException extends Error{
    constructor() {
        super("Test Not Found");
        this.statusCode = 404
    }
}


class TestBadRequestException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400
    }
}


module.exports = {
    TestNotFoundException,
    TestBadRequestException
}