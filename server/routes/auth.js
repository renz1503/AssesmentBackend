const router = require('express').Router();
const { login } = require('../controllers/user');

router.route('/local/login').post(login);

module.exports = router;