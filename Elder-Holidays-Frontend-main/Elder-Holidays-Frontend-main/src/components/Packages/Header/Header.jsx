import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/img/packages/bg.png";
import icon1 from "../../../assets/img/packages/icon1.png";
import icon2 from "../../../assets/img/packages/icon2.png";
import icon3 from "../../../assets/img/packages/icon3.png";
import icon4 from "../../../assets/img/packages/icon4.png";
import icon5 from "../../../assets/img/packages/icon5.png";
import Nav from "../../Header/Nav/Nav";
import { Customize } from "../CustomizePackage/Customize";
import "./Header.css";
export const Header = () => {

  const [customizeForm, setCustomizeForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.querySelector('html');
    if (customizeForm) {
      html.style.overflowY = 'hidden';
    } else {
      html.style.overflowY = 'auto';
    }
  }, [customizeForm]);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="banner-container relative "
      >
        <Nav></Nav>
        <div className="packages_overlay h-screen">
          <div className="banner md:px-[100px] px-8 flex justify-start  items-start lg:justify-center lg:items-center lg:gap-8 gap-4 py-32 pb-16 flex-col">
            <div className="banner-left banner-content text-white mx-auto ">
              <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold py-3 mt-10 text-center">
                <span className="block">Nature always wears the </span>
                <span className="block mt-3">color Of the spirit.</span>
              </h2>
            </div>
            <div className="flex w-auto mx-auto flex-col sm:flex-row gap-y-5 sm:gap-x-4 justify-center items-center">
              <button className="bg-[#32c7f4] border-[3px] border-[#26c5f5] px-6 py-2 lg:text-base text-sm rounded-md hover:bg-white duration-300 font-medium text-black w-full sm:w-auto" onClick={() => setCustomizeForm(true)}>
                Customize your package
              </button>
              <button className="bg-[#32c7f4] border-[3px] border-[#26c5f5] px-6 py-2 lg:text-base text-sm rounded-md hover:bg-white duration-300 font-medium text-black w-full sm:w-auto" onClick={() => navigate('/all-packages')}>
                View All Packages
              </button>
            </div>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          {/* <div className="absolute left-0 bg-red-800	bottom-60		w-full flex justify-evenly flex-col	 items-center">
          <div className="  relative w-full bg-green-400">
            <p className=" absolute bottom-4	">Top</p>
          </div>
          <div className="flex justify-between items-center ">
            <p>as</p>
            <p>as</p>
            <p>as</p>
            <p>as</p>
            <p>as</p>
          </div>
        </div> */}
          {/*  */}
          {/*  */}
          {/* Second section Rudransh Code */}
          <div className="absolute w-full lg:bottom-36 bottom-32	">
            <div className=" packages_top_cat  h-32			">
              <div className=" packages_top_cat_head flex justify-center items-center">
                <div className="lg:w-4/6 w-5/6	text-left 	lg:text-4xl text-2xl font-bold py-3">
                  Top categories
                </div>
              </div>
              <div className="flex justify-center items-center ">
                <div className="flex justify-between items-center mt-6 lg:w-4/6 w-5/6	flex-wrap	bg-[#ffffff30] rounded-xl px-5 py-2">
                  <div className="flex justify-center items-center flex-col my-2 mx-2">
                    <img className="lg:h-7 h-4" src={icon1} />
                    <p className="lg:text-base sm:text-sm">Beaches</p>
                  </div>
                  <div className="flex justify-center items-center flex-col my-2 mx-2">
                    <img className="lg:h-7 h-4" src={icon2} />
                    <p className="lg:text-base sm:text-sm">Mountains</p>
                  </div>
                  <div className="flex justify-center items-center flex-col my-2 mx-2">
                    <img className="lg:h-7 h-4" src={icon3} />
                    <p className="lg:text-base sm:text-sm">Desert</p>
                  </div>
                  <div className="flex justify-center items-center flex-col my-2 mx-2">
                    <img className="lg:h-7 h-4" src={icon4} />
                    <p className="lg:text-base sm:text-sm">Camping</p>
                  </div>
                  <div className="flex justify-center items-center flex-col my-2 mx-2">
                    <img className="lg:h-7 h-4" src={icon5} />
                    <p className="lg:text-base sm:text-sm">Tropical</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {customizeForm && <Customize setCustomizeForm={setCustomizeForm} />}
    </>
  );
};
