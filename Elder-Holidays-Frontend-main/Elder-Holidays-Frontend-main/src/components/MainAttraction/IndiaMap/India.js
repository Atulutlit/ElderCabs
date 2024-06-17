import React from "react";
import "./india.css";
import img1 from "../../../assets/img/mainAttr/India/india.png";
import { Link } from "react-router-dom";
export const India = () => {
  return (
    <div className="India_cont">
      <Link to="/all-packages">
        <button className="bg-[#66DAFF] hover:bg-[#ffffff] border-2 border-[#66DAFF] font-semibold duration-500 text-black px-10 py-4 rounded-xl  ">
          Explore All Packages{" "}
        </button>{" "}
      </Link>
      <img className="indiaImg selectDisable" draggable="false" src={img1} alt="indiaMap"  />
    </div>
  );
};
