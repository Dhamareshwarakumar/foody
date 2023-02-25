const jwt = require('jsonwebtoken');

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

module.exports = {
    generateJwtToken
}