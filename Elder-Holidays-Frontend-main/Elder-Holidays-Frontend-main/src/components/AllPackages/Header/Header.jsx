import React from "react";
import header from "../../../assets/img/allPackages/header.png";
import icon1 from "../../../assets/img/packages/icon1.png";
import Nav from "../../Header/Nav/Nav";
import "./Header.css";
export const Header = () => {
  return (
    <div
      style={{ backgroundImage: `url(${header})` }}
      className="banner-container relative "
    >
      <Nav></Nav>
      <div className="allPackages_overlay h-screen">
        <div className="banner md:px-[100px] px-8 flex justify-between  items-center lg:gap-8 gap-4 py-32 pb-16 h-full">
          <div className="flex justify-center items-center flex-col  h-full w-full">
            <div>
              <h1 className="lg:text-6xl text-4xl font-bold mb-4">
                Journey to Explore India
              </h1>
            </div>
            <div>
              <p className="lg:text-2xl text-lg font-thin mt-3">
                Be prepared for the Mountains and <br />
                beyond!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
