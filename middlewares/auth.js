const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) return next(new Unauthorized());
    try {
        req.user = jwt.verify(authorization.replace('Bearer ', ''), process.env.JWT_SECRET);
    } catch (error) { return next(new Unauthorized()); }
    next();
};

module.exports = auth;