import React from "react";
import "./topAttr.css";
import img1 from "../../../assets/img/mainAttr/topAttr_1.webp";
import img2 from "../../../assets/img/mainAttr/topAttr_2.webp";
import img3 from "../../../assets/img/mainAttr/topAttr_3.webp";
export const TopAttr = () => {
  return (
    <div className="TopAttr_Cont">
      <div className="TopAttr_overview_part">
        <p>An overview of the top attractions</p>
        <h2>Best places to visit in India</h2>
      </div>
      <div className="TopAttr_Cards">
        <div className="TopAttr_Card">
          <div className="TopAttr_Card_img_cont">
            <div className="TopAttr_overlay">Delhi</div>
            <img
              src={img1}
              alt="img"
              className="selectDisable h-full w-full "
              draggable="false"
            />
          </div>
          <div className="TopAttr_h3 mt-3 ">
            <h3>Qutab Minar </h3>
          </div>
        </div>
        <div className="TopAttr_Card">
          <div className="TopAttr_Card_img_cont">
            <div className="TopAttr_overlay">Agra</div>
            <img
              src={img2}
              alt="img"
              className="selectDisable  h-full w-full"
              draggable="false"
            />
          </div>
          <div className="TopAttr_h3 mt-3 ">
            <h3>Taj Mahal </h3>
          </div>
        </div>
        <div className="TopAttr_Card">
          <div className="TopAttr_Card_img_cont">
            <div className="TopAttr_overlay ">Kolkata</div>
            <img
              src={img3}
              alt="img"
              className="selectDisable h-full w-full "
              draggable="false"
            />
          </div>
          <div className="TopAttr_h3 mt-3 ">
            <h3>Howrah bridge </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
