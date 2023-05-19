const User = require('../models/User');
const Restaurant = require('../models/Restaurant');


const registerRestaurant = (userId, name, lat, lng, address, timings = {}, cuisine = []) => {
    return new Promise((resolve, reject) => {
        // check if user exists
        User.findById(userId)
            .then(user => {
                if (!user) {
                    reject({
                        status: 404,
                        msg: 'User not found'
                    });
                }
                // check if user already has a restaurant
                Restaurant.findOne({ user: userId })
                    .then(restaurant => {
                        if (restaurant) {
                            reject({
                                status: 409,
                                msg: 'User already has a restaurant'
                            });
                        }
                        // create restaurant
                        const newRestaurant = new Restaurant({
                            user: userId,
                            name,
                            lat,
                            lng,
                            address,
                            timings,
                            cuisine
                        });

                        newRestaurant.save()
                            .then(restaurant => resolve(restaurant))
                            .catch(err => {
                                console.error(`[RestaurantController][registerRestaurant][${userId}] Error: ${err}`);
                                reject({
                                    status: 500,
                                    msg: 'Internal Server Error',
                                });
                            });
                    })
                    .catch(err => {
                        console.error(`[RestaurantController][registerRestaurant][${userId}] Error: ${err}`);
                        reject({
                            status: 500,
                            msg: 'Internal Server Error',
                        });
                    });
            })
            .catch(err => {
                console.error(`[RestaurantController][registerRestaurant][${userId}] Error: ${err}`);
                reject({
                    status: 500,
                    msg: 'Internal Server Error',
                });
            })
    });
}

module.exports = {
    registerRestaurant
}