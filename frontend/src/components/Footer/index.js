import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className='footer__title'>
                <h1>Foody</h1>
            </div>
            <div className="footer__content">
                <div className="footer__content__col1">
                    <h3 className='footer__content__title'>Column 1</h3>
                    <ul className='footer__content__links'>
                        <li><a href="https://google.com" className='footer__content__link'>link 1</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 2</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 3</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 4</a></li>
                    </ul>
                </div>
                <div className="footer__content__col2">
                    <h3 className='footer__content__title'>For Restaurants</h3>
                    <ul className='footer__content__links'>
                        <li><Link to={`/register-restaurant`} className='footer__content__link'>Partner with us</Link></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 2</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 3</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 4</a></li>
                    </ul>
                </div>
                <div className="footer__content__col4">
                    <h3 className='footer__content__title'>Column 3</h3>
                    <ul className='footer__content__links'>
                        <li><a href="https://google.com" className='footer__content__link'>link 1</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 2</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 3</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 4</a></li>
                    </ul>
                </div>
                <div className="footer__content__col3">
                    <h3 className='footer__content__title'>Column 4</h3>
                    <ul className='footer__content__links'>
                        <li><a href="https://google.com" className='footer__content__link'>link 1</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 2</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 3</a></li>
                        <li><a href="https://google.com" className='footer__content__link'>link 4</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;