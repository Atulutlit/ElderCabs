import React from "react";
import Revimg from "../../../assets/img/Review/Revimg.png";
import user from "../../../assets/img/Review/user.png";
import stars from "../../../assets/img/Review/stars.png";
import Rating from '@mui/material/Rating';
import "./CardNew.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
export const CardNew = ({ review }) => {
  const { location, name, client_img, location_img, assistance_rating, tour_rating, hotel_rating, total_rating, content, date } = review;
  const API_URL = process.env.REACT_APP_API_URL;
  return (
    <div className="flex justify-center items-center bg-white lg:h-[550px] h-full w-full rounded-xl overflow-hidden">
      <div className="lg:block md:block hidden h-[550px] lg:w-[600px] w-full bg-red-900">
        <LazyLoadImage src={location_img && `${API_URL}/uploads/reviews/${location_img}`} className="lg:block md:block hidden h-full  object-cover" alt="review" />
        {/* asddsa */}
        {/* <div className="rev_image lg:block md:block hidden"></div> */}
      </div>
      <div className="flex justify-center items-center  text-left flex-col h-full lg:w-[650px] w-full px-7 py-5 ">
        <div className="flex lg:justify-between justify-around items-start w-full lg:flex-row flex-col">
          {/* <div className=" bg-green-900 w-full"> */}
          <div className="flex lg:justify-center justify-between items-center text-left lg:mb-5">
            <div className="lg:mr-2 md:mr-2 w-24 h-24 overflow-hidden rounded-full border-2 border-black">
              <LazyLoadImage
                src={`${API_URL}/uploads/reviews/${client_img}`}
                className="w-full h-full object-cover"
                alt="" />
            </div>
            <div className="lg:ml-0 ml-1">
              <p className="lg:text-xl text-lg font-semibold">{name}</p>
              <p
                className="lg:text-xs md:text-sm text-xs"
                style={{ color: "#787878" }}
              >
                Location : {location}
              </p>
            </div>
          </div>
          <div className="text-right mt-2">
            <p className="lg:text-base text-sm" style={{ color: "#787878" }}>
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className=" font-semibold leading-tight lg:mt-1 lg:mb-4 my-0 	lg:text-base text-sm	py-5">
          {content}
        </div>
        <div className="text-left  w-full">
          <p className=" lg:text-lg text-base text-[#787878]">
            Ratings :
          </p>
          <div className="flex justify-between items-center my-2">
            <p className="font-semibold lg:text-xl text-base text-[#787878]">
              Assistance
            </p>
            <div className="flex justify-center items-center">
              <Rating name="read-only" value={parseFloat(assistance_rating?.$numberDecimal)} precision={0.1} readOnly />
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-semibold lg:text-xl text-base text-[#787878]">
              Tour
            </p>
            <div className="flex justify-center items-center">
              <Rating name="read-only" value={parseFloat(tour_rating?.$numberDecimal)} precision={0.1} readOnly />
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-semibold lg:text-xl text-base text-[#787878]">
              Hotel
            </p>
            <div className="flex justify-center items-center">
              <Rating name="read-only" value={parseFloat(hotel_rating?.$numberDecimal)} precision={0.1} readOnly />
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-semibold lg:text-xl text-base text-[#787878]">
              Overall
            </p>
            <div className="flex justify-center items-center">
              <Rating name="read-only" value={parseFloat(total_rating?.$numberDecimal)} precision={0.1} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
