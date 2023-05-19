const express = require('express');
const router = express.Router();
const {
    validateLogin,
    validateOtp,
    validateForgotPassword,
    validateResetPassword
} = require('../validations/auth');

const {
    login,
    register,
    verifyOtp,
    forgotPassword,
    resetPassword,
    googleLogin,
} = require('../controllers/auth');

router.get('/', (req, res) => {
    res.json({ msg: 'Get yourself an identity 🪪' });
});

// @route   POST /auth/login
// @desc    Login user
// @access  Public
// @params  email, password
router.post(
    '/login',
    validateLogin,
    (req, res) => {
        login(req.body.email, req.body.password)
            .then(token => res.json({ msg: 'Login Successful', token }))
            .catch(err => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

// @route   POST /auth/register
// @desc    Register user and send OTP
// @access  Public
// @params  email, password
router.post(
    '/register',
    validateLogin,
    (req, res) => {
        register(req.body.email, req.body.password)
            .then(hash => res.json({ msg: `OTP sent to ${req.body.email}`, data: { hash } }))
            .catch(err => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

// @route   POST /auth/verify-otp
// @desc    Verify OTP for registration
// @access  Public
// @params  email, otp, hash
router.post(
    '/verify-otp',
    validateOtp,
    (req, res) => {
        verifyOtp(req.body.email, req.body.otp, req.body.hash)
            .then(token => res.json({ msg: 'Registration Successful', token }))
            .catch(err => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

// @route   POST /auth/forgot-password
// @desc    Send OTP for forgot password
// @access  Public
// @params  email
router.post(
    '/forgot-password',
    validateForgotPassword,
    (req, res) => {
        forgotPassword(req.body.email)
            .then(hash => res.json({ msg: `OTP sent to ${req.body.email}`, data: { hash } }))
            .catch(err => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

// @route   POST /auth/reset-password
// @desc    Reset password
// @access  Public
// @params  email, password, otp, hash
router.post(
    '/reset-password',
    validateResetPassword,
    (req, res) => {
        resetPassword(req.body.email, req.body.password, req.body.otp, req.body.hash)
            .then(token => res.json({ msg: 'Password Reset Successful', token }))
            .catch(err => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

// @route   POST /auth/goole
// @desc    Login/Register user using Google
// @access  Public
// @params  accessToken
router.post(
    '/google',
    (req, res) => {
        googleLogin(req.body.accessToken)
            .then(token => res.json({ msg: 'Login Successful', token }))
            .catch(err => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

module.exports = router;