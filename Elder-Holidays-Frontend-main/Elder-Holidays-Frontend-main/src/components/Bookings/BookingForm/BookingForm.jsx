import React, { useState } from "react";
import "./BookingForm.css";
import hotelImg from "../../../assets/img/allPackages/header.png";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Controller, useForm } from 'react-hook-form';
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import useMail from "../../../hooks/useMail";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const BookingForm = () => {

  const defaultOption = "Select State";
  const stateOptions = [defaultOption, 'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Select State', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal']

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, control } = useForm();
  const { id } = useParams();

  // package details
  const { data: packageData = {}, loading } = useFetch(`/package/${id}`);
  const [mail] = useMail();

  const API_URL = process.env.REACT_APP_API_URL;

  const bookingHandler = async (data) => {

    data.package_details = `
    Title: ${packageData?.title}
    Description: ${packageData?.description}
    Duration: ${packageData?.duration}
    Theme: ${packageData?.theme}
    Category: ${packageData?.category}
    Car: ${packageData?.car}
    Hotel: ${packageData?.hotel}
    Price Range: ${packageData?.price_range}
    `;

    await mail('/mail/package', data);
    reset();

  }

  if (loading) {
    return <div className="py-16">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-repeat animate-spin mx-auto" viewBox="0 0 16 16">
        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
        <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
      </svg>
    </div>
  }

  return (
    <div className="container mx-auto px-5 my-10 md:px-10">
      <div className="flex flex-col-reverse md:flex-row gap-x-5">
        <div className="w-full md:w-7/12">
          <form onSubmit={handleSubmit(bookingHandler)} className="px-3 mt-10 md:mt-0">
            <div className="heading font-semibold text-center md:text-left lg:mx-2 sm:text-lg md:text-3xl lg:text-left md:mx-3 mx-3 text-lg mb-10">Your Personal Information</div>
            <div className="grid grid-cols-2 gap-5 md:gap-14">
              <div className="flex flex-col">
                <label className="w-full text-left text-lg font-medium md:text-xl mb-5">First Name{" "}</label>
                <input
                  className="rounded-lg py-2.5 px-3 focus:outline-none"
                  placeholder="First Name"
                  type="text"
                  {...register('fname', { required: 'Please enter your first name' })}
                />
                {errors?.fname && <small className="text-red-500 w-full text-left font-medium text-sm mb-2"> {errors?.fname?.message} </small>}
              </div>
              <div className="flex flex-col">
                <label className=" w-full text-left text-lg  font-medium md:text-xl mb-5">Last Name{" "}</label>
                <input
                  className="rounded-lg py-2.5 px-3 focus:outline-none"
                  placeholder="Last Name"
                  type="text"
                  {...register('lname', { required: 'Please enter your last name' })}
                />
                {errors?.lname && <small className="text-red-500 w-full text-left font-medium text-sm mb-2"> {errors?.lname?.message} </small>}
              </div>
              <div className="flex flex-col">
                <label className=" w-full text-left text-lg  font-medium md:text-xl mb-5">Email I'd{" "}</label>
                <input
                  className="rounded-lg py-2.5 px-3 focus:outline-none"
                  placeholder="Email I'd"
                  type="email"
                  {...register('email', {
                    required: 'Please enter email address',
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'Please enter valid email address'
                    }
                  })}
                />
                {errors?.email && <small className="text-red-500 w-full text-left font-medium text-sm mb-2"> {errors?.email?.message} </small>}
              </div>
              <div className="flex flex-col">
                <label className=" w-full text-left text-lg  font-medium md:text-xl mb-5">Phone Number{" "}</label>
                <input
                  className="rounded-lg py-2.5 px-3 focus:outline-none"
                  placeholder="Phone No."
                  type="text"
                  {...register('phone', {
                    required: 'Please enter your phone number',
                    pattern: {
                      value: /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/,
                      message: 'Phone number is invalid!'
                    }
                  })}
                />
                {errors?.phone && <small className="text-red-500 w-full text-left font-medium text-sm mb-2"> {errors?.phone?.message} </small>}
              </div>
              <div className="flex flex-col">
                <label className=" w-full text-left text-lg  font-medium md:text-xl mb-5">Pincode{" "}</label>
                <input
                  className="rounded-lg py-2.5 px-3 focus:outline-none"
                  placeholder="Pincode"
                  type="text"
                  {...register('pinCode', { required: 'Please enter pin code' })}
                />
                {errors?.pinCode && <small className="text-red-500 w-full text-left font-medium text-sm mb-2"> {errors?.pinCode?.message} </small>}
              </div>
              <div className="flex flex-col">
                <label className=" w-full text-left text-lg  font-medium md:text-xl mb-5">Source State{" "}</label>
                <input
                  className="rounded-lg py-2.5 px-3 focus:outline-none"
                  placeholder="Source State"
                  type="text"
                  {...register('state', { required: 'Please enter source state' })}
                />
                {/* <Controller
                  name="state"
                  control={control}
                  rules={{ required: 'Please select state' }}
                  render={({ field }) => (
                    <Dropdown
                      onChange={(e) => field.onChange(e.value)}
                      options={stateOptions}
                      value={field.value}
                      placeholder="Select State"
                      name={field.name}
                      className='w-full cursor-pointer'
                      controlClassName="!w-full"
                    />
                  )}
                /> */}
                {errors?.state && <small className="text-red-500 w-full text-left font-medium text-sm mb-2"> {errors?.state?.message} </small>}
              </div>
              <div className="flex flex-col">
                <label className=" w-full text-left text-lg  font-medium md:text-xl mb-5">Departure Date{" "}</label>
                <input
                  min={new Date().toISOString().split("T")[0]}
                  className="rounded-lg py-2.5 px-3 focus:outline-none"
                  placeholder="Date"
                  type="date"
                  {...register('departure_date', { required: 'Please select departure date' })}
                />
                {errors?.departure_date && <small className="text-red-500 w-full text-left font-medium text-sm mb-2"> {errors?.departure_date?.message} </small>}
              </div>
              <div className="flex flex-col">
                <label className=" w-full text-left text-lg  font-medium md:text-xl mb-5">Number of People{" "}</label>
                <input
                  className="rounded-lg py-2.5 px-3 focus:outline-none"
                  type="number"
                  placeholder="People"
                  {...register('num_people', { required: 'Please enter 1 person', min: 1 })}
                />
                {errors?.num_people && <small className="text-red-500 w-full text-left font-medium text-sm mb-2"> {errors?.num_people?.message} </small>}
              </div>
            </div>

            <div className=" text-center md:text-left mt-10">
              <button disabled={isSubmitting} className="bg-[#66DAFF] rounded-lg lg:px-8 lg:py-3 px-12 py-3">Booking Confirmation</button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-5/12">
          <div className="">
            <div className="lg:w-5/6 h-[60vw] md:h-[230px] lg:h-[280px] 2xl:h-[300px] rounded-md overflow-hidden">
              <LazyLoadImage src={`${API_URL}/uploads/packages/${packageData?.image}`} className="w-full h-full object-cover" alt="" />
            </div>
            <h1 className="lg:text-2xl text-xl font-medium whitespace-nowrap mt-5">{packageData?.title}</h1>
          </div>

          <div className="middle mt-2 flex flex-col justify-start items-start gap-1">
            <table className="">
              <tbody>
                <tr>
                  <th><div className="font-normal text-sm text-left">Price Range</div></th>
                  <th><div className="font-semibold pl-2 text-sm text-left">{packageData?.price_range}</div></th>
                </tr>
                <tr>
                  <td><div className="font-normal text-sm text-left">Car</div></td>
                  <td><div className="font-semibold pl-2 text-sm text-left">{packageData?.car}</div></td>
                </tr>
                <tr>
                  <td><div className="font-normal text-sm text-left">Hotel</div></td>
                  <td><div className="font-semibold pl-2 text-sm text-left">{packageData?.hotel}</div></td>
                </tr>
                <tr>
                  <td><div className="font-normal text-sm text-left">Duration</div></td>
                  <td><div className="font-semibold pl-2 text-sm text-left">{packageData?.duration}</div></td>
                </tr>
                <tr>
                  <td className="block"><div className="font-normal text-sm text-left">Activities</div></td>
                  <td>
                    <div className="font-semibold pl-2 text-sm text-left">
                      <ul className="cusListStyle pl-2">
                        {Array.isArray(packageData?.activities) &&
                          packageData?.activities.map((activity, index) => (
                            activity && <li key={index}>{activity}</li>
                          ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="down mt-10 w-full text-sm md:text-base text-left">
            <p>{packageData?.description}</p>
          </div>

        </div>
      </div>
    </div >
  );
};
