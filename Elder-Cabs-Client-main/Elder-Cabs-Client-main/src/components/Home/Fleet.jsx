import { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/free-mode";

//FLeet Images
import Dzire from '../../assets/images/fleet/Dzire.webp';
import Ertiga from '../../assets/images/fleet/Ertiga.webp';
import Etios from '../../assets/images/fleet/Etios.webp';
import Innova from '../../assets/images/fleet/Innova.webp';
import Marazzo from '../../assets/images/fleet/Marazzo.webp';
import Xcent from '../../assets/images/fleet/Xcent.webp';
import Crysta from '../../assets/images/fleet/Crysta.webp';
import Maharaja from '../../assets/images/fleet/Maharaja_Tempo.webp'
import PKN from '../../assets/images/fleet/pkn_Tempo.webp'
import seater20 from '../../assets/images/fleet/20seater_Tempo.webp'
import seater21 from '../../assets/images/fleet/21seater_Coach.webp'
import seater27 from '../../assets/images/fleet/27seater_Coach.webp'
import seater41 from '../../assets/images/fleet/41seater_Coach.webp'
import seater45 from '../../assets/images/fleet/45seater_Coach.webp'
import seater49 from '../../assets/images/fleet/49seater_Coach.webp'

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
    <div className='flex flex-col items-center justify-center container mx-auto px-2 sm:px-5'>
      <h2 className='text-3xl font-bold text-black text-center'>Our Car Fleet</h2>
      {/* <p className='text-lg p-5 lg:pb-14 text-center  text-[#787878]'>Elder Cabs (Elder Fleet Supply Solutions Pvt. Ltd.) is an online/offline taxi service provider which has been offering exceptional Intercity / Intra-city taxi or other passenger vehicles services for local, transfer, one-way, round-trip,, and multi city travel. We offer taxi of various types and qualities in major cities of India. </p> */}

      <div className="car-types mt-10">
        <button onClick={() => handleCarTypeChange('sedan')} className={carType === 'sedan' ? 'bg-violet-200 font-medium max-sm:text-xs text-sm text-violet-600 px-2 py-1 rounded-lg' : 'font-medium max-sm:text-xs text-sm text-violet-500 mx-2'}>Sedan Class</button>
        <button onClick={() => handleCarTypeChange('suv')} className={carType === 'suv' ? 'bg-violet-200 font-medium max-sm:text-xs text-sm text-violet-600 px-2 py-1 rounded-lg' : 'font-medium max-sm:text-xs text-sm text-violet-500 mx-2'}>SUV Class</button>
        <button onClick={() => handleCarTypeChange('tempo')} className={carType === 'tempo' ? 'bg-violet-200 font-medium max-sm:text-xs text-sm text-violet-600 px-2 py-1 rounded-lg' : 'font-medium max-sm:text-xs text-sm text-violet-500 mx-2'}>Tempo Traveller</button>
        <button onClick={() => handleCarTypeChange('coach')} className={carType === 'coach' ? 'bg-violet-200 font-medium max-sm:text-xs text-sm text-violet-600 px-2 py-1 rounded-lg' : 'font-medium max-sm:text-xs text-sm text-violet-500 mx-2'}>Coaches</button>
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
        modules={[Pagination, FreeMode]}
        className="mt-10 h-full w-full"
      >
        {carList.map((car, index) => (
          <SwiperSlide key={index} className=''>
            <div className='flex flex-col p-10 mb-14 hover:border hover:border-gray-200 cursor-pointer duration-200 transition-all'>
              <img src={car.image} alt='' className='object-cover aspect-[2/1] p-5' />
              <p className='text-violet-500'>{car.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className='mt-4 block'>
        <a href='https://eldercabs.com' rel='noreferrer' target='_blank' className='bg-transparent block border-2 border-black px-5 py-2 font-normal duration-300 hover:bg-black hover:text-[#f2f2f2]'>Book Now</a>
      </div> */}
    </div >

  )
}

export default Fleet