const express = require('express');
const router = express.Router();
const passport = require('passport');

const { registerRestaurant } = require('../controllers/restaurant');

const { allowNormalUserOnly } = require('../validations/auth');
const { validateRegisterRestaurant } = require('../validations/restaurant');

// @route   POST /restaurant
// @desc    Register restaurant
// @access  Private [Normal User]
// @params  userId, name, lat, lng, address, timings, cuisine
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validateRegisterRestaurant,
    allowNormalUserOnly,
    (req, res) => {
        registerRestaurant(
            req.body.userId,
            req.body.name,
            req.body.lat,
            req.body.lng,
            req.body.address,
            req.body?.timings,
            req.body?.cuisine
        )
            .then(restaurant => res.json({ msg: 'Restaurant Registered', data: restaurant }))
            .catch(err => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

module.exports = router;