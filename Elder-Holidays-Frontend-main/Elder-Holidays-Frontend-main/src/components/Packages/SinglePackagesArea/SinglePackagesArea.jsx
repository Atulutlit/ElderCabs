import React, { useState } from 'react';
import Slider from 'react-slick';
import useFetch from '../../../hooks/useFetch';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import style from './style.module.css';

const SinglePackagesArea = ({ data, path, modalHandler }) => {

    const { data: packages = [] } = useFetch(`${path}/${data?.name}`);


    const API_URL = process.env.REACT_APP_API_URL;

    const settings = {
        infinite: packages?.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: packages?.length > 3,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: packages?.length > 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: packages?.length > 1,
                },
            },
        ],
        arrows: false,
    };

    if (Array.isArray(packages) && packages.length <= 0) {
        return <></>;
    }

    return (
        <div className="flex justify-between items-center flex-col w-full flex-wrap bg-inherit" >
            {/* theme or category name */}
            <div className="flex justify-between w-full flex-wrap" >
                <div className="lg:text-4xl text-3xl font-semibold ml-10 lg:ml-40 text-[#20284F]">
                    {data?.name}
                </div>
            </div>

            <div className="flex justify-center items-center w-full lg:w-11/12  lg:mb-14 lg:mt-5 md:my-10 mt-1 mb-10">
                <Slider {...settings} className={`flex justify-between items-center w-11/12 ${style.slide}`} >
                    {Array.isArray(packages) && packages.map((item, index) => (
                        <div className="w-full" key={index}>
                            <div className="rounded-xl shadow-xl px-1 py-3 mx-2 lg:mx-4">
                                <div className="rounded-xl h-[65vw] sm:h-[35vw] md:h-[170px] lg:h-[200px] xl:h-[260px] 2xl:h-[290px] overflow-hidden px-3 pt-3" >
                                    <LazyLoadImage alt="" src={`${API_URL}/uploads/packages/${item?.image}`} className="w-full h-full rounded-xl object-cover" />
                                </div>
                                <div className="text-left px-4  py-5 flex justify-center  flex-col">
                                    <div className="flex justify-between items-center my-2">
                                        <div className="flex justify-between items-center">
                                            <svg className='w-5 h-5' viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0673873 14.1851C0.0611378 15.6017 1.13968 16.6898 2.55633 16.6961L14.2229 16.7476C15.6395 16.7538 16.7276 15.6753 16.7339 14.2586L16.7633 7.59201L0.096797 7.51848L0.0673873 14.1851ZM14.2891 1.7477L12.6224 1.74035L12.6261 0.907023C12.6283 0.407028 12.2964 0.0722273 11.7964 0.0700216C11.2964 0.0678158 10.9616 0.399675 10.9594 0.899671L10.9558 1.733L5.95581 1.71094L5.95948 0.877613C5.96169 0.377618 5.62983 0.0428176 5.12983 0.0406119C4.62984 0.0384062 4.29504 0.370266 4.29283 0.870261L4.28916 1.70359L2.62251 1.69623C1.20585 1.68998 0.117751 2.76853 0.111502 4.18518L0.104149 5.85183L16.7707 5.92536L16.778 4.2587C16.7843 2.84205 15.7057 1.75395 14.2891 1.7477Z" fill="#069BCA" />
                                            </svg>
                                            <p className="lg:pl-1 pl-0 lg:text-xs text-[9px] text-[#787878]">
                                                {item?.duration}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <svg className="w-5 h-5" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.4809 18.644L0.481141 18.5557L0.489964 16.5558L1.48995 16.5602L1.55613 1.56031C1.5573 1.2951 1.66377 1.04121 1.85214 0.854502C2.0405 0.667795 2.29531 0.563561 2.56053 0.564731L16.5604 0.626491C16.8256 0.627661 17.0795 0.734139 17.2662 0.922501C17.4529 1.11086 17.5571 1.36568 17.556 1.63089L17.5339 6.63084L19.5339 6.63967L19.4898 16.6396L20.4898 16.644L20.4809 18.644ZM15.4898 16.6219L17.4898 16.6307L17.5251 8.63083L11.5251 8.60436L11.4899 16.6043L13.4898 16.6131L13.5163 10.6132L15.5163 10.622L15.4898 16.6219ZM15.5339 6.62202L15.5516 2.62206L3.55169 2.56912L3.48993 16.569L9.48988 16.5955L9.53399 6.59555L15.5339 6.62202ZM5.52521 8.57789L7.52519 8.58671L7.51636 10.5867L5.51638 10.5779L5.52521 8.57789ZM5.50756 12.5778L7.50754 12.5867L7.49872 14.5867L5.49874 14.5778L5.50756 12.5778ZM5.54285 4.57793L7.54283 4.58675L7.53401 6.58673L5.53403 6.57791L5.54285 4.57793Z" fill="#069BCA"></path></svg>
                                            <p className="lg:pl-1 pl-0 lg:text-xs text-[9px] text-[#787878]">
                                                {item?.hotel}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 48 48">
                                                <path fill="#069BCA" d="M37.84 12.02A3.007 3.007 0 0 0 35 10H13c-1.31 0-2.43.84-2.84 2.02L6 24v16c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-2h24v2c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V24l-4.16-11.98zM13 32c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm22 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM10 22l3-9h22l3 9H10z" />
                                                <path fill="none" d="M0 0h48v48H0z" />
                                            </svg>
                                            <p className="lg:pl-1 pl-0 lg:text-xs text-[9px] text-[#787878]">
                                                {item?.car}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="font-thin text-lg">
                                            {item?.title}
                                        </h1>
                                    </div>
                                    <div className="flex justify-between items-center pt-5 pb-4 border-b-[3px] border-[#C0C0C0]" >
                                        <p className="text-base font-semibold">{item?.price_range}</p>
                                    </div>
                                    <div className=" text-center pt-5">
                                        <button
                                            onClick={() => modalHandler(item)}
                                            className="px-4 py-1.5 text-lg font-normal text-black bg-[#30c8f6] border-2 border-[#30c8f6] duration-300 rounded-lg hover:bg-transparent"
                                        >
                                            See Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default SinglePackagesArea;
