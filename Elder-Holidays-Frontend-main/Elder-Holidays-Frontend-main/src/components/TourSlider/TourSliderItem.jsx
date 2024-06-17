import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import PackageModal from '../PackageModal/PackageModal';

const TourSliderItem = ({ packageData }) => {

    const { title, price_range, duration, image } = packageData;
    const API_URL = process.env.REACT_APP_API_URL;
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    return (
        <>
            <div className='overflow-hidden rounded-lg relative cursor-pointer h-[70vw] sm:h-[330px] md:h-[190px] lg:h-[243px] xl:h-[320px] 2xl:h-[360px]'>
                <div className='w-full h-full relative after:content-[""] after:w-full after:h-full after:bg-[#00000050] after:absolute after:top-0 after:left-0'>
                    <LazyLoadImage src={`${API_URL}/uploads/packages/${image}`} alt='Tour Slider' className='w-full h-full object-cover' />
                </div>
                <div className='absolute top-0 left-0 w-full h-full box-border grid place-items-center'>
                    <div className='text-center text-white font-Inter'>
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-normal'>{title}</h1>
                        <h3 className='text-xl lg:text-xl xl:text-2xl lg:mt-3 font-normal'>{duration}</h3>
                    </div>
                </div>
                <div className='absolute bottom-0 left-0 w-full box-border px-2 md:px-4 pb-4 '>
                    <div className='flex justify-between items-end'>
                        <div>
                            <h3 className='font-Inter text-start text-lg lg:text-xl xl:text-2xl text-white font-normal'>{price_range}</h3>
                        </div>
                        <button
                            onClick={() => {
                                setOpen(true);
                                setModalData(packageData);
                            }}
                            className='flex items-center text-white gap-2 font-Inter text-sm'
                        >
                            Read More
                            <svg className='w-6 h-6' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1043_331)">
                                    <path d="M20.215 13.7498L13.51 7.04484L15.2775 5.27734L25 14.9998L15.2775 24.7223L13.51 22.9548L20.215 16.2498H5V13.7498H20.215Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1043_331">
                                        <rect className='w-6 h-6' fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {modalData &&
                <PackageModal
                    Open={open}
                    handleClose={() => {
                        setModalData(null);
                        setOpen(false);
                    }}
                    modalData={modalData}
                />
            }
        </>
    );
}

export default TourSliderItem;
