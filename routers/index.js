const router = require('express').Router();
const signup = require('./signup');
const login = require('./login');
const user = require('./user');
const auth = require('../middlewares/auth');

router.use('/signup', signup);
router.use('/login', login);

router.use(auth);

router.use('/user', user);

module.exports = router;