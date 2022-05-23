const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/user');

router.post('/', celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(6).max(30).required()
    })
}), login);

module.exports = router;