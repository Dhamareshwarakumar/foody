const express = require('express');
const router = express.Router();
const passport = require('passport');

const { allowSuperAdminOnly } = require('../validations/auth');
const { getPendingRestaurants } = require('../controllers/superAdmin');

router.get(
    '/pending-restaurants',
    passport.authenticate('jwt', { session: false }),
    allowSuperAdminOnly,
    (req, res) => {
        getPendingRestaurants()
            .then(restaurants => res.json({ msg: 'Pending Restaurants', data: restaurants }))
            .catch(err => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
)


module.exports = router;