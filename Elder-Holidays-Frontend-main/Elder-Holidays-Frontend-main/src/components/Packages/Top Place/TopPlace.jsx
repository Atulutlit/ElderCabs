import React, { useRef } from "react";
import "./TopPlace.css";
import img1 from "../../../assets/img/packages/topPlace1.png";
import img2 from "../../../assets/img/packages/topPlace2.png";
import img3 from "../../../assets/img/packages/topPlace3.png";
import img4 from "../../../assets/img/packages/topPlace4.png";
import img5 from "../../../assets/img/packages/topPlace5.png";
import waterBanner from "../../../assets/img/packages/water-banner.png";
import { Link } from "react-router-dom";

export const TopPlace = () => {
  return (
    <div className="PopularPlace_container flex justify-center items-start	 lg:my-10 md:my-10 mt-10  h-full  ">
      <div className="flex justify-center items-center flex-col  w-11/12 flex-wrap">

        <div className="flex justify-between items-center w-10/12 flex-wrap">
          <div
            className="lg:text-4xl text-3xl font-semibold		"
            style={{ color: "#20284F" }}
          >
            Top Place
          </div>
        </div>
        {/* <div className="flex justify-center items-center w-11/12	lg:my-16 md:my-7 mt-7 ">
          <div className="flex justify-center items-center flex-wrap  ">
            <div className="flex justify-center items-center flex-col ">
              <div className="relative">
                <img className=" my-2 mx-4  h-50 " src={img1} />
                <div
                  className="absolute bottom-5 left-10 bg-red-900"
                  style={{ zIndex: "100" }}
                >
                  <p>sas</p>
                  <p>s</p>
                </div>
              </div>
              <div className="relative">
                <img className="my-2 mx-4  h-50 " src={img2} />
                <div
                  className="absolute bottom-5 left-10 bg-red-900"
                  style={{ zIndex: "100" }}
                >
                  <p>sas</p>
                  <p>s</p>
                </div>
              </div>
            </div>
            <div className="	flex justify-center items-center flex-col ">
              <div className="relative">
                <img src={img3} className=" h-50 " />
                <div
                  className="absolute bottom-5 left-10 bg-red-900"
                  style={{ zIndex: "100" }}
                >
                  <p>sas</p>
                  <p>s</p>
                </div>
              </div>
            </div>
            <div className="	flex justify-center items-center flex-col ">
              <div className="relative">
                <img className="my-2 mx-4 h-50  " src={img4} />
                <div
                  className="absolute bottom-5 left-10 bg-red-900"
                  style={{ zIndex: "100" }}
                >
                  <p>sas</p>
                  <p>s</p>
                </div>
              </div>
              <div className="relative">
                <img className=" px-4 h-50  " src={img5} />
                <div
                  className="absolute bottom-5 left-10 bg-red-900"
                  style={{ zIndex: "100" }}
                >
                  <p>sas</p>
                  <p>s</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex justify-center items-center w-full	lg:my-16 md:my-7 mt-7 ">
          <div className="flex justify-center items-center lg:flex-row flex-col">
            <div className="grid1">
              <div className="grid-item">
                <div className="TopPlace_overlay	bottom-5 lg:left-6 left-3">
                  <div className="  text-left">
                    <p className="lg:text-2xl text-base">Manali</p>
                    <p className="lg:text-2xl text-base">Himachal Pradesh</p>
                  </div>
                </div>
                <img
                  src={img1}
                  alt="img"
                  className="selectDisable w-[320px]"
                  //   className="selectDisable lg:h-full h-[270px]"
                  draggable="false"
                />
              </div>
              <div className="grid-item">
                <div className="TopPlace_overlay	bottom-5 lg:left-6 left-3">
                  <div className="  text-left">
                    <p className="lg:text-2xl text-base">Udaipur</p>
                    <p className="lg:text-2xl text-base">Rajesthan</p>
                  </div>
                </div>
                <img
                  src={img2}
                  alt="img"
                  className="selectDisable w-[320px]"
                  draggable="false"
                />
              </div>
            </div>
            <div className="grid2">
              <div className="grid-item">
                <div className="TopPlace_overlay	bottom-5 lg:left-6 left-3">
                  <div className="  text-left">
                    <p className="lg:text-2xl text-base">Agra</p>
                    <p className="lg:text-2xl text-base">Uttar Pradesh</p>
                  </div>
                </div>
                <img
                  src={img3}
                  alt="img"
                  className="selectDisable w-[437px]"
                  draggable="false"
                />
              </div>
            </div>
            <div className="grid3">
              <div className="grid-item">
                <div className="TopPlace_overlay	bottom-5 lg:left-6 left-3">
                  <div className="  text-left">
                    <p className="lg:text-2xl text-base">Agra</p>
                    <p className="lg:text-2xl text-base">Uttar Pradesh</p>
                  </div>
                </div>
                <img
                  src={img4}
                  alt="img"
                  className="selectDisable w-[320px]"
                  draggable="false"
                />
              </div>
              <div className="grid-item">
                <div className="TopPlace_overlay	bottom-5 lg:left-6 left-3">
                  <div className=" text-left">
                    <p className="lg:text-2xl text-base">Agra</p>
                    <p className="lg:text-2xl text-base">Uttar Pradesh</p>
                  </div>
                </div>
                <img
                  src={img5}
                  alt="img"
                  className="selectDisable w-[320px]"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-center items-center w-11/12	lg:my-16 md:my-7 mt-7 ">
          <div className="flex justify-center items-center flex-wrap  ">
            {" "}
            <div className="grid1">
              <div className="grid-item">
                <div className="overlay	">Ice Skating</div>
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
                <div className="overlay">Zip Swing</div>

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
            </div>
          </div>
        </div> */}
        <div className="selectDisable flex justify-center items-center">
          <div className=" relative w-full mx-[15px] flex justify-center items-center flex-col ">
            {/* <div className="waterBanner_overlay text-left absolute flex justify-center items-center flex-col bg-red-900">
                <h2>Heading</h2>
                <p>Para</p>
            </div> */}
            <div
              className="TopPlace_overlay	h-full w-full flex justify-start items-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.432)",
                borderRadius: "15px",
              }}
            >
              <div className=" flex flex-col items-start justify-center lg:px-10 px-3">
                <p className="lg:text-5xl text-sm lg:my-5 my-1 text-left">
                  Plan your trip with <br />
                  travel expert{" "}
                </p>
                <p className="lg:text-2xl text-xs lg:my-5 my-1 text-left">
                  Our professional advisors can craft your perfect itinerary
                </p>
                <div>
                  <a href="#subscribe">
                    <button className="lg:text-xl text-sm font-medium bg-white lg:px-3 lg:py-3 p-1 text-black transition  duration-250 ease-in hover:bg-black hover:text-white lg:rounded-xl rounded-md lg:mb-0 mb-4">Contact Us</button>
                  </a>

                </div>
              </div>
            </div>
            <img alt=""
              src={waterBanner}
              className="lg:h-[350px] w-[100%] h-[150px]"
              style={{ objectFit: "cover", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
