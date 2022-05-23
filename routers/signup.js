const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { create } = require('../controllers/user');

router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(6).max(30).required()
    })
}), create);

module.exports = router;