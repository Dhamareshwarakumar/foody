import React from 'react';

const Search = () => {
    return (
        <div className='jumbotron__search'>
            <div className='jumbotron__search__area'>
                <i className="fa-solid fa-location-dot"></i>
                <input type="text" list='locations' placeholder='Search location' />
                <datalist id="locations">
                    <option value="Hyderabad" />
                    <option value="Chennai" />
                    <option value="Bengalore" />
                    <option value="Mumbai" />
                    <option value="Delhi" />
                </datalist>
                <i className="fa-solid fa-caret-down"></i>
            </div>
            <div className="jumbotron__search__seperator"></div>
            <div className='jumbotron__search__restaurant'>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder='Search for restaurant, cuisine or a dish' />
            </div>
        </div>
    );
};

export default Search;