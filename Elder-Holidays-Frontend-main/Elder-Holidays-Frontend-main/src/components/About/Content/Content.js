import React from "react";
import "./Content.css";
import img1 from "../../../assets/img/aboutus/img1.jpg";
import img2 from "../../../assets/img/aboutus/img2.jpg";
import img3 from "../../../assets/img/aboutus/img3.jpg";
import svg1 from "../../../assets/img/aboutus/svg1.svg";
import svg2 from "../../../assets/img/aboutus/svg2.svg";
import svg3 from "../../../assets/img/aboutus/svg3.svg";
import { BsArrowRight } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Content = () => {
  return (

    <div className="main_cont">
      <section className="div1">
        <div className="data">
          {/* <div className="numandhead numandhead1"> */}
          {/* <h1>01</h1>
            <p>-- GET STARTED</p> */}
          <img className="svgImg selectDisable" draggable="false" src={svg1} />
          {/* </div> */}
          <div className="main_data_div">
            <span>
              <h2>What type of traveller are you? </h2>
            </span>
            <p>
              Determining what type of traveller you are can be an important
              tool when planning future vacations. This guide will help you plan
              vacation according to different rating set by various websites
              .What type of traveller are you - novice, moderate, advanced
              moderate, expert, or expert backpacker?
            </p>

          </div>
        </div>
        <div className="imgDiv">
          <LazyLoadImage src={img1} alt="img" className="selectDisable" draggable="false" />
        </div>
      </section>
      <section className="div2">
        <div className="data">
          {/* <div className="numandhead numandhead2"> */}
          {/* <h1>02</h1>
            <p>-- WHERE YOU GO IS THE KEY </p> */}
          <img src={svg2} className="svgImg selectDisable" draggable="false" />
          {/* </div> */}
          <div className="main_data_div">
            <span>
              <h2>Picking the right Destination! </h2>
            </span>
            <p>
              You’ve made the decision you want to travel more this year. You’ve
              realised experiences are more important than possessions and
              you’ve put together a plane to start saving for your next big
              trip.
            </p>
            <p>
              {" "}
              But how are you going to decide where to actually go? Whichever
              situation you’re in, we have a tips to help you choose your travel
              destinations.
            </p>

          </div>
        </div>
        <div className="imgDiv">
          <LazyLoadImage src={img2} alt="img" className="selectDisable" draggable="false" />
        </div>
      </section>
      <section className="div3">
        <div className="data">
          {/* <div className="numandhead numandhead3"> */}
          {/* <h1>03</h1>
            <p>-- KNOW THE COUNTRY</p> */}
          <img src={svg3} className="svgImg selectDisable" draggable="false" />
          {/* </div> */}
          <div className="main_data_div">
            <span>
              <h2>Understand the Locals and their Traditions </h2>
            </span>
            <p>
              Before you head out, do your research on the different customers
              (the do’s and don’ts)of the country you’re travelling to. For
              instance, what percentage do they typically tip? Are there
              diffrent laws? Are there common tourist scams? Will there be any
              cultural events while you’re there? There are a lot of things you
              might not even think of but it’s simple enough to research “do’s
              and don’ts” infographics on diffrent countries for that
              information.
            </p>

          </div>
        </div>
        <div className="imgDiv">
          <LazyLoadImage src={img3} alt="img" className="selectDisable" draggable="false" />
        </div>
      </section>
    </div>
  );
};
