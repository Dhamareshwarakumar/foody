const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const axios = require('axios');

const { generateJwtToken, sendOtp, verifyOtpHash } = require('../utils/authUtils');

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email })
            .then(user => {
                if (!user || !user.otp_verified) {
                    reject({ msg: 'Invalid Credentials', err: { email: 'User not found' }, status: 404 });
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
        User.findOne({ email })
            .then(user => {
                if (user) {
                    if (user.otp_verified) {
                        reject({ msg: 'User already exists', err: { email: 'User already exists' }, status: 400 });
                    } else {
                        sendOtp(email, 'OTP to verify foody registration')
                            .then(otpHash => resolve(otpHash))
                            .catch(err => reject(err));
                    }
                } else {
                    const newUser = new User({
                        email,
                        password
                    });

                    newUser.save()
                        .then(user => {
                            sendOtp(email, 'OTP to verify foody registration')
                                .then(otpHash => resolve(otpHash))
                                .catch(err => reject(err));
                        })
                        .catch(err => {
                            console.error(`[AuthController][register][${email}] Error: ${err}`);
                            reject({ msg: 'Internal Server Error', err: {}, status: 500 });
                        });
                }
            })
            .catch(err => reject(err))
    });
};

const verifyOtp = (email, otp, otpHash) => {
    return new Promise((resolve, reject) => {
        verifyOtpHash(otp, email, otpHash, (err) => {
            if (err) reject({ msg: err, err: {}, status: 400 });
        });

        User.findOne({ email })
            .then(user => {
                if (!user) reject({ msg: 'User not found', err: { email: 'User not found' }, status: 404 });

                user.otp_verified = true;
                user.save()
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
                        console.error(`[AuthController][verifyOtp][${email}] Error: ${err}`);
                        reject({ msg: 'Internal Server Error', err: {}, status: 500 });
                    });
            })
            .catch(err => {
                console.error(`[AuthController][verifyOtp][${email}] Error: ${err}`);
                reject({ msg: 'Internal Server Error', err: {}, status: 500 });
            });
    });
}

const forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email })
            .then(user => {
                if (!user) reject({ msg: 'User not found. Please register to continue', err: { email: 'User not found' }, status: 404 });

                sendOtp(email, 'OTP to reset foody password')
                    .then(otpHash => resolve(otpHash))
                    .catch(err => reject(err));
            })
            .catch(err => {
                console.error(`[AuthController][forgotPassword][${email}] Error: ${err}`);
                reject({ msg: 'Internal Server Error', err: {}, status: 500 });
            });
    });
}

const resetPassword = (email, password, otp, otpHash) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email })
            .then(user => {
                if (!user) reject({ msg: 'User not found', err: { email: 'User not found' }, status: 404 });

                verifyOtpHash(otp, email, otpHash, (err) => {
                    if (err) reject({ msg: err, err: {}, status: 400 });
                });

                user.password = password;
                user.save()
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
                        console.error(`[AuthController][resetPassword][${email}] Error: ${err}`);
                        reject({ msg: 'Internal Server Error', err: {}, status: 500 });
                    });
            })
            .catch(err => {
                console.error(`[AuthController][resetPassword][${email}] Error: ${err}`);
                reject({ msg: 'Internal Server Error', err: {}, status: 500 });
            })
    });
}

const googleLogin = (accessToken) => {
    return new Promise((resolve, reject) => {
        axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                console.log(res.data);
                const { sub: googleId, email, name, picture } = res.data;

                User.findOne({ email })
                    .then(user => {
                        if (user) {
                            if (!user.googleId) {
                                user.googleId = googleId;
                                user.save()
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
                                        console.error(`[AuthController][googleLogin][${email}] Error: ${err}`);
                                        reject({ msg: 'Internal Server Error', err: {}, status: 500 });
                                    });
                            }
                            user = {
                                id: user._id,
                                email: user.email,
                                role: user.role
                            };

                            generateJwtToken(user)
                                .then(token => resolve(token))
                                .catch(err => reject(err));
                        } else {
                            const newUser = new User({
                                email,
                                otp_verified: true,
                                googleId
                            })

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
                                    console.error(`[AuthController][googleLogin][${email}] Error: ${err}`);
                                    reject({ msg: 'Internal Server Error', err: {}, status: 500 });
                                });
                        }
                    })
                    .catch(err => {
                        console.error(`[AuthController][googleLogin][${email}] Error: ${err}`);
                        reject({ msg: 'Internal Server Error', err: {}, status: 500 });
                    });

            })
            .catch(err => {
                console.error(`[AuthController][googleLogin] Error: ${err}`);
                reject({ msg: 'Internal Server Error', err: {}, status: 500 });
            });
    });
}


module.exports = {
    login,
    register,
    verifyOtp,
    forgotPassword,
    resetPassword,
    googleLogin
};