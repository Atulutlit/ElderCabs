import React from "react";
import bg from "../../assets/img/aboutus/bg.jpg";
import "./Banner.css";
const Banner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="banner-container "
    >
      <div className="banner md:px-[100px] px-8 flex justify-between  items-center lg:gap-8 gap-4 py-32 pb-16">
        <div className="banner-left banner-content text-white text-left"></div>
      </div>
    </div>
  );
};

export default Banner;
