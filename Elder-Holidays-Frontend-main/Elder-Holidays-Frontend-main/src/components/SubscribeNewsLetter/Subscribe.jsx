import React, { useState } from "react";
import "./Subscribe.css";
import subImg from "../../assets/img/Subscribe/subImg.png";
export const Subscribe = () => {

  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const formHandler = async (e) => {
    e.preventDefault();
    const form = e.target,
      email = form.email.value;

    setLoading(true);
    const res = await fetch(`${API_URL}/subscriber`, {
      body: JSON.stringify({ email }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${API_KEY}`
      }
    });
    const data = await res.json();
    form.reset();
    setLoading(false);
  }

  return (
    <div id="subscribe" className="Subscribe flex justify-center items-center  flex-wrap lg:mb-14 md:my-4 my-5 ">
      <div>
        {" "}
        <img src={subImg} className="lg:h-full h-[200px] selectDisable" draggable="false" alt="" />
      </div>
      <div className="ml-5">
        <div className="my-7 text-left ">
          <div
            className="lg:text-5xl text-2xl font-normal	my-3	"
            style={{ color: "#20284F" }}
          >
            Subscribe to our newsletter!{" "}
          </div>
          <div
            className="lg:text-lg font-normal	my-2	"
            style={{ color: "#20284F" }}
          >
            We’ll send you the full updates on the new destinations.{" "}
          </div>
          <div
            className="lg:text-lg font-normal	my-2	"
            style={{ color: "#20284F" }}
          >
            We promise to give our best deal to you everytime.{" "}
          </div>
        </div>{" "}
        <form onSubmit={formHandler} className="flex justify-start  items-start lg:flex-row flex-col ">
          <input
            type='email'
            name="email"
            placeholder="Email"
            className="  px-3  py-2  w-80	   mx-2 lg:my-0 my-4"
            required
          />
          <button className="Subscribe_button  py-1 md:w-52 w-36 mx-2 md:text-xl">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};
