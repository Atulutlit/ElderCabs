import React, { useEffect, useRef, useState } from "react";
import customize from "../../../assets/img/packages/customize.png";
// import waterBanner from "../../../assets/img/packages/water-banner.png";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Customize.css";
import TextField from '@mui/material/TextField';
import { Email } from "@mui/icons-material";
import { Controller, useForm } from 'react-hook-form';
import useMail from "../../../hooks/useMail";

export const Customize = ({ setCustomizeForm }) => {

  const sourceOptions = ["Select Source", "Delhi", 'New Delhi', 'Ghaziabad', 'Noida'];
  const destinations = ["Select Destination", "Delhi", 'New Delhi', 'Ghaziabad', 'Noida'];
  const hotelOptions = ["Select Hotel", "one", "two", "three"];

  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, control } = useForm();

  const navigate = useNavigate();
  const [mail] = useMail();

  const submitHandler = async (data) => {

    const startDate = new Date(data.startDate).getTime();
    const endDate = new Date(data.endDate).getTime();
    const num_days = ((endDate - startDate) / 86400000) + 1;

    let customizeData = { ...data };
    customizeData.num_days = num_days;

    try {
      // use custom mail hook
      await mail('/mail/custom', customizeData);
      reset();
      setSuccessMsg('Your customize package request has been sent successfully!');

    } catch (err) {
      setErrorMsg('Sorry! Something went wrong. Please try again');
      console.error(err);
    }

  }

  const navigateAllPackage = () => {
    const html = document.querySelector('html');
    html.style.overflowY = 'auto';
    navigate('/all-packages');
  }

  useEffect(() => {
    setTimeout(() => {
      setSuccessMsg(null);
      setErrorMsg(null);
    }, 5000);
  }, [successMsg]);

  return (
    <div
      className="PopularPlace_container flex justify-center items-start h-screen fixed top-0 left-0 z-50 overflow-y-auto scroll-smooth"
      style={{
        backgroundImage: `url(${customize})`,
        backgroundPosition: "center center",
      }}>
      <button onClick={() => setCustomizeForm(false)} className="absolute md:top-4 md:right-8 top-2 text-white w-12 h-12 rounded-full md:bg-transparent bg-[#ffffff50] hover:bg-[#ffffff50] grid place-items-center duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 md:w-9 h-8 md:h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex justify-center items-center flex-col flex-wrap w-full md:w-10/12 lg:w-8/12">
        {/* <button className="TopPlace_button px-6 py-2 text-base font-medium my-7 " onClick={navigateAllPackage}>
          Explore All Package
        </button> */}
        <div
          className="w-full flex justify-center items-center px-5 flex-col flex-wrap my-14 rounded-xl"
        >
          <div className="h-full rounded-xl w-full">
            <p className="w-full text-center text-[#FFFFFF] lg:text-4xl text-3xl font-black lg:my-5 mt-2 tracking-wider	">
              Customize your Package
            </p>
            <form onSubmit={handleSubmit(submitHandler)} className="w-full mt-3 py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 w-full px-5 sm:px-0">
                {/* lg:w-[330px] md:w-[330px]  w-[250px] */}
                <div className="flex justify-center items-center flex-col">
                  <label className="w-full text-left text-[#FFFFFF] text-base">
                    Full Name
                  </label>
                  <input
                    placeholder="Enter your full name"
                    className="rounded-lg py-2.5 px-3 bg-white w-full border-none outline-none"
                    type="text"
                    {...register('name', { required: 'Please enter your name.' })}
                  />
                  {errors?.name && <small className="text-red-500 text-left w-full mt-1 font-semibold" type="text">{errors?.name?.message}</small>}
                </div>
                <div className="flex justify-center items-center flex-col">
                  <label className=" w-full text-left text-[#FFFFFF] text-base">
                    Phone
                  </label>
                  <input
                    placeholder="Enter your contact no."
                    className="rounded-lg py-2.5 px-3 bg-white w-full border-none outline-none"
                    type="tel"
                    {...register('phone', {
                      required: 'Please enter your phone number.',
                      pattern: {
                        value: /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/,
                        message: 'Please enter valid phone number'
                      }
                    })}
                  />
                  {errors?.phone && <small className="text-red-500 text-left w-full mt-1 font-semibold" type="text">{errors?.phone?.message}</small>}
                </div>
                <div className="flex justify-center items-center flex-col ">
                  <label className=" w-full text-left text-[#FFFFFF] text-base">
                    Email
                  </label>
                  <input
                    placeholder="Enter your email address"
                    className="rounded-lg py-2.5 px-3 bg-white w-full border-none outline-none"
                    type="email"
                    {...register('email', {
                      required: 'Please enter your email',
                      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                    })}
                  />
                  {errors?.email && <small className="text-red-500 text-left w-full mt-1 font-semibold" type="text">{errors?.email?.message}</small>}
                </div>
                <div className="flex justify-center items-center flex-col">
                  <label className=" w-full text-left text-[#FFFFFF] text-base">
                    Number of People{" "}
                  </label>
                  <input
                    placeholder="No. of Persons"
                    className="rounded-lg py-2.5 px-3 bg-white w-full border-none outline-none"
                    type="number"
                    {...register('num_people', {
                      required: 'Please enter minimum 1 person',
                      min: 1
                    })}
                  />
                  {errors?.num_people && <small className="text-red-500 text-left w-full mt-1 font-semibold" type="text">{errors?.num_people?.message}</small>}
                </div>
                <div className="flex justify-center items-center flex-col">
                  <label className=" w-full text-left text-[#FFFFFF] text-base">
                    Source
                  </label>
                  <input
                    placeholder="Source"
                    className="rounded-lg py-2.5 px-3 bg-white w-full border-none outline-none"
                    type="text"
                    {...register('source', { required: 'Please enter source' })}
                  />
                  {/* <Controller
                    name="source"
                    control={control}
                    rules={{ required: 'Please select source' }}
                    render={({ field }) => (
                      <Dropdown
                        controlClassName="flex justify-start items-center rounded-lg py-2.5 px-3 !w-full z-[999999]"
                        // style={{ borderRadius: "20px" }}
                        options={sourceOptions}
                        className="rounded-2xl py-1 w-full"
                        onChange={(event) => field.onChange(event.value)}
                        value={field.value}
                      />
                    )}
                  /> */}
                  {errors?.source && <small className="text-red-500 text-left w-full mt-1 font-semibold" type="text">{errors?.source?.message}</small>}
                </div>
                <div className="flex justify-center items-center flex-col">
                  <label className=" w-full text-left text-[#FFFFFF] text-base">
                    Destination{" "}
                  </label>
                  <input
                    placeholder="Destination"
                    className="rounded-lg py-2.5 px-3 bg-white w-full border-none outline-none"
                    type="text"
                    {...register('destination', { required: 'Please enter destination' })}
                  />
                  {/* <Controller
                    name='destination'
                    control={control}
                    rules={{ required: 'Please select destination' }}
                    render={({ field }) => (
                      <Dropdown
                        controlClassName="flex justify-start items-center rounded-lg py-2.5 px-3 !w-full z-[999999]"
                        options={destinations}
                        className="rounded-2xl py-1 w-full"
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                      />
                    )}
                  /> */}
                  {errors?.destination && <small className="text-red-500 text-left w-full mt-1 font-semibold" type="text">{errors?.destination?.message}</small>}
                </div>
                <div className="flex justify-center items-center flex-col">
                  <label className=" w-full text-left text-[#FFFFFF] text-base">
                    Start Date{" "}
                  </label>
                  <input
                    min={new Date().toISOString().split("T")[0]}
                    className="rounded-lg py-2.5 px-3 bg-white w-full border-none outline-none"
                    type="date"
                    {...register('startDate', {
                      required: 'Please select start date',
                    })}
                  />
                  {errors?.startDate && <small className="text-red-500 text-left w-full mt-1 font-semibold" type="text">{errors?.startDate?.message}</small>}
                </div>
                <div className="flex justify-center items-center flex-col">
                  <label className=" w-full text-left text-[#FFFFFF] text-base">
                    End Date{" "}
                  </label>
                  <input
                    min={new Date().toISOString().split("T")[0]}
                    className="rounded-lg py-2.5 px-3 bg-white w-full border-none outline-none"
                    type="date"
                    {...register('endDate', {
                      required: 'Please select end date',
                    })}
                  />
                  {errors?.endDate && <small className="text-red-500 text-left w-full mt-1 font-semibold" type="text">{errors?.endDate?.message}</small>}
                </div>
                <div className="flex justify-center items-center flex-col">
                  <label className=" w-full text-left text-[#FFFFFF] text-base">
                    Any Requests{" "}
                  </label>
                  <input
                    placeholder="Type your queries here...."
                    className="rounded-lg py-2.5 px-3 bg-white w-full border-none outline-none"
                    type="text"
                    {...register('client_requests')}
                  />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <label className=" w-full text-left text-[#FFFFFF] text-base">
                    Hotel
                  </label>
                  <input
                    placeholder="Hotel"
                    className="rounded-lg py-2.5 px-3 bg-white w-full border-none outline-none"
                    type="text"
                    {...register('hotel', { required: 'Please enter hotel' })}
                  />
                  {/* <Controller
                    name="hotel"
                    control={control}
                    rules={{ required: 'Please select hotel' }}
                    render={({ field }) => (
                      <Dropdown
                        controlClassName="flex justify-start items-center rounded-lg py-2.5 px-3 !w-full"
                        options={hotelOptions}
                        className="rounded-2xl py-1 w-full"
                        value={field.value}
                        onChange={(event) => field.onChange(event.value)}
                        placeholder="Select Hotel"
                      />
                    )}
                  /> */}
                  {errors?.hotel && <small className="text-red-500 text-left w-full mt-1 font-semibold" type="text">{errors?.hotel?.message}</small>}
                </div>
              </div>
              <div className="mt-5 text-center">
                {successMsg && <div className="flex p-4 mb-4 mx-auto text-sm text-green-800 border border-green-300 rounded-lg max-w-fit bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                  {successMsg}
                </div>}
                {errorMsg && <div class="flex p-4 mb-4 mx-auto text-sm text-red-800 border border-red-300 rounded-lg max-w-fit bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                  {errorMsg}
                </div>}
              </div>
              <div className="text-center">
                <button disabled={isSubmitting} className="TopPlace_button px-10 py-2 text-lg font-bold	my-7 ">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
