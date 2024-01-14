class UserAlreadyExistException extends Error {
    constructor() {
        super("This login already exist")
        this.statusCode = 400
    }
}


class UserBadRequestException extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 400
    }
}


class UserNotFoundException extends Error {
    constructor() {
        super("User not found by login")
        this.statusCode = 404
    }
}


class UserPasswordWrongException extends Error {
    constructor() {
        super("Wrong Password")
        this.statusCode = 400
    }
}


class UserNotFoundByIdException extends Error {
    constructor() {
        super("User Not Found By Id")
        this.statusCode = 404
    }
}


class UserNotAllowedException extends Error {
    constructor() {
        super("Not Allowed")
        this.statusCode = 400
    }
}


class LoginOrPasswordWrongException extends Error {
    constructor() {
        super("Login or Password Wrong")
        this.statusCode = 400
    }
}


module.exports = {
    UserAlreadyExistException,
    UserBadRequestException,
    UserNotFoundException,
    UserPasswordWrongException,
    UserNotFoundByIdException,
    UserNotAllowedException,
    LoginOrPasswordWrongException
}