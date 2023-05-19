const { isEmpty } = require('../utils');
const { TIME_REGEX } = require('../utils/constants');

const validateRegisterRestaurant = (req, res, next) => {
    const errors = {};

    if (isEmpty(req.body.userId)) {
        errors.userId = 'User ID is required';
    } else if (typeof req.body.userId !== 'string') {
        errors.userId = 'Invalid user ID';
    }

    if (isEmpty(req.body.name)) {
        errors.name = 'Restaurant Name should not be empty';
    } else if (typeof req.body.name !== 'string') {
        errors.name = 'Invalid Restaurant Name';
    } else if (req.body.name.length < 3) {
        errors.name = 'Restaurant Name should be at least 3 characters';
    }

    if (isEmpty(req.body.lat)) {
        errors.lat = 'Latitude should not be empty';
    } else {
        req.body.lat = parseFloat(req.body.lat);
        if (req.body.lat !== 0) {
            if (req.body.lat) {
                if (req.body.lat < -90 || req.body.lat > 90) {
                    errors.lat = 'Latitude should be between -90 and 90';
                }
            } else {
                errors.lat = 'Invalid latitude value';
            }
        }
    }

    if (isEmpty(req.body.lng)) {
        errors.lng = 'Longitude should not be empty';
    } else {
        req.body.lng = parseFloat(req.body.lng);
        if (req.body.lng !== 0) {
            if (req.body.lng) {
                if (req.body.lng < -180 || req.body.lng > 180) {
                    errors.lng = 'Longitude should be between -180 and 180';
                }
            } else {
                errors.lng = 'Invalid longitude value';
            }
        }
    }

    if (isEmpty(req.body.address)) {
        errors.address = 'Address should not be empty';
    } else if (typeof req.body.address !== 'string') {
        errors.address = 'Invalid address value';
    } else if (req.body.address.length < 3) {
        errors.address = 'Address should be at least 3 characters';
    }

    if (!isEmpty(req.body.timings)) {
        if (typeof req.body.timings !== 'object') {
            errors.timings = 'Invalid timings value';
        } else {
            if (Object.keys(req.body.timings).length !== 7) {
                errors.timings = 'Timings should have 7 days';
            } else {
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                const timings = Object.keys(req.body.timings);
                const isValid = days.every(day => timings.includes(day));
                if (!isValid) {
                    errors.timings = 'Invalid timings value';
                } else {
                    Object.keys(req.body.timings).forEach(day => {
                        if (isEmpty(req.body.timings[day])) {
                            errors.timings = 'Timings should not be empty';
                        } else {
                            if (isEmpty(req.body.timings[day].open)) {
                                errors.timings = 'Opening time is required';
                            } else {
                                let openingTimeInMinutes = 0;
                                let closingTimeInMinutes = 0;

                                if (!TIME_REGEX.test(req.body.timings[day].open)) {
                                    errors.timings = 'Invalid opening time value';
                                } else {
                                    let hours = req.body.timings[day].open.split(':')[0];
                                    let minutes = req.body.timings[day].open.split(':')[1];
                                    openingTimeInMinutes = parseInt(hours) * 60 + parseInt(minutes);
                                }

                                if (isEmpty(req.body.timings[day].close)) {
                                    errors.timings = 'Closing time is required';
                                } else {
                                    if (!TIME_REGEX.test(req.body.timings[day].close)) {
                                        errors.timings = 'Invalid closing time value';
                                    } else {
                                        let hours = req.body.timings[day].close.split(':')[0];
                                        let minutes = req.body.timings[day].close.split(':')[1];
                                        closingTimeInMinutes = parseInt(hours) * 60 + parseInt(minutes);
                                    }
                                }

                                if (openingTimeInMinutes >= closingTimeInMinutes) {
                                    errors.timings = 'Closing time should be greater than opening time';
                                }
                            }
                        }
                    })
                }
            }
        }
    }

    if (!isEmpty(req.body.cuisine)) {
        if (!Array.isArray(req.body.cuisine)) {
            errors.cuisine = 'Cuisine should be an array';
        } else {
            req.body.cuisine.forEach(cuisine => {
                if (isEmpty(cuisine)) {
                    errors.cuisine = 'Cuisine should not be empty';
                } else if (cuisine.length < 3) {
                    errors.cuisine = 'Cuisine should be at least 3 characters';
                }
            })
        }
    }

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validateRegisterRestaurant
}