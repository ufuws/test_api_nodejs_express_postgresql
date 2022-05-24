const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { aboutMe, update } = require('../controllers/user');

router.get('/me', celebrate({
    headers: Joi.object().keys({
        authorization: Joi.string().required()
    }).unknown()
}), aboutMe);

router.post('/me', celebrate({
    headers: Joi.object().keys({
        authorization: Joi.string().required()
    }).unknown(),
    body: Joi.object().keys({
        name: Joi.string().min(2).max(50),
        email: Joi.string().email().min(5).max(50),
        password: Joi.string().min(6).max(30),
        avatar: Joi.binary()
    })
}), update);

module.exports = router;