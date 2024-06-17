import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper";

//CSS
import './Fleet.css';

//FLeet Images
import Dzire from '../../assets/FLeets/Dzire.webp';
import Ertiga from '../../assets/FLeets/Ertiga.webp';
import Etios from '../../assets/FLeets/Etios.webp';
import Innova from '../../assets/FLeets/Innova.webp';
import Marazzo from '../../assets/FLeets/Marazzo.webp';
import Xcent from '../../assets/FLeets/Xcent.webp';
import Crysta from '../../assets/FLeets/Crysta.webp';
import Maharaja from '../../assets/FLeets/Maharaja_Tempo.webp'
import PKN from '../../assets/FLeets/pkn_Tempo.webp'
import seater20 from '../../assets/FLeets/20seater_Tempo.webp'
import seater21 from '../../assets/FLeets/21seater_Coach.webp'
import seater27 from '../../assets/FLeets/27seater_Coach.webp'
import seater41 from '../../assets/FLeets/41seater_Coach.webp'
import seater45 from '../../assets/FLeets/45seater_Coach.webp'
import seater49 from '../../assets/FLeets/49seater_Coach.webp'

const Fleet = () => {
  const [carType, setCarType] = useState('sedan');

  const handleCarTypeChange = (type) => {
    setCarType(type);
  };

  const sedanCars = [
    {
      name: 'Dzire',
      image: Dzire
    },
    {
      name: 'Etios',
      image: Etios
    },
    {
      name: 'Xcent',
      image: Xcent
    }

  ];

  const suvCars = [
    {
      name: 'Ertiga',
      image: Ertiga
    },
    {
      name: 'Innova',
      image: Innova
    },
    {
      name: 'Marazzo',
      image: Marazzo
    },
    {
      name: 'Crysta',
      image: Crysta
    }
  ];

  const tempoTravellers = [
    {
      name: 'Maharaja',
      image: Maharaja
    },
    {
      name: 'PKN',
      image: PKN
    },
    {
      name: '20 Seater',
      image: seater20
    }
  ];

  const coaches = [
    {
      name: '21 Seater Coach',
      image: seater21
    },
    {
      name: '27 Seater Coach',
      image: seater27
    },
    {
      name: '41 Seater Coach',
      image: seater41
    },
    {
      name: '45 Seater Coach',
      image: seater45
    },
    {
      name: '49 Seater Coach',
      image: seater49
    }
  ];

  let carList = [{}];

  switch (carType) {
    case 'sedan':
      carList = sedanCars;
      break;
    case 'suv':
      carList = suvCars;
      break;
    case 'tempo':
      carList = tempoTravellers;
      break;
    case 'coach':
      carList = coaches;
      break;
    default:
      carList = sedanCars;
  }


  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='lg:text-6xl text-4xl font-bold lg:py-6 pb-3'>Our Fleets</p>
      <p className='text-lg p-5 lg:pb-14 text-center  text-[#787878]'>Elder Cabs (Elder Fleet Supply Solutions Pvt. Ltd.) is an online/offline taxi service provider which has been offering exceptional Intercity / Intra-city taxi or other passenger vehicles services for local, transfer, one-way, round-trip,, and multi city travel. We offer taxi of various types and qualities in major cities of India. </p>

      <div className="car-types">
        <button onClick={() => handleCarTypeChange('sedan')} className={carType === 'sedan' ? 'bg-[#DEF3FF] px-2 py-1 rounded-lg' : 'mx-2 text-gray-400'}>Sedan Class</button>
        <button onClick={() => handleCarTypeChange('suv')} className={carType === 'suv' ? 'bg-[#DEF3FF] px-2 py-1 rounded-lg' : 'mx-2 text-gray-400'}>SUV Class</button>
        <button onClick={() => handleCarTypeChange('tempo')} className={carType === 'tempo' ? 'bg-[#DEF3FF] px-2 py-1 rounded-lg' : 'mx-2 text-gray-400'}>Tempo Traveller</button>
        <button onClick={() => handleCarTypeChange('coach')} className={carType === 'coach' ? 'bg-[#DEF3FF] px-2 py-1 rounded-lg' : 'mx-2 text-gray-400'}>Coaches</button>
      </div>
      <Swiper
        pagination={{
          clickable: true,
        }}
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[FreeMode, Pagination]}
        className="mt-10 h-full mySwiper"
      >
        {carList.map((car, index) => (
          <SwiperSlide key={index} className='flex flex-col p-10 mb-14 hover:border hover:border-gray-200 cursor-pointer duration-200 transition-all'>
            <img src={car.image} alt='' className='object-cover aspect-[2/1] p-5' />
            <p className=''>{car.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='mt-4 block'>
        <a href='https://eldercabs.com' rel='noreferrer' target='_blank' className='bg-transparent block border-2 border-black px-5 py-2 font-normal duration-300 hover:bg-black hover:text-[#f2f2f2]'>Book Now</a>
      </div>
    </div>

  )
}

export default Fleet