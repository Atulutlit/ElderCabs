import React from "react";
import "./PopularPlace.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide1 from "../../../assets/img/packages/slide2.png";
import slide2 from "../../../assets/img/packages/slide2.png";
import slide3 from "../../../assets/img/packages/slide2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const PopularPlace = () => {
  const slider = [
    {
      bgimg: slide1,
      name: "Juhu",
      content: "Maharashtra",
    },
    {
      bgimg: slide2,
      name: "Colva Beach",
      content: "Goa",
    },
    {
      bgimg: slide3,
      name: "Porbandar Beach",
      content: "Gujarat",
    },
    {
      bgimg: slide2,
      name: "Colva Beach",
      content: "Goa",
    },
  ];
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // arrows:true
  };
  return (
    <div className="PopularPlace_container flex justify-center items-start lg:my-10 md:my-10 mt-10  h-full  ">
      <div className="flex justify-center items-center flex-col  w-11/12 flex-wrap">
        <div className="flex justify-between items-center w-10/12 flex-wrap">
          <div
            className="lg:text-4xl text-3xl font-semibold		"
            style={{ color: "#20284F" }}
          >
            Popular Place
          </div>
        </div>
        <div className="flex justify-center items-center lg:w-11/12 w-full lg:my-14 my-1">
          <Slider
            {...settings}
            className="flex justify-between items-center lg:w-11/12 w-full mb-5 md:mb-0"
          >
            {slider.map((slide, index) => (
              <div className="w-full lg:w-4/6 h-[480px] md:h-[400px] " key={index}>
                <div
                  className=" shadow-xl w-11/12 px-1 flex justify-center items-center flex-col h-[400px] md:h-[375px]"
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={slide.bgimg}
                    className=" w-[93%]  "
                    style={{
                      borderRadius: "10px 10px 0px 0px ",
                    }}
                    alt="img"
                  />
                  <div
                    className="text-left w-[93%]   px-2  py-5 flex justify-center  flex-col"
                    style={{
                      borderRadius: "0px 0px 10px 10px",
                    }}
                  >
                    <p className="font-black text-xl">{slide.name}</p>
                    <p style={{ color: "#787878" }} className="text-sm ">
                      {slide.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
