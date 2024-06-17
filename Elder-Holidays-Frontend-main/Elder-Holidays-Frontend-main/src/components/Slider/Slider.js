import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Images } from './SliderUtilities';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./slider.css";
import line from "../../assets/img/slide/Line.png"

// import required modules
import { Pagination, Navigation } from "swiper";
import { FaPlay } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";
const Slider = () => {

    const images = Images();

    const slider = [
        { bgImg: images['delhi'], content: 'Delhi NCR ' },
        { bgImg: images['srinagar'], content: 'Srinagar' },
        { bgImg: images['jammu'], content: 'Jammu' },
        { bgImg: images['leh'], content: 'Leh' },
        { bgImg: images['pathankot'], content: 'Pathankot' },
        { bgImg: images['amritsar'], content: 'Amritsar' },
        { bgImg: images['manali'], content: 'Manali' },
        { bgImg: images['shimla'], content: 'Shimla' },
        { bgImg: images['chandigarh'], content: 'Chandigarh' },
        { bgImg: images['ambala'], content: 'Ambala' },
        { bgImg: images['dehradun'], content: 'Dehradun' },
        { bgImg: images['rishikesh'], content: 'Rishikesh' },
        { bgImg: images['haridwar'], content: 'Haridwar' },
        { bgImg: images['haldwani'], content: 'Haldwani' },
        { bgImg: images['ramnagar'], content: 'Ramnagar' },
        { bgImg: images['agra'], content: 'Agra' },
        { bgImg: images['varanasi'], content: 'Varanasi' },
        { bgImg: images['jhansi'], content: 'Jhansi' },
        { bgImg: images['prayagraj'], content: 'Prayagraj' },
        { bgImg: images['jaipur'], content: 'Jaipur' },
        { bgImg: images['udaipur'], content: 'Udaipur' },
        { bgImg: images['ahemdabad'], content: 'Ahemdabad' },
        { bgImg: images['rajkot'], content: 'Rajkot' },
        { bgImg: images['vadodara'], content: 'Vadodara' },
        { bgImg: images['surat'], content: 'Surat' },
        { bgImg: images['mumbai'], content: 'Mumbai' },
        { bgImg: images['pune'], content: 'Pune' },
        { bgImg: images['banglore'], content: 'Banglore' },
        { bgImg: images['mysore'], content: 'Mysore' },
        { bgImg: images['chennai'], content: 'Chennai' },
        { bgImg: images['madurai'], content: 'Madurai' },
        { bgImg: images['coimbatore'], content: 'Coimbatore' },
        { bgImg: images['trichy'], content: 'Trichy' },
        { bgImg: images['trivandrum'], content: 'Trivandrum' },
        { bgImg: images['cochin'], content: 'Cochin' },
        { bgImg: images['indore'], content: 'Indore' },
        { bgImg: images['gwalior'], content: 'Gwalior' },
        { bgImg: images['hyderabad'], content: 'Hyderabad' },
        { bgImg: images['bhubaneswar'], content: 'Bhubaneswar' },
        { bgImg: images['puri'], content: 'Puri' },
        { bgImg: images['kolkata'], content: 'Kolkata' },
        { bgImg: images['siliguri'], content: 'Siliguri' },
        { bgImg: images['guwahati'], content: 'Guwahati' },
        { bgImg: images['andaman'], content: 'Andaman' },
    ];

    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    return (
        <>
            <div className="flex md:flex-row flex-col lg:px-[100px] px-8 gap-8 relative">
                <div className="flex lg:flex-row flex-col lg:gap-8 items-center justify-center lg:w-[40%] w-full text-white  z-10 pt-8 lg:pt-0">
                    <h2 className="mb-3 lg:mb-0">We serve elder cabs here</h2>
                    <div ref={navigationNextRef} className="cursor-pointer ">
                        <img src={line} alt="line" />
                    </div>
                    {/* <div className="block lg:hidden">
                            <div ref={navigationPrevRef}>
                                <GrLinkNext className="text-2xl"></GrLinkNext>
                            </div>
                        </div> */}
                </div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    slidesPerGroup={1}
                    loop={true}
                    breakpoints={{
                        300: {
                            slidesPerView: 1,
                            spaceBetween: 40,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 25,
                        }

                    }}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = navigationPrevRef.current;
                        swiper.params.navigation.nextEl = navigationNextRef.current;
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper w-[60%]"
                >
                    {
                        slider.map((slide, idx) =>
                            <SwiperSlide className="pt-5 pb-10 flex" key={idx}>
                                <div style={{ backgroundImage: `url(${slide.bgImg})`, borderRadius: '10px' }} className="w-[95%] h-[50vh] md:h-[40vh] lg:h-[50vh] flex justify-center items-center text-white text-2xl bg-cover bg-center slide">
                                    <div className="flex w-full h-full hover:bg-[#0000006d] items-center justify-center transition-all duration-200 ease-in opacity-0 hover:opacity-100 hover:rounded-lg">{slide.content}</div>
                                    {/* <Link to="/" className="bg-white rounded-full p-2 absolute bottom-5 right-5 flex justify-center items-center hover:bg-[#66DAFF] duration-500
                            ">
                            <FaPlay className=" text-sm text-black"></FaPlay>
                            </Link> */}
                                </div>
                            </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </>
    );
};

export default Slider;