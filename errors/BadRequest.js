class BadRequest extends Error {
    constructor(message = 'Bad Request') {
        super(message);
        this.statusCode = 400;
    }
}

module.exports = BadRequest;