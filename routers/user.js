const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { aboutMe, update } = require('../controllers/user');

router.get('/me', celebrate({
    headers: Joi.object().keys({
        authorization: Joi.string()
    })
}), aboutMe)
router.post('/me', celebrate({
    headers: Joi.object().keys({
        authorization: Joi.string()
    }),
    body: Joi.object().keys({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(6).max(30).required(),
        avatar: Joi.binary()
    })
}), update);

module.exports = router;