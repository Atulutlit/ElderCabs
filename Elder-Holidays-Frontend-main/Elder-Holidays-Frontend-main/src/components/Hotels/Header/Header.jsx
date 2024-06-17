import React from "react";
import header from "../../../assets/img/hotels/bg.png";
import icon1 from "../../../assets/img/packages/icon1.png";
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
              <h1 className="lg:text-8xl text-4xl font-black mb-4">HOTELS </h1>
            </div>
            <div>
              <p className="lg:text-3xl text-lg font-thin mt-3">
               OUR SPACE OUR WAYS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
