import React, { useEffect } from 'react';
import Contact from '../Contact/Contact';
import Destination from '../Destination/Destination';
import Footer from '../Footer/Footer';
import Gallery from '../Gallery/Gallery';
import Header from '../Header/Header';
import Review from '../Review/Review';
import Services from '../Services/Services';
import Slider from '../Slider/Slider';
import Tours from '../Tours/Tours';
import {Subscribe} from '../SubscribeNewsLetter/Subscribe'
import Fleet from '../Fleet/Fleet';
const Home = () => {
    
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    },[])

    return (
        <>
            <Header></Header>
            <Destination></Destination>
            <Services></Services>
            <Fleet/>
            <Tours></Tours>
            <Review></Review>
            <Gallery></Gallery>
            <Contact></Contact>
            <Subscribe/>
            <Footer></Footer>
        </>
    );
};

export default Home;