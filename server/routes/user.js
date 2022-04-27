const router = require('express').Router();
const { createUser, getUsers, getUser } = require('../controllers/user');

router.route('/createUser').post(createUser);
router.route('/getUsers').get(getUsers);
router.route('/getUser/:id').get(getUser);

module.exports = router;