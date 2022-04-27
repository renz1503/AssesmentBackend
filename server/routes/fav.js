const router = require('express').Router();
const isAuthenticated = require('../middleware/validator').isAuthenticated;
const { createFav, getFavs, getFav, getFavByUser, deleteFav } = require('../controllers/fav');

router.route('/favs').post(isAuthenticated, createFav);
router.route('/favs').get(isAuthenticated, getFavs);
router.route('/favs/:id').get(isAuthenticated, getFav);
router.route('/favs/user/:id').get(isAuthenticated, getFavByUser);
router.route('/favs/:id').delete(isAuthenticated, deleteFav);

module.exports = router;