import React from 'react';
import './restaurantCard.css';

const RestaurantCard = () => {
    return (
        <div className='restaurant-card'>
            <img src="https://b.zmtcdn.com/data/pictures/chains/8/90148/e4aa2bd2ffd79d07c3833ad439c46823_o2_featured_v2.jpg" alt="Kritunga Restaurant" className='restaurant-card__image' />
            <div className='restaurant-card__content'>
                <div className="restaurant-card__title__container">
                    <h3 className="restaurant-card__title">Kritunga Restaurant</h3>
                    <div className="restaurant-card__rating">
                        <p>4.2</p><i className="fa-solid fa-star"></i>
                    </div>
                </div>
                <div className="restaurant-card__subtitle">
                    <p>North Indian, Chinese, Mughlai, Biryani, Desserts</p>
                </div>
                <div className="restaurant-card__eta">
                    <p>34 min | 3 km</p>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;