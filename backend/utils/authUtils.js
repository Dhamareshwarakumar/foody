const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const generateJwtToken = data => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            data,
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) {
                    console.error(`[authUtils][generateJwtToken][${data?.email}] Error: ${err}`);
                    reject({ msg: 'Internal Server Error', err: {}, status: 500 });
                }

                resolve(`Bearer ${token}`);
            }
        );
    });
};

const generateOtp = (minDigits = 6, maxDigits = 6) => {
    return crypto.randomInt(10 ** (minDigits - 1), 10 ** maxDigits);
};

const generateOtpHash = (otp, verifier, expiryTimeInSeconds = 300) => {
    try {
        const expiryTime = Date.now() + expiryTimeInSeconds * 1000;

        const message = `${otp}.${verifier}.${expiryTime}`;

        return crypto.createHmac('sha256', process.env.OTP_KEY)
            .update(message)
            .digest('hex') + '.' + expiryTime;
    } catch (err) {
        console.error(`[authUtils][generateOtpHash] Error: ${err}`);
        return '';
    }
};

const verifyOtpHash = (otp, verifier, otpHash, callback) => {
    try {
        let [hash, expiryTime] = otpHash.split('.');

        if (Date.now() > expiryTime) return callback('OTP expired');

        const message = `${otp}.${verifier}.${expiryTime}`;

        const newHash = crypto.createHmac('sha256', process.env.OTP_KEY)
            .update(message)
            .digest('hex');

        if (newHash !== hash) return callback('Invalid OTP');

        return callback(null);
    } catch (err) {
        console.error(`[authUtils][verifyOtpHash] Error: ${err}`);
        return callback('Internal Server Error');
    }
};

const sendOtp = (verifier, subject) => {
    return new Promise((resolve, reject) => {
        try {
            const otp = generateOtp();
            const otpHash = generateOtpHash(otp, verifier);

            const mailOptions = {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            }

            const transporter = nodemailer.createTransport(mailOptions);

            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: verifier,
                subject: subject,
                text: `Your OTP is ${otp}`,
                html: `<p>Your OTP is <b>${otp}</b></p>`
            }, (err, info) => {
                if (err) {
                    console.error(`[authUtils][sendOtp][${verifier}] Error: ${err}`);
                    reject({ msg: 'Error sending OTP', err: {}, status: 500 });
                }

                resolve(otpHash);
            });
        } catch (err) {
            console.error(`[authUtils][sendOtp][${verifier}] Error: ${err}`);
            reject({ msg: 'Internal Server Error', err: {}, status: 500 });
        }
    });
}

module.exports = {
    generateJwtToken,
    generateOtp,
    generateOtpHash,
    verifyOtpHash,
    sendOtp
}