class Unauthorized extends Error {
    constructor(message = 'Unauthorized') {
        super(message);
        this.statusCode = 401;
    }
}

module.exports = Unauthorized;