import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Header/Nav/Nav";
import "./HeaderMainAttr.css";
export const HeaderMainAttr = () => {

  return (
    <div className="containerMain">
      <Nav></Nav>
      <div className="firstCont">
        <div className="firstdata">
          <h1>The happiest country in the world</h1>
        </div>
      </div>
      <div className="cards">
        <div className="card card1">
          <h2>Create unforgettable happy memories?</h2>
          <ul>
            <li>Our team of experienced travel consultants will</li>
            <li>work with you to trailer a tour that meets your</li>
            <li>Specific needs and interests</li>
          </ul>
          <Link to='/'>
            <button className="bg-[#66DAFF] hover:bg-[#4bcff8] hover:text-white font-semibold duration-500 text-black px-5 py-2 rounded mt-4">
              Explore
            </button>
            </Link>
        </div>
        <div className="card card2">
        </div>
        <div className="card card3">
        </div>
      </div>
    </div>
  );
};
