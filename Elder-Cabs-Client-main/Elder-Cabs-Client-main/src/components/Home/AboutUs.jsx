import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

//assets
import aboutSvg from '../../assets/images/home/online-booking-about-us.svg';


const AboutUs = () => {


    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#about-us') {
            const element = document.getElementById('about-us');
            if (element) {
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }, [location]);

    return (
        <div className="container mx-auto px-5 py-10" id='about-us'>
            <div className="flex max-md:flex-col-reverse items-center">
                <div className='md:w-6/12'>
                    <div className='flex flex-col gap-y-5'>
                        <h1 className='text-3xl font-bold text-black'>About Us</h1>
                        <p className='text-sm text-[#00000099] leading-relaxed'>Elder Cabs (Elder Fleet Supply Solutions Pvt. Ltd.) is an online/offline taxi service provider which has been offering exceptional Intercity / Intra-city taxi or other passenger vehicles services for local, transfer, one-way, round-trip, and multi city travel. We offer taxi of various types and qualities in major cities of India. We have sufficient inventory of vehicles. Our team is courteous and professional. Since our establishment in July 2016 we have completed thousands trip and arrived our customers at their destination comfortably and happily.</p>
                        <Link to={'/#booking'}>
                            <button className='rounded-lg w-fit py-2 px-10 shadow-md hover:shadow-none duration-200 hover:bg-transparent border border-violet-200 hover:border-violet-700 bg-violet-200 text-violet-700 text-sm font-medium'>Book Now</button>
                        </Link>
                    </div>
                </div>
                <div className='md:w-6/12'>
                    <img src={aboutSvg} alt='About SVG' className='w-full h-auto' />
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
