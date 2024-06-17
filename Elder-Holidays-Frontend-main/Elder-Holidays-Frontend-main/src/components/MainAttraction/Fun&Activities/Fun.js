import React from "react";
import "./fun.css";
import img1 from "../../../assets/img/mainAttr/Fun/1.webp";
import img2 from "../../../assets/img/mainAttr/Fun/2.webp";
import img3 from "../../../assets/img/mainAttr/Fun/3.webp";
import img4 from "../../../assets/img/mainAttr/Fun/4.webp";
import img5 from "../../../assets/img/mainAttr/Fun/5.webp";
import img6 from "../../../assets/img/mainAttr/Fun/6.webp";

export const Fun = () => {
  return (
    <div className="Fun_Cont">
      <div className="Fun_part">
        <h2>Fun and Activities</h2>
      </div>
      <div className="grid-container">
        <div className="grid1">
          <div className="grid-item">
            <div className="overlay">Skiing</div>
            <img
              src={img1}
              alt="img"
              className="selectDisable"
              draggable="false"
            />
          </div>
          <div className="grid-item">
            <div className="overlay">Camping</div>
            <img
              src={img4}
              alt="img"
              className="selectDisable"
              draggable="false"
            />
          </div>
        </div>
        <div className="grid2">
          <div className="grid-item">
            <div className="overlay">Paragliding</div>

            <img
              src={img2}
              alt="img"
              className="selectDisable"
              draggable="false"
            />
          </div>
          <div className="grid-item">
            <div className="overlay">Zip Lining </div>

            <img
              src={img5}
              alt="img"
              className="selectDisable"
              draggable="false"
            />
          </div>
        </div>
        <div className="grid3">
          <div className="grid-item">
            <div className="overlay">Rafting</div>

            <img
              src={img3}
              alt="img"
              className="selectDisable"
              draggable="false"
            />
          </div>
          <div className="grid-item">
            <div className="overlay">Photography</div>

            <img
              src={img6}
              alt="img"
              className="selectDisable"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
