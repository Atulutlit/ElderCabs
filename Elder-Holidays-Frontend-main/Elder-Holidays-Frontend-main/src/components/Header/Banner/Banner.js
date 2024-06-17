import React from "react";
import bg from "../../../assets/img/header/slider_bg.webp";
import "./Banner.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "../../Slider/Slider";
import SlickSlider from "react-slick";

// assets
import img1 from "../../../assets/img/homeBanner/img1.webp";
import img2 from "../../../assets/img/homeBanner/img2.webp";
import img3 from "../../../assets/img/homeBanner/img3.webp";
import img4 from "../../../assets/img/homeBanner/img4.webp";
import img5 from "../../../assets/img/homeBanner/img5.webp";
import img6 from "../../../assets/img/homeBanner/img6.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1300,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    className:
      'w-full h-full homeHeaderSlider overflow-hidden after:content-[""] after:bg-[#00000075] after:absolute after:w-full after:h-full after:top-0 after:left-0',
    arrows: false,
    draggable: false,
    centerPadding: "0px",
  };

  return (
    <>
      <div className="banner-container h-screen relative">
        <SlickSlider {...settings}>
          <div className="w-full lg:h-full h-screen overflow-hidden outline-none">
            <LazyLoadImage
              src={img1}
              className="w-full lg:h-full h-screen object-cover object-top"
              alt="home banner"
            />
          </div>
          <div className="w-full lg:h-full h-screen overflow-hidden outline-none">
            <LazyLoadImage
              src={img2}
              className="w-full lg:h-full h-screen object-cover object-top"
              alt="home banner"
            />
          </div>
          <div className="w-full lg:h-full h-screen overflow-hidden outline-none">
            <LazyLoadImage
              src={img3}
              className="w-full lg:h-full h-screen object-cover object-center"
              alt="home banner"
            />
          </div>
          <div className="w-full lg:h-full h-screen overflow-hidden outline-none">
            <LazyLoadImage
              src={img4}
              className="w-full lg:h-full h-screen object-cover object-center"
              alt="home banner"
            />
          </div>
          <div className="w-full lg:h-full h-screen overflow-hidden outline-none">
            <LazyLoadImage
              src={img5}
              className="w-full lg:h-full h-screen object-cover object-center"
              alt="home banner"
            />
          </div>
          <div className="w-full lg:h-full h-screen overflow-hidden outline-none">
            <LazyLoadImage
              src={img6}
              className="w-full lg:h-full h-screen object-cover object-bottom"
              alt="home banner"
            />
          </div>
        </SlickSlider>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="banner md:px-[100px] px-8 flex justify-between  items-center lg:gap-8 gap-4 py-32 pb-16">
            <div className="banner-left banner-content text-white text-left">
              <h4 className="text-lg">Welcome</h4>
              <h2 className="lg:text-6xl text-2xl font-bold py-3">
                Explore India <br /> with a closer look!
              </h2>
              <p className="py-2">
                Watch the best tours, buy tickets and relax
              </p>
              <Link to="/theme">
                <button className="bg-[#66DAFF] hover:bg-[#ffffff] border-2 border-[#66DAFF] font-semibold duration-200 text-black px-5 py-2 rounded mt-4">
                  See Packages
                </button>
              </Link>
            </div>
            <div className="banner-right social-icons text-white ">
              <a
                href=" https://instagram.com/elderholidays?igshid=OTJlNzQ0NWM="
                rel="noreferrer"
                target="_blank"
                className="hover:text-[#BA347F] duration-500"
              >
                <FaInstagram className="mb-7"> </FaInstagram>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100063723653913"
                rel="noreferrer"
                target="_blank"
                className="hover:text-[#0A81ED] duration-500"
              >
                <FaFacebookF></FaFacebookF>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-[40vh] md:-mt-[30vh] lg:-mt-[35vh]">
        <Slider></Slider>
      </div>
    </>
  );
};

export default Banner;
