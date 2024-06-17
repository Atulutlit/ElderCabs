import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import './TourSlider.css';

// assets
import card1Img from '../../assets/img/tour-slider/tour-card-1.png';
import useFetch from '../../hooks/useFetch';
import TourSliderItem from './TourSliderItem';

const StarSVG = ({ ...props }) => {
    return <svg {...props} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" fill="#FFCB68" />
    </svg>
}

const PrevArrow = ({ className, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`!absolute !bottom-[5px] !mx-4 !right-1/2 !w-10 !h-10 !grid !place-items-center !rounded-full !bg-white !shadow-md`}
        >
            <svg className='w-5 h-5 rotate-180' viewBox="0 0 17 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0059 13.5032L0.738958 3.14527L3.69776 0.212458L16.8975 13.5292L3.58078 26.7289L0.647972 23.7701L11.0059 13.5032Z" fill="currentColor" />
            </svg>
        </button>
    );
}

const NextArrow = ({ className, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`!absolute !bottom-[5px] !mx-4 !left-1/2 !w-10 !h-10 !grid !place-items-center !rounded-full !bg-white !shadow-md`}
        >
            <svg className='w-5 h-5' viewBox="0 0 17 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0059 13.5032L0.738958 3.14527L3.69776 0.212458L16.8975 13.5292L3.58078 26.7289L0.647972 23.7701L11.0059 13.5032Z" fill="currentColor" />
            </svg>
        </button>
    );
}

const TourSlider = () => {

    const { data: packages = [] } = useFetch('/package/packages-category-theme');

    const sliderSetting = {
        dots: false,
        infinite: packages?.length > 3,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: true,
        draggable: false,
        arrows: true,
        centerPadding: '0px',
        className: 'pt-10 pb-16',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className='overflow-hidden md:w-[] tourSlider'>
            <Slider {...sliderSetting}>
                {Array.isArray(packages) && packages.map(item => <TourSliderItem packageData={item} key={item._id} />)}
            </Slider>
        </div>
    );
}

export default TourSlider;
