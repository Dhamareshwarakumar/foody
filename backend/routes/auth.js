const express = require('express');
const router = express.Router();
const { validateLogin } = require('../validations/auth');

const { login } = require('../controllers/auth');

router.get('/', (req, res) => {
    res.json({ msg: 'Get yourself an identity' });
});

router.post(
    '/login',
    validateLogin,
    (req, res) => {
        login(req.body.email, req.body.password)
            .then(token => res.json({ msg: 'Login Successful', token }))
            .catch(err => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

module.exports = router;