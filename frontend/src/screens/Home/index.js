import React, { useState, useEffect } from 'react';
import './home.css';

import Jumbotron from './Jumbotron';
import { Slider, Restaurants, Footer } from '../../components';

const Home = () => {
    useEffect(() => {
        document.title = 'Home | Foody';
    }, []);

    const [items] = useState([
        {
            id: 1,
            title: 'Biryani',
            img: 'https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png'
        },
        {
            id: 2,
            title: 'Pizza',
            img: 'https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png'
        },
        {
            id: 3,
            title: 'Chicken',
            img: 'https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png'
        },
        {
            id: 4,
            title: 'Burger',
            img: 'https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png'
        },
        {
            id: 5,
            title: 'Rolls',
            img: 'https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png'
        },
        {
            id: 6,
            title: 'Shawarma',
            img: 'https://b.zmtcdn.com/data/o2_assets/2f34540e0b12058f5f8b9390c3a3fb4a1648972281.png'
        },
        {
            id: 7,
            title: 'Fried Rice',
            img: 'https://b.zmtcdn.com/data/o2_assets/e444ade83eb22360b6ca79e6e777955f1632716661.png'
        },
        {
            id: 8,
            title: 'Dosa',
            img: 'https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png'
        },
        {
            id: 9,
            title: 'Cake',
            img: 'https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png'
        },
        {
            id: 10,
            title: 'Noodles',
            img: 'https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png'
        },
        {
            id: 11,
            title: 'Thali',
            img: 'https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png'
        },
        {
            id: 12,
            title: 'Paratha',
            img: 'https://b.zmtcdn.com/data/o2_assets/2b5a5b533473aada22015966f668e30e1633434990.png'
        }
    ]);

    return (
        <div>
            {/* <h1 className='text-center'><span className="text-primary">Foody</span> Welcomes You... 🙏</h1> */}
            <Jumbotron />
            <div className='home-slider'>
                <Slider items={items} title="Inspiration for your first order" />
            </div>

            <div className="home-restaurants">
                <Restaurants />
            </div>
            <Footer />
        </div>
    );
};

export default Home;