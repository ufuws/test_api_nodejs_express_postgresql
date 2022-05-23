const InternalServerError = require('../errors/InternalServerError');

const errorHandler = (err, req, res, next) => {
    if (!err.statusCode) err = new InternalServerError();
    const { statusCode, message } = err;
    res.status(statusCode).send({ message });
    next();
}

module.exports = errorHandler;