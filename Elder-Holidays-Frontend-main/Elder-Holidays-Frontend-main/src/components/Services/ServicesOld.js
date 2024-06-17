import React from 'react';
import sectionHeading from '../../utility/sectionHeading';
import hotel from "../../assets/img/services/icon-1.png"
import rental from "../../assets/img/services/icon-1.png"
import guide from "../../assets/img/services/icon-1.png"
const Services = () => {
    const SectionHeading = sectionHeading("Our Services", "We help our clients throughout the trip")
    return (
        <div className='lg:px-[100px] md:px-[50px] px-8'>
        {
            SectionHeading
        }
        <div className="flex md:flex-row flex-col justify-center text-left gap-5">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm hover:scale-110 ease-in-out duration-500">
                <img src={hotel} alt="hotel" />
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 pt-5 pb-3">Hotel</h5>
                <p className="text-gray-700 text-base mb-4">
                Get attractive discounts of up to 25% just for you, our beloved customers
                </p>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm  hover:scale-110 ease-in-out duration-500">
                <img src={rental} alt="hotel" />
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 pt-5 pb-3">Rental</h5>
                <p className="text-gray-700 text-base mb-4">
                Get attractive discounts of up to 25% just for you, our beloved customers
                </p>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm  hover:scale-110 ease-in-out duration-500">
                <img src={guide} alt="hotel" />
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 pt-5 pb-3">Best Guider</h5>
                <p className="text-gray-700 text-base mb-4">
                Get attractive discounts of up to 25% just for you, our beloved customers
                </p>
            </div>
        </div>
     </div>
    );
};

export default Services;