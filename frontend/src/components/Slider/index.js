import React, { useEffect, useState, useRef } from 'react';

import './slider.css';

const Slider = ({ items, title }) => {
    const [scrollLength, setScrollLength] = useState(0);
    const [itemsOnPage, setItemsOnPage] = useState(0);
    const [leftHiddenItems, setleftHiddenItems] = useState(0);
    const sliderItems = useRef(null);

    useEffect(() => {
        const updateScrollLength = () => {
            setScrollLength(sliderItems.current.querySelector('.slider__item').offsetWidth);
        };

        updateScrollLength();
        window.addEventListener('resize', updateScrollLength);

        return () => window.removeEventListener('resize', updateScrollLength);
    }, []);

    useEffect(() => {
        const items = Math.round(sliderItems.current.offsetWidth / scrollLength);
        items !== itemsOnPage && setItemsOnPage(items);
    }, [scrollLength, itemsOnPage]);

    const moveLeft = () => {
        leftHiddenItems < items.length - itemsOnPage && setleftHiddenItems(prev => prev + 1);
    };

    const moveRight = () => {
        leftHiddenItems > 0 && setleftHiddenItems(prev => prev - 1);
    }

    return (
        <div className='slider__container'>
            <h3 className='slider__container__title'>{title}</h3>
            <div className='slider'>
                <div className="slider__items" ref={sliderItems}>
                    {items.map(item => (
                        <div className="slider__item" key={item.id} style={{ left: leftHiddenItems * -scrollLength + 'px' }}>
                            <div className="slider__item__img">
                                <img src={`${item.img}`} alt={`${item.title}`} />
                            </div>
                            <div className="slider__item__title">{item.title}</div>
                        </div>
                    ))}
                </div>
                <div className="slider__left">
                    <div className="slider__left__arrow" onClick={moveRight}><i className="fa-solid fa-arrow-left"></i></div>
                </div>
                <div className="slider__right">
                    <div className="slider__right__arrow" onClick={moveLeft}><i className="fa-solid fa-arrow-right"></i></div>
                </div>
            </div>
        </div>
    );
};

export default Slider;