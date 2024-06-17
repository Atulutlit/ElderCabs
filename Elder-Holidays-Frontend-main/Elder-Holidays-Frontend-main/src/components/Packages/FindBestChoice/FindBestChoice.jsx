import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide1 from "../../../assets/img/packages/TD.png";
import slide2 from "../../../assets/img/packages/TD.png";
import slide3 from "../../../assets/img/packages/TD.png";

import user from "../../../assets/img/packages/user.png";
import calender from "../../../assets/img/packages/calender.png";
import location from "../../../assets/img/packages/location.png";

import star from "../../../assets/img/packages/star.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./FindBestChoice.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import yellowStar from "../../../assets/img/hotels/star.png";
import popImg from "../../../assets/img/popup/popImg.png";
import walk from "../../../assets/img/popup/walk.png";
import hotel from "../../../assets/img/popup/hotel.png";
import car from "../../../assets/img/popup/car.png";
import { Link } from "react-router-dom";
export const FindBestChoice = () => {
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
  const [Open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const slider = [
    {
      bgimg: slide1,
      name: "Juhu",
      content: "Maharashtra",
    },
    {
      bgimg: slide2,
      name: "Colva Beach",
      content: "Goa",
    },
    {
      bgimg: slide3,
      name: "Porbandar Beach",
      content: "Gujarat",
    },
    {
      bgimg: slide2,
      name: "Colva Beach",
      content: "Goa",
    },
  ];
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    arrows: false,
  };
  return (
    <div className="Honeymoon_container flex justify-center items-start  lg:mt-20 md:my-4 mt-10  ">
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
                    <li className="text-xs text-[#787878] my-1">
                      City Tour
                    </li>
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

        {/* <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Deactivate account
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to deactivate your account?
                              All of your data will be permanently removed. This
                              action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                      >
                        Deactivate
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root> */}
      </Modal>
      {/* <div className="TopDestination_container flex justify-center items-center lg:h-[70vh]  md:h[60vh] h-[80vh]  lg:my-0 md:my-4 mt-1 bg-red-800 "> */}
      <div className="flex justify-between items-center flex-col  w-11/12 flex-wrap bg-inherit">
        <div className="flex justify-between  w-10/12 flex-wrap">
          <div
            className="lg:text-4xl text-3xl font-semibold		"
            style={{ color: "#20284F" }}
          >
            Find Best Choice For You{" "}
          </div>
        </div>
        <div className="flex justify-center items-center w-full lg:w-11/12  lg:my-14 md:my-10 mt-1 ">
          <Slider
            {...settings}
            className="flex justify-between items-center w-full lg:w-11/12"
          >
            {slider.map((slide, index) => (
              <div className=" w-4/6 h-[600px]   " key={index}>
                <div
                  className=" shadow-xl w-11/12 px-1 py-3 flex justify-center items-center flex-col h-[500px]"
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  {/* <div className="w-[93%] TopDestination_    h-screen flex justify-center items-center 10px"  style={{
                    borderRadius: "10px",
                  }}> */}
                  <img
                    src={slide.bgimg}
                    className=" w-[93%] "
                    style={{
                      borderRadius: "10px 10px 10px 10px ",
                    }}
                    alt="img"
                  />
                  {/* </div> */}
                  <div className="text-left w-[93%]   px-2  py-5 flex justify-center  flex-col">
                    <div className="flex justify-between items-center my-2">
                      <div className="flex justify-between items-center">
                        <img src={location} />
                        <p
                          className="pl-1 text-xs	"
                          style={{ color: "#787878" }}
                        >
                          Udaipur
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <img src={calender} />
                        <p
                          className="pl-1 text-xs	"
                          style={{ color: "#787878" }}
                        >
                          30 Days
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <img src={user} />
                        <p
                          className="pl-1 text-xs	"
                          style={{ color: "#787878" }}
                        >
                          2 Per person
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-thin		 text-lg">
                        Discover amazing places of the India with us
                      </p>
                    </div>
                    <div
                      className="flex justify-between items-center pt-3 pb-1 "
                      style={{
                        // borderRadius: "0px 0px 10px 10px",
                        paddingBottom: "15px",
                        borderBottom: "3px solid #C0C0C0",
                      }}
                    >
                      <p className="font-thin text-lg flex justify-center items-center">
                        <img src={star} className="pr-1" />
                        <p>4.9</p>
                      </p>
                      <p className="text-base font-semibold	">$880</p>
                    </div>
                    <div className=" text-center pt-5">
                      <button
                        onClick={handleOpen}
                        className="BestChoice_button px-4 py-1.5 text-lg font-thin text-black   "
                      >
                        See Details{" "}
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
