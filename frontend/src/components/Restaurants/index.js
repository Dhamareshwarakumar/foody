import React from 'react';
import { RestaurantCard } from '../';

import './restaurants.css';

const Restaurants = () => {
    return (
        <>
            <div className='restaurants'>
                <div className='restaurants__item'>
                    <RestaurantCard />
                </div>
                <div className='restaurants__item'>
                    <RestaurantCard />
                </div>
                <div className='restaurants__item'>
                    <RestaurantCard />
                </div>
                <div className='restaurants__item'>
                    <RestaurantCard />
                </div>
                <div className='restaurants__item'>
                    <RestaurantCard />
                </div>
                <div className='restaurants__item'>
                    <RestaurantCard />
                </div>
                <div className='restaurants__item'>
                    <RestaurantCard />
                </div>
            </div>
        </>
    );
};

export default Restaurants;