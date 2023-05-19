const { isEmpty } = require('../utils');
const { EMAIL_REGEX } = require('../utils/constants');

const validateLogin = (req, res, next) => {
    const errors = {};

    if (isEmpty(req.body.email)) {
        errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors.email = 'Email is invalid';
    }

    if (isEmpty(req.body.password)) {
        errors.password = 'Password is required';
    } else if (req.body.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }

    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
}

const validateOtp = (req, res, next) => {
    const errors = {};

    if (isEmpty(req.body.email)) {
        errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors.email = 'Email is invalid';
    }

    if (isEmpty(req.body.otp)) {
        errors.otp = 'OTP is required';
    }

    if (isEmpty(req.body.hash)) {
        errors.hash = 'OTP Hash is required';
    }

    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
}

const validateForgotPassword = (req, res, next) => {
    const errors = {};

    if (isEmpty(req.body.email)) {
        errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors.email = 'Email is invalid';
    }

    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
}

const validateResetPassword = (req, res, next) => {
    const errors = {};

    if (isEmpty(req.body.email)) {
        errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors.email = 'Email is invalid';
    }

    if (isEmpty(req.body.password)) {
        errors.password = 'Password is required';
    } else if (req.body.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }

    if (isEmpty(req.body.otp)) {
        errors.otp = 'OTP is required';
    }

    if (isEmpty(req.body.hash)) {
        errors.hash = 'OTP Hash is required';
    }

    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
}

const allowNormalUserOnly = (req, res, next) => {
    if (req.user.role !== 0) {
        return res.status(403).json({ msg: 'Forbidden' });
    }

    next();
}

const allowSuperAdminOnly = (req, res, next) => {
    if (req.user.role !== 4) {
        return res.status(403).json({ msg: 'Forbidden' });
    }

    next();
}

module.exports = {
    validateLogin,
    validateOtp,
    validateForgotPassword,
    validateResetPassword,
    allowNormalUserOnly,
    allowSuperAdminOnly
};