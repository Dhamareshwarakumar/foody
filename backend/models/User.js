const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    encry_password: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    otp_verified: {
        type: Boolean,
        default: false
    },
    salt: {
        type: String,
        default: uuidv4()
    },
    googleId: {
        type: String,
        trim: true
    }
}, { timestamps: true });

userSchema.virtual('password')
    .set(function (plainPassword) {
        encryPassword = this.securePassword(plainPassword);
        if (encryPassword) {
            this.encry_password = encryPassword;
        } else {
            throw new Error('Password is not valid');
        }
    });

userSchema.methods = {
    securePassword: function (plainPassword) {
        if (!plainPassword) return '';

        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    authenticate: function (plainPassword) {
        if (!this.encry_password) return false;
        encryPassword = this.securePassword(plainPassword);
        if (encryPassword) return crypto.timingSafeEqual(Buffer.from(this.securePassword(plainPassword)), Buffer.from(this.encry_password));
        return false;
    }
}


module.exports = mongoose.model('User', userSchema);