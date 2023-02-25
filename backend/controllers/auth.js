const User = require('../models/User');

const { generateJwtToken } = require('../utils/authUtils');

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    register(email, password)
                        .then(token => resolve(token))
                        .catch(err => reject(err));
                } else if (user.authenticate(password)) {
                    user = {
                        id: user._id,
                        email: user.email,
                        role: user.role
                    };

                    generateJwtToken(user)
                        .then(token => resolve(token))
                        .catch(err => reject(err));
                } else {
                    reject({ msg: 'Invalid Credentials', err: { password: 'Password is incorrect' }, status: 401 });
                }
            })
            .catch(err => {
                console.error(`[AuthController][login][${email}] Error: ${err}`);
                reject({ msg: 'Internal Server Error', err: {}, status: 500 });
            });
    });
};

const register = (email, password) => {
    return new Promise((resolve, reject) => {
        const newUser = new User({
            email,
            password
        });

        newUser.save()
            .then(user => {
                user = {
                    id: user._id,
                    email: user.email,
                    role: user.role
                };

                generateJwtToken(user)
                    .then(token => resolve(token))
                    .catch(err => reject(err));
            })
            .catch(err => {
                console.error(`[AuthController][register][${email}] Error: ${err}`);
                reject({ msg: 'Internal Server Error', err: {}, status: 500 });
            });
    });
};


module.exports = {
    login
};