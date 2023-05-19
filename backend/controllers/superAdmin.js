const Restaurant = require('../models/Restaurant');

const getPendingRestaurants = () => {
    return new Promise((resolve, reject) => {
        Restaurant.find({ is_verified: false })
            .then(restaurants => {
                if (restaurants.length) {
                    resolve(restaurants);
                } else {
                    reject({
                        status: 404,
                        msg: 'No pending restaurants found'
                    })
                }
            })
            .catch(err => {
                console.error(`[SuperAdminController][getPendingRestaurants] Error: ${err}`);
                reject({
                    status: 500,
                    msg: 'Internal Server Error',
                });
            });
    })
}

module.exports = {
    getPendingRestaurants
}