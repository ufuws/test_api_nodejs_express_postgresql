const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');
const InternalServerError = require('../errors/InternalServerError');

const create = (req, res, next) => {
    const { name, email, password } = req.body;
    bcryptjs.hash(password, 10)
        .then((hash) => {
            users.create({ name, email, password: hash })
                .then((response) => res.send(response))
                .catch((err) => next(new BadRequest(err.message)));
        }).catch((err) => next(new InternalServerError(err.message)));
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    users.find({ email }, ['_id', 'email', 'password'])
        .then((user) => {
            bcryptjs.compare(password, user.password)
                .then((matched) => {
                    if (matched) {
                        const { _id, email } = user;
                        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
                        res.send({ token });
                    } else next(new Unauthorized())
                }).catch(() => next(new InternalServerError()));
        }).catch(() => next(new Unauthorized()));
};

const aboutMe = (req, res, next) => {
    users.find({ _id: req.user._id }, ['name', 'email', 'avatar'])
        .then((response) => res.send(response))
        .catch(next);
};

const update = (req, res, next) => {
    users.update(req.user._id, req.body)
        .then((response) => res.send(response))
        .catch(next);
};

module.exports = {
    create,
    login,
    aboutMe,
    update
};