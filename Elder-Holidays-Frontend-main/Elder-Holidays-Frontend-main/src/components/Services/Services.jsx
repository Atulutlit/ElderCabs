import React from "react";
import img1 from "../../assets/img/services/img1.png";
import img2 from "../../assets/img/services/img2.png";
import img3 from "../../assets/img/services/img3.png";
import img4 from "../../assets/img/services/img4.png";

// import card1 from "../../assets/img/services/card1.png";
// import card2 from "../../assets/img/services/card2.png";
// import card3 from "../../assets/img/services/card3.png";
// import card4 from "../../assets/img/services/card4.png";

import "./Services.css";
const Services = () => {

  const data = [
    { image: img1, title: 'Hotel', content: 'Our hotel booking service provides a wide selection of hotels worldwide. Find the perfect accommodation for your next trip and book with ease. Satisfaction guaranteed.' },
    { image: img2, title: 'Best Guides', content: 'Our guide booking service offers experienced and knowledgeable guides for your next travel adventure. Explore new destinations with confidence and gain unique insights. Satisfaction guaranteed.' },
    { image: img3, title: 'Bus', content: 'Our bus booking service provides easy and affordable transportation options for your travel needs. Choose from a variety of routes and schedules. Book now for a hassle-free journey. Satisfaction guaranteed.' },
    { image: img4, title: 'Rental', content: 'Our rental booking service offers a wide selection of vehicles to suit your travel needs. Book with ease and enjoy the convenience of transportation on your terms. Satisfaction guaranteed.' },
  ];

  return (
    <div className="bg-[#DEF3FF] py-14">
      <div className="lg:w-[1000px] mx-auto px-5 lg:px-0">
        <div className="text-center">
          <h1 className="lg:text-5xl md:text-4xl text-2xl text-[#20284F] font-bold">
            Our Services
          </h1>
          <p className="text-base my-2 text-[#787878]">
            We help our clients throughout the trip
          </p>
        </div>
        <div className="w-full flex justify-center items-center flex-col flex-wrap my-10 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[400px] sm:!max-w-none">
            {data.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-xl p-5 ">
                <div className="text-center">
                  <img
                    src={item?.image}
                    className="w-24 h-auto mx-auto"
                    draggable="false"
                    alt=""
                  />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="lg:text-2xl text-lg font-extrabold">{item?.title}</h3>
                  <p className="text-[#787878] text-center lg:text-base text-sm leading-none font-medium  px-5	text-left">
                    {item?.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
