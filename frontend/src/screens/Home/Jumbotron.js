import React from 'react';
import Search from './Search';

const Jumbotron = () => {
    return (
        <div className='jumbotron'>
            <h1 className='jumbotron__title'>Foody</h1>
            <p className='jumbotron__subtitle'>Discover the best food & drinks in Hyderabad</p>
            <Search />
        </div>
    );
};

export default Jumbotron;