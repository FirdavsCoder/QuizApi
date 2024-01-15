class VariantBadRequestException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400
    }
}


class VariantNotFoundException extends Error {
    constructor() {
        super("Variant Not Found");
        this.statusCode = 404
    }
}

module.exports = {
    VariantBadRequestException,
    VariantNotFoundException
}