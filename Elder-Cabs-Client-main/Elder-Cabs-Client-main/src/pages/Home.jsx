import AboutUs from '../components/Home/AboutUs';
import Services from '../components/Home/Services';
import Fleet from '../components/Home/Fleet';
import Booking from '../components/Home/Booking';

//assets
import heroImg from '../assets/images/home/hero.webp';
import carImg from '../assets/images/home/car-hero.png';
import cityImg from '../assets/images/attach-taxi/city.gif';
import City from './City';
import Features from '../components/Home/Features';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import BookingSuccess from '../components/Booking/BookingSuccess';

const Home = () => {

    const [queryParams, setQueryParams] = useState({});
    const [search] = useSearchParams();

    const location = useLocation();

    useEffect(() => {
        if (!location.hash && !search.get('tab')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);


    // get query params
    useEffect(() => {

        const getAllQueryParams = () => {
            return new URLSearchParams(location.search);
        }

        const queryParams = getAllQueryParams();
        let params = {};
        for (const [key, value] of queryParams.entries()) {
            params[key] = value;
        }
        setQueryParams(params);
    }, [location]);

    // if (queryParams?.payment && queryParams?.bookingId) {
    //     return <BookingSuccess bookingId={queryParams?.bookingId} />
    // }

    return (
        <div>

            {queryParams?.payment === 'success' && queryParams?.bookingId &&
                <BookingSuccess bookingId={queryParams.bookingId} />
            }

            <div className='relative'>
                <div className='w-full h-[50vh] md:h-[50vh] lg:h-[50vh] after:content-[""] after:w-full after:h-full after:bg-[#00000075] after:top-0 after:left-0 after:absolute'>
                    <img src={heroImg} alt='contact hero' className='w-full h-full object-cover' />
                </div>
                <div className='absolute container top-0 left-1/2 -translate-x-1/2 h-full gap-y-5 flex flex-col justify-center items-center px-5 md:px-10'>
                    <h2 className='uppercase text-white text-xl md:text-2xl'>Get Cab Now</h2>
                    <h1 className='uppercase text-white text-4xl md:text-4xl 2xl:text-7xl font-semibold'>
                        <a href='tel:+917428203766' rel='noreferrer'>+91-7428203766</a>
                    </h1>
                    {/* <div className='overflow-hidden max-lg:w-11/12'>
                        <img src={carImg} alt='Car' className='max-lg:w-full lg:w-[600px] xl:w-[250px] 2xl:w-[800px] -mb-[16%] h-auto' />
                    </div> */}
                </div>
            </div>
            <Booking />
            <AboutUs />
            <Fleet />
            <Services />
            <Features />
            <div className='w-full h-auto py-10'>
                <img src={cityImg} alt='' className='w-full h-auto' />
            </div>
            {/* <City /> */}
        </div>
    );
}

export default Home;
