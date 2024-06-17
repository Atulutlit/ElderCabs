import React from "react";
import { CardNew } from "./CardNew";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';

import useFetch from '../../../hooks/useFetch';
// import {CardNew} from 'CardNew'

const Slide = () => {

  const { data: reviews = [] } = useFetch('/review');

  const prevRef = React.useRef();
  const nextRef = React.useRef();

  return (
    <div className="my-5 flex justify-center items-center relative w-11/12">
      <div className="rounded-xl relative w-full md:w-5/6 lg:w-4/6 py-16">
        <button
          className="absolute top-1/2 z-10 -left-3 md:-left-12 disabled:shadow-none -translate-y-1/2 grid place-items-center bg-white shadow-md shadow-[#000000a1] w-10 h-10 rounded-full"
          type="button"
          ref={prevRef}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          ref={nextRef}
          className="absolute top-1/2 z-10 -right-3 md:-right-12 disabled:shadow-none -translate-y-1/2 grid place-items-center bg-white shadow-md shadow-[#000000a1] w-10 h-10 rounded-full"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          speed={500}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.update();
          }}
          modules={[Navigation]}
        >
          {Array.isArray(reviews) && reviews.map(review =>
            <SwiperSlide key={review?._id}>
              <CardNew review={review} />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Slide;
