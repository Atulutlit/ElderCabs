import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import yellowStar from "../../assets/img/hotels/star.png";
import walk from "../../assets/img/popup/walk.png";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

const PackageModal = ({ handleClose, Open, modalData }) => {

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

    const { _id, description, image, title, car, hotel, price_range, activities, duration } = modalData;

    const truncateText = (text) => {

        if (text.length > 400) {
            let newText = '';
            newText = text.split('').splice(0, 400).join('');
            return <>{newText}...</>
        } else {
            return text;
        }
    }

    const API_URL = process.env.REACT_APP_API_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        fetch(`${API_URL}/package/click-count/${_id}`, {
            method: 'PATCH',
            headers: {
                authorization: `bearer ${API_KEY}`
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }, [_id]);

    return (
        <>
            <Modal
                open={Open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='!grid !place-items-center !py-5 !overflow-y-auto'
            >
                <Box className='!outline-none !bg-white !rounded-2xl !p-5 md:!w-[700px] max-sm:!px-3 lg:!w-[900px] !w-[95vw]'>
                    <div className="flex border-0 relative justify-center md:items-start flex-col md:flex-row gap-5 md:gap-6">
                        {/* Close Button */}
                        <button className='fixed z-50 bg-white bg-opacity-90 hover:bg-opacity-100 duration-200 text-black w-9 h-9 rounded-full grid place-items-center top-5 right-5' onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* LEFT SIDE */}
                        <div className="md:w-7/12 w-full ">
                            <div className="relative aspect-video">
                                <img
                                    src={`${API_URL}/uploads/packages/${image}`}
                                    className="rounded-xl w-full h-full object-cover opacity-100" alt=""
                                />
                                <div className="absolute top-0 h-full w-full rounded-xl bg-[#00000054]" ></div>
                            </div>
                            <div className="flex justify-between items-start lg:my-3 ">
                                <div>
                                    <p className="lg:text-xl lg:my-1 text-base my-1 tracking-wider font-semibold ">
                                        {title}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center  ">
                                {/* <div className="flex justify-between items-center flex-col  w-full">
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
                                </div> */}
                            </div>
                        </div>
                        {/* RIGHT SIDE */}
                        <div className=" md:w-5/12 w-full h-full">
                            <div className=" h-full lg:py-3 w-full md:w-10/12">
                                <p className="lg:text-xl text-base lg:mb-2 font-semibold">
                                    Trip details:
                                </p>
                                <p className="text-[#787878] lg:mb-2 lg:text-base text-xs">
                                    {duration}
                                </p>
                                <p className="font-semibold lg:text-sm text-xs">{price_range}</p>
                                <div className="flex justify-between items-center lg:mt-5 mt-2 w-full">
                                    <div className="flex justify-center items-center gap-y-2 flex-col">
                                        <svg className='w-5 h-5' viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.4809 18.644L0.481141 18.5557L0.489964 16.5558L1.48995 16.5602L1.55613 1.56031C1.5573 1.2951 1.66377 1.04121 1.85214 0.854502C2.0405 0.667795 2.29531 0.563561 2.56053 0.564731L16.5604 0.626491C16.8256 0.627661 17.0795 0.734139 17.2662 0.922501C17.4529 1.11086 17.5571 1.36568 17.556 1.63089L17.5339 6.63084L19.5339 6.63967L19.4898 16.6396L20.4898 16.644L20.4809 18.644ZM15.4898 16.6219L17.4898 16.6307L17.5251 8.63083L11.5251 8.60436L11.4899 16.6043L13.4898 16.6131L13.5163 10.6132L15.5163 10.622L15.4898 16.6219ZM15.5339 6.62202L15.5516 2.62206L3.55169 2.56912L3.48993 16.569L9.48988 16.5955L9.53399 6.59555L15.5339 6.62202ZM5.52521 8.57789L7.52519 8.58671L7.51636 10.5867L5.51638 10.5779L5.52521 8.57789ZM5.50756 12.5778L7.50754 12.5867L7.49872 14.5867L5.49874 14.5778L5.50756 12.5778ZM5.54285 4.57793L7.54283 4.58675L7.53401 6.58673L5.53403 6.57791L5.54285 4.57793Z" fill="#787878" />
                                        </svg>
                                        <p className="text-xs text-[#787878] text-center">{hotel}</p>
                                    </div>
                                    <div className="flex justify-center items-center gap-y-2 flex-col">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48">
                                            <path fill="#787878" d="M37.84 12.02A3.007 3.007 0 0 0 35 10H13c-1.31 0-2.43.84-2.84 2.02L6 24v16c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-2h24v2c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V24l-4.16-11.98zM13 32c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm22 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM10 22l3-9h22l3 9H10z" />
                                            <path fill="none" d="M0 0h48v48H0z" />
                                        </svg>
                                        <p className="text-xs text-[#787878] text-center">{car}</p>
                                    </div>
                                    <div className="flex justify-center items-center gap-y-2 flex-col">
                                        <img src={walk} className="lg:h-[15px] h-[10px]" />
                                        <p className="text-xs text-[#787878] text-center">{Array.isArray(activities) && activities.length} Activities</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='max-md:mt-4'>
                        <div className="mt-1">
                            <ul style={{ listStyle: "inside square" }} className='space-y-2'>
                                {Array.isArray(activities) &&
                                    activities.map((activity, index) =>
                                        <li className="text-xs text-[#787878] my-1" key={index}>
                                            {activity}
                                        </li>
                                    )}
                            </ul>
                        </div>
                        <div className="mt-3">
                            <p title={description} className="text-[#787878] lg:text-sm text-xs">
                                {truncateText(description)}
                            </p>
                        </div>
                        <div>
                            <Link to={`/bookings/${_id}`}>
                                <button className="TopPlace_button px-7 py-2 lg:text-sm text-sm font-medium mt-4">
                                    Book Now
                                </button>{" "}
                            </Link>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default PackageModal;
