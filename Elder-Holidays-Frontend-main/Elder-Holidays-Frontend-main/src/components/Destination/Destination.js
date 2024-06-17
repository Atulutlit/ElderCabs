import React, { useEffect, useState } from "react";
// import sectionHeading from "../../utility/sectionHeading";
import destination from "../../assets/img/destination/destination.png";
import Rating from '@mui/material/Rating';
import { FaMapMarkerAlt } from "react-icons/fa";
// import Star from "./Star";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
import { useQuery } from 'react-query';
import PackageModal from "../PackageModal/PackageModal";
import { LazyLoadImage } from "react-lazy-load-image-component";


const Destination = () => {

  const [Open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const prevRef = React.useRef();
  const nextRef = React.useRef();

  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const { data: packages = [], isLoading, } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/package/top-packages`, {
        headers: {
          authorization: `bearer ${API_KEY}`
        }
      });
      const data = await res.json();
      return data;
    }
  });

  return (
    <>
      <div className="lg:px-[100px] md:px-[50px] px-5 z-30" >
        <div className="flex flex-col md:flex-row gap-4 md:gap-3 items-center md:items-end md:justify-between">
          <div>
            <h1 className='text-3xl md:text-4xl text-center md:text-left'>Popular Destinations</h1>
            <p className="text-center md:text-left text-xl md:text-2xl">You can choose any country with good tourism</p>
          </div>
          <div className="flex gap-3 z-50">
            <button ref={prevRef} className='border-2 border-[#66DAFF] disabled:opacity-50 duration-300 hover:bg-[#66DAFF] text-[#66DAFF] hover:text-white w-10 h-10 rounded-full relative overflow-hidden shadow-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button ref={nextRef} className='border-2 border-[#66DAFF] disabled:opacity-50 duration-300 hover:bg-[#66DAFF] text-[#66DAFF] hover:text-white w-10 h-10 rounded-full relative overflow-hidden shadow-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          speed={500}
          onSwiper={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 80,
            }
          }}
        >
          {packages.length > 0 && packages.map((item, index) => (
            <SwiperSlide key={index} className='py-10'>
              <div key={index} className="rounded-lg w-full shadow-lg bg-white snap-start snap-always">
                <div className="h-[70vw] sm:h-[330px] md:h-[190px] lg:h-[243px] xl:h-[240px] 2xl:h-[290px]">
                  <LazyLoadImage
                    src={`${API_URL}/uploads/packages/${item?.image}`}
                    alt='Top Destination'
                    className="rounded-t-lg selectDisable"
                    draggable={false}
                  />
                </div>
                <div className="p-6">
                  <h5 className="text-gray-900 text-lg font-medium mb-2 text-left">
                    {item?.title}
                  </h5>
                  {/* <div className="flex justify-between items-center py-5">
                  <div className="flex gap-1 items-center text-sm whitespace-nowrap">
                    <FaMapMarkerAlt></FaMapMarkerAlt>
                    <p>{item?.location}</p>
                  </div>
                  <Rating name="read-only" value={item?.rating} readOnly />
                </div> */}
                  <div className="flex justify-between	items-center	">
                    <p>
                      PRICE <span className=" text-xl ml-1">{item?.price_range}</span>
                    </p>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setModalData(item);
                      }}
                      className="bg-[#66DAFF] hover:bg-[#ffffff] border-2 border-[#66DAFF] font-semibold duration-500 text-black px-5 py-2 rounded ">
                      DETAIL{" "}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {modalData &&
        <PackageModal
          Open={Open}
          handleClose={() => {
            setModalData(null);
            setOpen(false);
          }}
          modalData={modalData}
        />
      }
    </>
  );
};

export default Destination;
