import React from "react";
import header from "../../../assets/img/bookings/bg.png";
import Nav from "../../Header/Nav/Nav";
import "./Header.css";

export const Header = () => {
  return (
    <div
      style={{ backgroundImage: `url(${header})` }}
      className="hotels-container relative "
    >
      <Nav></Nav>
      <div className="hotels_overlay h-screen">
        <div className="banner md:px-[100px] px-8 flex justify-between  items-center lg:gap-8 gap-4 py-32 pb-16 h-full">
          <div className="flex justify-center items-center flex-col  h-full w-full">
            <div>
              <p className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold mt-3 mb-6">
               READY TO START YOUR EXCITING JOURNEY
              </p>
            </div>
            <div>
              <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-2xl font-bold mb-4">Bookings</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
