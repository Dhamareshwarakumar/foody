const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const openingHoursSchema = new Schema({
    open: {
        type: String,
        required: true
    },
    close: {
        type: String,
        required: true
    }
});

const timingsSchema = new Schema({
    monday: openingHoursSchema,
    tuesday: openingHoursSchema,
    wednesday: openingHoursSchema,
    thursday: openingHoursSchema,
    friday: openingHoursSchema,
    saturday: openingHoursSchema,
    sunday: openingHoursSchema
});

const restaurantSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    lng: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    timings: timingsSchema,
    cuisine: [
        {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        }
    ],
    is_verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);