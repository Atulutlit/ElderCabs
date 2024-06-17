import React, { useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./AllHotels.css";
import search from "../../../assets/img/allPackages/search.png";
import img from "../../../assets/img/allPackages/header.png";

import location from "../../../assets/img/allPackages/location.png";
import yellowStar from "../../../assets/img/hotels/star.png";
import popImg from "../../../assets/img/popup/popImg.png";
import walk from "../../../assets/img/popup/walk.png";
import hotel from "../../../assets/img/popup/hotel.png";
import car from "../../../assets/img/popup/car.png";
import { Link } from "react-router-dom";

// import './Pop'
// import { Box, Modal, Typography } from "@mui/material";
export const AllHotels = () => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 720,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    // backgroundColor:"red",
    boxShadow: 24,
    borderRadius: "10px  ",
    p: 2,
  };
  const hotels_overlay = {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.331)",
  };
  // const [open, setOpen] = useState(true);

  const clearSelection = (name) => {
    const radioBtns = document.querySelectorAll(
      "input[type='radio'][name='" + name + "']"
    );
    radioBtns.forEach((radioBtn) => {
      if (radioBtn.checked === true) radioBtn.checked = false;
    });
  };
  const [Open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="PopularPlace_container flex justify-center items-start	 lg:my-10 md:my-10 mt-10  h-full   ">
      <Modal
        open={Open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center items-center lg:flex-nowrap flex-wrap lg:w-full w-[230px]">
            {/* LEFT SIDE */}
            <div className="mr-4 lg:w-9/12 w-full ">
              <div className="relative ">
                <img
                  src={popImg}
                  className="rounded-xl lg:w-[900px] w-[400px] lg:h-[250px] object-cover opacity-100"
                />
                <div
                  style={hotels_overlay}
                  className="absolute top-0 h-full w-full rounded-xl"
                ></div>
              </div>
              <div className="flex justify-between items-start   lg:my-3 ">
                <div>
                  <p className="lg:text-xl lg:my-2 text-base my-1 tracking-wider font-semibold ">
                    UDAIPUR
                  </p>
                  <p className="lg:text-base text-xs text-[#069BCA] my-2 tracking-wider	">
                    CITY PALACE
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <img src={yellowStar} className="mx-1.5 h-[17px]" />
                  <p className="text-lg ">4.9</p>
                </div>
              </div>
              <div className="flex justify-between items-center  ">
                <div className="flex justify-between items-center flex-col  w-full">
                  <div className="flex justify-center items-center   w-full h-full ">
                    <div className="text-left  w-full ">
                      <p className="text-xs tracking-wide	 uppercase		">
                        Departure/Return location{" "}
                      </p>
                    </div>
                    <div className="text-left  w-full ">
                      <p className="text-[#787878] text-xs tracking-wider	">
                        San Airport
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-start my-2   w-full h-full ">
                    <div className="text-left  w-full ">
                      <p className="text-xs tracking-wide		uppercase	">
                        Departure Time{" "}
                      </p>
                    </div>
                    <div className="text-left  w-full ">
                      <p className="text-[#787878] text-xs tracking-wider	">
                        Please arrive at least 2 hours before the flight
                      </p>{" "}
                    </div>
                  </div>
                </div>
                {/* <div className="flex justify-between items-center bg-green-800 w-full ">
                 
                </div> */}
              </div>
            </div>
            {/* RIGHT SIDE */}
            <div className=" lg:w-7/12 w-full h-full lg:ml-7 ml-2">
              <div className=" h-full lg:py-3 w-10/12">
                <p className="lg:text-xl text-base lg:mb-2 font-semibold">
                  Trip details:
                </p>
                <p className="text-[#787878] lg:mb-2 lg:text-base text-xs">
                  3Days & 4Night road trip
                </p>
                <p className="font-semibold lg:text-sm text-xs">$88 - $99</p>
                <div className="flex justify-between items-center lg:mt-5 mt-2  lg:w-10/12 w-full">
                  <div className="flex justify-center items-center flex-col">
                    <img src={hotel} className="lg:h-[15px] h-[10px]" />
                    <p className="text-xs text-[#787878]">1 Hotel</p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <img src={car} className="lg:h-[15px] h-[10px]" />
                    <p className="text-xs text-[#787878]">2 Transfers</p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <img src={walk} className="lg:h-[15px] h-[10px]" />
                    <p className="text-xs text-[#787878]">4 Activities</p>
                  </div>
                </div>
                <div className="lg:mt-3.5 mt-1">
                  <ul style={{ listStyleType: "square" }}>
                    <li className="text-xs text-[#787878] my-1">
                      Tour combo with return airport transfer
                    </li>
                    <li className="text-xs text-[#787878] my-1">City Tour</li>
                    <li className="text-xs text-[#787878] my-1">
                      Curious Corner
                    </li>
                  </ul>
                </div>
                <div className="lg:mt-3 mt-1">
                  <p className="text-[#787878] lg:text-sm text-xs">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
                <div>
                  <Link to="/bookings">
                    <button className="TopPlace_button px-2.5 py-1 lg:text-lg text-sm font-medium	  lg:my-7 mt-2 ">
                      Book Now
                    </button>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="flex justify-center items-center flex-col  w-11/12 flex-wrap ">
        <div className="flex lg:justify-end justify-center items-center w-10/12 flex-wrap">
          <form className="PackagesYouGet_form">
            <div className="flex justify-center items-center shadow-xl lg:px-3 lg:py-1 py-1 px-3">
              <img
                src={search}
                className="ml-5 mr-2"
                style={{ height: "24px" }}
                alt="search"
              />
              <input
                placeholder="Search for hotels"
                className=" lg:px-2 lg:py-2 py-1 px-2  lg:w-72 w-60	    lg:my-0 my-2"
              />
            </div>
          </form>
        </div>
        <div
          className="flex justify-center items-start  	lg:flex-nowrap flex-wrap w-10/12 	mt-10 "
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          {/* <div
          className="lg:grid sm:flex sm:justify-center sm:items-center sm:flex-wrap	 w-10/12  gap-x-10	mt-10 bg-blue-700"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        > */}
          {/* Left Side */}
          <div
            className=" flex justify-center lg:items-start items-center flex-col flex-wrap my-2 py-5 px-8 h-full  shadow-xl "
            style={{ borderRadius: "10px" }}
          >
            <div className=" flex justify-center items-start flex-col flex-wrap w-full">
              <div
                style={{ borderBottom: "2px solid #C0C0C0" }}
                className="py-3 px-10"
              >
                <h1 className="lg:text-xl font-bold  ">Filter by Cities</h1>
              </div>
              <div className="my-4">
                <div className="my_radio mb-2">
                  <input
                    type="radio"
                    value="Packages"
                    name="Packages"
                    className="mr-1"
                  />
                  <label className=" ">Delhi</label>
                </div>
                <div className="my_radio mb-2">
                  <input
                    type="radio"
                    value="Packages"
                    name="Packages"
                    // className="mr-1"
                  />
                  <label className="">Pune</label>
                </div>
                <div className="my_radio mb-2">
                  <input
                    type="radio"
                    value="Packages"
                    name="Packages"
                    className="mr-1"
                  />
                  <label className="">Hyderabad</label>
                </div>
                <div className="my_radio mb-2">
                  <input
                    type="radio"
                    value="Packages"
                    name="Packages"
                    className="mr-1"
                  />
                  <label className="">Bangalore</label>
                </div>
                <div className="my_radio mb-2">
                  <input
                    type="radio"
                    value="Packages"
                    name="Packages"
                    className="mr-1"
                  />
                  <label className="">Jaipur</label>
                </div>
                <div className="my_radio mb-2">
                  <input
                    type="radio"
                    value="Packages"
                    name="Packages"
                    className="mr-1"
                  />
                  <label className="">Mumbai</label>
                </div>
                <div className="my_radio mb-2">
                  <input
                    type="radio"
                    value="Packages"
                    name="Packages"
                    className="mr-1"
                  />
                  <label className="">Chennai</label>
                </div>
                <div className="my_radio mb-2">
                  <input
                    type="radio"
                    value="Packages"
                    name="Packages"
                    className="mr-1"
                  />
                  <label className="  ">Ahmedabad</label>
                </div>
              </div>
              <button
                type="button"
                onClick={() => clearSelection("Packages")}
                className="PackagesYouGet_button px-2 py-1 text-base font-medium"
              >
                Clear Selection
              </button>
            </div>
          </div>
          {/* Right Side */}

          {/* Card Container */}
          <div className="flex justify-center items-center flex-col 	 h-full w-full lg:ml-10 ml-0">
            {/* Card */}
            <div className="flex justify-center items-center  flex-col flex-wrap w-full my-2">
              <div className=" lg:h-[320px] h-full  lg:my-0 my-5">
                <div
                  className=" shadow-xl lg:w-11/12 w-full px-5 py-3 flex justify-center items-center h-full   lg:flex-nowrap flex-wrap  "
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={img}
                    className=" lg:w-[30%] w-[50%]  lg:h-[70%] h-[40%] object-cover selectDisable"
                    draggable="false"
                    style={{
                      borderRadius: "10px 10px 10px 10px ",
                    }}
                    alt="img"
                  />
                  <div className="lg:ml-3 ml-0 lg:text-left text-center w-[100%]   px-2  lg:py-5 py-0 flex justify-center  flex-col lg:h-full  lg:mt-0 mt-3 ">
                    <div className="flex lg:justify-between md:justify-between justify-center  lg:items-start items-center flex-wrap ">
                      <div>
                        <div className="flex justify-center items-center flex-wrap">
                          <p
                            className=" lg:text-xl text-base font-bold"
                            style={{ color: "#20284F" }}
                          >
                            {" "}
                            Jaipur Hawamahal Hotel{" "}
                          </p>
                          <div className="bg-[#0E6A87] rounded-3xl		flex justify-center items-center py-1 px-2 ml-1">
                            <p className="text-white mr-1 lg:text-xs text-sm">
                              4.5
                            </p>
                            <img src={yellowStar} style={{ height: "10px" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex lg:justify-start md:justify-start justify-center items-center mt-1 ">
                            <img src={location} />
                            <p className="lg:ml-2 ml-0.5 text-[#787878] font-thin lg:text-base text-sm">
                              M.I. Road, Jaipur
                            </p>
                          </div>
                          <p className="text-[#787878] lg:ml-4 ml-1 lg:text-base text-sm">
                            (1.2km from centre)
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-2xl text-[#787878]   ">
                          $3247/<span className="text-sm ">night</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:justify-between md:justify-between justify-center items-center flex-wrap my-3     ">
                      <div className="lg:w-9/12 text-[#787878] lg:text-base text-sm ">
                        Norem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis. Class aptent taciti sociosqu ad litora torquent
                        per conubia nostra, per inceptos himenaeos.
                      </div>
                      <div className="lg:w-3/12 lg:text-right">
                        <button
                          onClick={handleOpen}
                          className="BestChoice_button px-3.5 py-2 text-base font-bold text-black   "
                        >
                          Book Now{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center  flex-col flex-wrap w-full my-2">
              <div className=" lg:h-[320px] h-full  lg:my-0 my-5">
                <div
                  className=" shadow-xl lg:w-11/12 w-full px-5 py-3 flex justify-center items-center h-full   lg:flex-nowrap flex-wrap  "
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={img}
                    className=" lg:w-[30%] w-[50%]  lg:h-[70%] h-[40%] object-cover selectDisable"
                    draggable="false"
                    style={{
                      borderRadius: "10px 10px 10px 10px ",
                    }}
                    alt="img"
                  />
                  <div className="lg:ml-3 ml-0 lg:text-left text-center w-[100%]   px-2  lg:py-5 py-0 flex justify-center  flex-col lg:h-full  lg:mt-0 mt-3 ">
                    <div className="flex lg:justify-between md:justify-between justify-center  lg:items-start items-center flex-wrap ">
                      <div>
                        <div className="flex justify-center items-center flex-wrap">
                          <p
                            className=" lg:text-xl text-base font-bold"
                            style={{ color: "#20284F" }}
                          >
                            {" "}
                            Jaipur Hawamahal Hotel{" "}
                          </p>
                          <div className="bg-[#0E6A87] rounded-3xl		flex justify-center items-center py-1 px-2 ml-1">
                            <p className="text-white mr-1 lg:text-xs text-sm">
                              4.5
                            </p>
                            <img src={yellowStar} style={{ height: "10px" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex lg:justify-start md:justify-start justify-center items-center mt-1 ">
                            <img src={location} />
                            <p className="lg:ml-2 ml-0.5 text-[#787878] font-thin lg:text-base text-sm">
                              M.I. Road, Jaipur
                            </p>
                          </div>
                          <p className="text-[#787878] lg:ml-4 ml-1 lg:text-base text-sm">
                            (1.2km from centre)
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-2xl text-[#787878]   ">
                          $3247/<span className="text-sm ">night</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:justify-between md:justify-between justify-center items-center flex-wrap my-3     ">
                      <div className="lg:w-9/12 text-[#787878] lg:text-base text-sm ">
                        Norem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis. Class aptent taciti sociosqu ad litora torquent
                        per conubia nostra, per inceptos himenaeos.
                      </div>
                      <div className="lg:w-3/12 lg:text-right">
                        <button
                          onClick={handleOpen}
                          className="BestChoice_button px-3.5 py-2 text-base font-bold text-black   "
                        >
                          Book Now{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center  flex-col flex-wrap w-full my-2">
              <div className=" lg:h-[320px] h-full  lg:my-0 my-5">
                <div
                  className=" shadow-xl lg:w-11/12 w-full px-5 py-3 flex justify-center items-center h-full   lg:flex-nowrap flex-wrap  "
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={img}
                    className=" lg:w-[30%] w-[50%]  lg:h-[70%] h-[40%] object-cover selectDisable"
                    draggable="false"
                    style={{
                      borderRadius: "10px 10px 10px 10px ",
                    }}
                    alt="img"
                  />
                  <div className="lg:ml-3 ml-0 lg:text-left text-center w-[100%]   px-2  lg:py-5 py-0 flex justify-center  flex-col lg:h-full  lg:mt-0 mt-3 ">
                    <div className="flex lg:justify-between md:justify-between justify-center  lg:items-start items-center flex-wrap ">
                      <div>
                        <div className="flex justify-center items-center flex-wrap">
                          <p
                            className=" lg:text-xl text-base font-bold"
                            style={{ color: "#20284F" }}
                          >
                            {" "}
                            Jaipur Hawamahal Hotel{" "}
                          </p>
                          <div className="bg-[#0E6A87] rounded-3xl		flex justify-center items-center py-1 px-2 ml-1">
                            <p className="text-white mr-1 lg:text-xs text-sm">
                              4.5
                            </p>
                            <img src={yellowStar} style={{ height: "10px" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex lg:justify-start md:justify-start justify-center items-center mt-1 ">
                            <img src={location} />
                            <p className="lg:ml-2 ml-0.5 text-[#787878] font-thin lg:text-base text-sm">
                              M.I. Road, Jaipur
                            </p>
                          </div>
                          <p className="text-[#787878] lg:ml-4 ml-1 lg:text-base text-sm">
                            (1.2km from centre)
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-2xl text-[#787878]   ">
                          $3247/<span className="text-sm ">night</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:justify-between md:justify-between justify-center items-center flex-wrap my-3     ">
                      <div className="lg:w-9/12 text-[#787878] lg:text-base text-sm ">
                        Norem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis. Class aptent taciti sociosqu ad litora torquent
                        per conubia nostra, per inceptos himenaeos.
                      </div>
                      <div className="lg:w-3/12 lg:text-right">
                        <button
                          onClick={handleOpen}
                          className="BestChoice_button px-3.5 py-2 text-base font-bold text-black   "
                        >
                          Book Now{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center  flex-col flex-wrap w-full my-2">
              <div className=" lg:h-[320px] h-full  lg:my-0 my-5">
                <div
                  className=" shadow-xl lg:w-11/12 w-full px-5 py-3 flex justify-center items-center h-full   lg:flex-nowrap flex-wrap  "
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={img}
                    className=" lg:w-[30%] w-[50%]  lg:h-[70%] h-[40%] object-cover selectDisable"
                    draggable="false"
                    style={{
                      borderRadius: "10px 10px 10px 10px ",
                    }}
                    alt="img"
                  />
                  <div className="lg:ml-3 ml-0 lg:text-left text-center w-[100%]   px-2  lg:py-5 py-0 flex justify-center  flex-col lg:h-full  lg:mt-0 mt-3 ">
                    <div className="flex lg:justify-between md:justify-between justify-center  lg:items-start items-center flex-wrap ">
                      <div>
                        <div className="flex justify-center items-center flex-wrap">
                          <p
                            className=" lg:text-xl text-base font-bold"
                            style={{ color: "#20284F" }}
                          >
                            {" "}
                            Jaipur Hawamahal Hotel{" "}
                          </p>
                          <div className="bg-[#0E6A87] rounded-3xl		flex justify-center items-center py-1 px-2 ml-1">
                            <p className="text-white mr-1 lg:text-xs text-sm">
                              4.5
                            </p>
                            <img src={yellowStar} style={{ height: "10px" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex lg:justify-start md:justify-start justify-center items-center mt-1 ">
                            <img src={location} />
                            <p className="lg:ml-2 ml-0.5 text-[#787878] font-thin lg:text-base text-sm">
                              M.I. Road, Jaipur
                            </p>
                          </div>
                          <p className="text-[#787878] lg:ml-4 ml-1 lg:text-base text-sm">
                            (1.2km from centre)
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-2xl text-[#787878]   ">
                          $3247/<span className="text-sm ">night</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:justify-between md:justify-between justify-center items-center flex-wrap my-3     ">
                      <div className="lg:w-9/12 text-[#787878] lg:text-base text-sm ">
                        Norem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis. Class aptent taciti sociosqu ad litora torquent
                        per conubia nostra, per inceptos himenaeos.
                      </div>
                      <div className="lg:w-3/12 lg:text-right">
                        <button
                          onClick={handleOpen}
                          className="BestChoice_button px-3.5 py-2 text-base font-bold text-black   "
                        >
                          Book Now{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center  flex-col flex-wrap w-full my-2">
              <div className=" lg:h-[320px] h-full  lg:my-0 my-5">
                <div
                  className=" shadow-xl lg:w-11/12 w-full px-5 py-3 flex justify-center items-center h-full   lg:flex-nowrap flex-wrap  "
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={img}
                    className=" lg:w-[30%] w-[50%]  lg:h-[70%] h-[40%] object-cover selectDisable"
                    draggable="false"
                    style={{
                      borderRadius: "10px 10px 10px 10px ",
                    }}
                    alt="img"
                  />
                  <div className="lg:ml-3 ml-0 lg:text-left text-center w-[100%]   px-2  lg:py-5 py-0 flex justify-center  flex-col lg:h-full  lg:mt-0 mt-3 ">
                    <div className="flex lg:justify-between md:justify-between justify-center  lg:items-start items-center flex-wrap ">
                      <div>
                        <div className="flex justify-center items-center flex-wrap">
                          <p
                            className=" lg:text-xl text-base font-bold"
                            style={{ color: "#20284F" }}
                          >
                            {" "}
                            Jaipur Hawamahal Hotel{" "}
                          </p>
                          <div className="bg-[#0E6A87] rounded-3xl		flex justify-center items-center py-1 px-2 ml-1">
                            <p className="text-white mr-1 lg:text-xs text-sm">
                              4.5
                            </p>
                            <img src={yellowStar} style={{ height: "10px" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex lg:justify-start md:justify-start justify-center items-center mt-1 ">
                            <img src={location} />
                            <p className="lg:ml-2 ml-0.5 text-[#787878] font-thin lg:text-base text-sm">
                              M.I. Road, Jaipur
                            </p>
                          </div>
                          <p className="text-[#787878] lg:ml-4 ml-1 lg:text-base text-sm">
                            (1.2km from centre)
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-2xl text-[#787878]   ">
                          $3247/<span className="text-sm ">night</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:justify-between md:justify-between justify-center items-center flex-wrap my-3     ">
                      <div className="lg:w-9/12 text-[#787878] lg:text-base text-sm ">
                        Norem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis. Class aptent taciti sociosqu ad litora torquent
                        per conubia nostra, per inceptos himenaeos.
                      </div>
                      <div className="lg:w-3/12 lg:text-right">
                        <button
                          onClick={handleOpen}
                          className="BestChoice_button px-3.5 py-2 text-base font-bold text-black   "
                        >
                          Book Now{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex justify-center items-center  flex-col flex-wrap w-full my-2">
              <div className=" lg:h-[320px] h-full  lg:my-0 my-5">
                <div
                  className=" shadow-xl lg:w-11/12 w-full px-5 py-3 flex justify-center items-center h-full   lg:flex-nowrap flex-wrap  "
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={img}
                    className=" lg:w-[30%] w-[50%]  lg:h-[70%] h-[40%] object-cover selectDisable"
                    draggable="false"
                    style={{
                      borderRadius: "10px 10px 10px 10px ",
                    }}
                    alt="img"
                  />
                  <div className="lg:ml-3 ml-0 lg:text-left text-center w-[100%]   px-2  lg:py-5 py-0 flex justify-center  flex-col lg:h-full ">
                    <div className="flex justify-between  items-start">
                      <div>
                        <p
                          className=" lg:text-2xl text-base font-bold"
                          style={{ color: "#20284F" }}
                        >
                          {" "}
                          Jaipur Hawamahal Hotel{" "}
                        </p>
                        <div>
                          <div className="flex justify-start items-center ">
                            <img src={location} />
                            <p className="ml-2 text-[#787878] font-thin lg:text-base text-sm">
                              M.I. Road, Jaipur
                            </p>
                          </div>
                          <p className="text-[#787878] ml-4 lg:text-base text-sm">
                            (1.2km from centre)
                          </p>
                        </div>
                      </div>
                      <div className="bg-[#0E6A87] rounded-3xl		flex justify-center items-center py-1 px-2">
                        <p className="text-white mr-1 lg:text-base text-sm">
                          4.5
                        </p>
                        <img src={yellowStar} style={{ height: "15px" }} />
                      </div>
                    </div>
                    <div className="flex lg:justify-between justify-center items-center flex-wrap my-3     ">
                      <div className="lg:w-9/12 text-[#787878] lg:text-base text-sm ">
                        Norem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis. Class aptent taciti sociosqu ad litora torquent
                        per conubia nostra, per inceptos himenaeos.
                      </div>
                      <div className="lg:w-3/12 lg:text-right">
                        <p className="font-bold text-3xl text-black  lg:my-4 my-2 ">
                          $3247
                        </p>
                        <button
                          onClick={handleOpen}
                          className="BestChoice_button px-3.5 py-1.5 text-base font-thin text-black   "
                        >
                          Book Now{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            
          </div>
        </div>
      </div>
    </div>
  );
};
