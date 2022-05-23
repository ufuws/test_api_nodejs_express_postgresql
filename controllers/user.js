const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');
const InternalServerError = require('../errors/InternalServerError');
const NotFound = require('../errors/NotFound');

const create = (req, res, next) => {
    const { name, email, password } = req.body;
    bcryptjs.hash(password, 10)
        .then((hash) => {
            users.create({ name, email, password: hash })
                .then((response) => res.send(response))
                .catch((err) => next(new BadRequest(err.message)));
        }).catch((err) => next(new InternalServerError(err.message)));
};

const remove = (req, res, next) => {
    users.remove(req.body.id)
        .then((response) => { res.send(response) })
        .catch(next);
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    users.find({ email }, ['email', 'password'])
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

const about = (req, res, next) => {
    users.find({ _id: req.params.id }, ['name', 'avatar'])
        .then((response) => res.send(response))
        .catch((err) => next(new NotFound(err.message)));
};

const aboutMe = (req, res, next) => {
    users.find({ _id: req.body.id }, ['name', 'email', 'avatar'])
        .then((response) => res.send(response))
        .catch(next);
};

const update = (req, res, next) => {
    const { id, ...data } = req.body;
    users.update(id, data)
        .then((response) => res.send(response))
        .catch(next);
};

module.exports = {
    create,
    remove,
    login,
    about,
    aboutMe,
    update
};