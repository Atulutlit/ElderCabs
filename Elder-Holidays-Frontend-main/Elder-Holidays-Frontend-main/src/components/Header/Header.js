import React from 'react';
import Slider from '../Slider/Slider';
import Banner from './Banner/Banner';
import Nav from './Nav/Nav';
const Header = () => {
    return (
        <header className='h-auto !bg-transparent' style={{ backgroundImage: 'url(https://www.example.com) !important' }}>
            <Nav></Nav>
            <Banner></Banner>
        </header>
    );
};

export default Header;