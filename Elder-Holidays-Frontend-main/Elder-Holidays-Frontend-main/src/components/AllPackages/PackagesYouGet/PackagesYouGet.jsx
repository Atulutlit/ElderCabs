import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./PackagesYouGet.css";
import search from "../../../assets/img/allPackages/search.png";
import img from "../../../assets/img/allPackages/header.png";

import location from "../../../assets/img/allPackages/location.png";
import watch from "../../../assets/img/allPackages/watch.png";
import star from "../../../assets/img/allPackages/star.png";
import user from "../../../assets/img/allPackages/user.png";

import PriceRange from "../PriceRange/PriceRange";
import PackageModal from "../../PackageModal/PackageModal";
import useFetch from "../../../hooks/useFetch";

export const PackagesYouGet = () => {
  const [Open, setOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [range, setRange] = useState({ min: 0, max: 100 });
  const [filterData, setFilterData] = useState({
    duration: [],
    theme: [],
    category: [],
    range: { ...range },
  });
  const [loading, setLoading] = useState(false);
  const [filterPackages, setFilterPackages] = useState(null);
  const [modalData, setModalData] = useState(null);

  // api url and api key
  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  // modal close
  const handleClose = () => {
    setOpen(false);
    setModalData(null);
  };
  const handleOpen = (data) => {
    setModalData(data);
    setOpen(true);
  };

  // fetch all categories and all themes
  const { data: categories = [] } = useFetch("/categories");
  const { data: themes = [] } = useFetch("/theme");

  // filter option handler
  const optionHandler = (name) => {
    const prevData = { ...filterData };
    const checkbox = document.querySelectorAll(
      "input[type='checkbox'][name='" + name + "']"
    );
    const arr = [];
    checkbox.forEach((element) => {
      if (element.checked === true) {
        arr.push(element.value);
      }
    });
    prevData[name] = arr;
    setFilterData(prevData);
  };

  // clear selected option
  const clearSelection = (name) => {
    const radioBtns = document.querySelectorAll(
      "input[type='checkbox'][name='" + name + "']"
    );
    radioBtns.forEach((radioBtn) => {
      if (radioBtn.checked === true) radioBtn.checked = false;
    });
    optionHandler(name);
  };

  const handlePackageHandler = async (e) => {
    const value = e.target.value;
    if (!value) {
      return;
    }
    e.target.readonly = true;
    setFilterPackages(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/package/search-packages/${value}`, {
        headers: {
          authorization: `bearer ${API_KEY}`,
        },
      });
      const data = await res.json();
      setFilterPackages(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
      e.target.readonly = false;
    }
  };

  // debounce function
  const debounceSearch = debounce(handlePackageHandler, 2000);

  useEffect(() => {
    const queryData = { ...filterData };
    queryData.range = range;
    const url = `${API_URL}/package/filter-packages?query=${JSON.stringify(
      queryData
    )}`;
    setLoading(true);
    setFilterPackages(null);
    setTimeout(() => {
      fetch(url, { headers: { authorization: `bearer ${API_KEY}` } })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setFilterPackages(data);
        })
        .catch((err) => console.error(err));
    }, 1000);
  }, [range, filterData]);

  return (
    <div className="PopularPlace_container flex justify-center items-start lg:my-10 md:my-10 mt-10  h-full ">
      {modalData && (
        <PackageModal
          modalData={modalData}
          Open={Open}
          handleClose={handleClose}
        />
      )}

      <div className="flex justify-between items-center flex-col flex-wrap xl:w-[1072px] px-6 mx-auto">
        <div className="flex lg:justify-between justify-center gap-5 items-center flex-wrap w-full">
          <div
            className="lg:text-4xl md:text-3xl text-xl font-semibold		"
            style={{ color: "#000" }}
          >
            Packages You Can Get Now{" "}
          </div>
          <div className="PackagesYouGet_form">
            <div className="flex justify-center items-center shadow-xl lg:px-3 lg:py-1 py-1 px-3">
              <img
                src={search}
                className="ml-5 mr-2"
                style={{ height: "24px" }}
                alt="search"
              />
              <input
                onChange={(e) => debounceSearch(e)}
                placeholder="Search for places"
                className=" lg:px-2 lg:py-2 py-1 px-2  lg:w-72 w-60	lg:my-0 my-2 shadow-none focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 mt-10 w-full">
          {/* Package filter start */}
          <div className="col-span-1 lg:col-span-4">
            <button
              className="flex items-center mx-auto gap-2 border-2 rounded-xl px-5 py-2 mb-5 text-base lg:hidden"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              Filters
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden duration-400 lg:h-auto ${
                isOpenMenu ? "h-auto" : "h-0"
              } shadow-xl rounded-lg`}
            >
              <div
                className={`flex justify-center lg:items-start items-center flex-col gap-y-4 flex-wrap my-2 py-5 px-5 h-full`}
              >
                <div className="w-full flex justify-start items-start flex-col flex-wrap">
                  <div className="py-3 border-b-2 border-[#c0c0c0] w-full">
                    <h1 className="lg:text-xl font-bold">
                      Trip Package by Themes
                    </h1>
                  </div>
                  <div className="my-4">
                    {Array.isArray(themes) &&
                      themes.map((theme, index) => (
                        <label
                          className="mb-2 flex items-center gap-2 cursor-pointer w-fit"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            onChange={(e) => optionHandler(e.target.name)}
                            value={theme?.name}
                            name="theme"
                            className="w-4 h-4"
                          />
                          <span className=" ">{theme?.name}</span>
                        </label>
                      ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => clearSelection("theme")}
                    className="PackagesYouGet_button px-2 py-1 text-base font-medium"
                  >
                    Clear Selection
                  </button>
                </div>
                <div className="w-full flex justify-center items-start flex-col flex-wrap">
                  <div className="py-3 border-b-2 border-[#c0c0c0] w-full">
                    <h1 className="lg:text-xl font-bold">
                      Trip Package By Region
                    </h1>
                  </div>
                  <div className="my-4">
                    {Array.isArray(categories) &&
                      categories.map((cate, index) => (
                        <label
                          className="mb-2 flex items-center gap-2 cursor-pointer w-fit"
                          key={index}
                        >
                          <input
                            onChange={(e) => optionHandler(e.target.name)}
                            type="checkbox"
                            value={cate?.name}
                            name="category"
                            className="w-4 h-4"
                          />
                          <span className=" ">{cate?.name}</span>
                        </label>
                      ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => clearSelection("category")}
                    className="PackagesYouGet_button px-2 py-1 text-base font-medium"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Package filter end */}

          <div className="col-span-1 lg:col-span-8">
            {/* Loading animation */}
            {loading && (
              <div className="py-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-arrow-repeat animate-spin mx-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                  <path
                    fillRule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                  />
                </svg>
              </div>
            )}

            <div className="w-full flex flex-col gap-y-5">
              {/* Single Package */}
              {Array.isArray(filterPackages) &&
                (filterPackages.length > 0 ? (
                  filterPackages.map((item, index) => (
                    <div
                      className="w-full flex flex-col sm:flex-row gap-5 rounded-xl shadow-lg px-3 md:px-5 py-3 md:py-5 border-2 border-[#f3f3f3]"
                      key={index}
                    >
                      <div className="w-full sm:w-5/12 sm:flex sm:items-center">
                        <div className="w-full h-[50vw] sm:h-full md:h-[190px] overflow-hidden rounded-lg">
                          <LazyLoadImage
                            src={`${API_URL}/uploads/packages/${item?.image}`}
                            className="w-full h-full object-cover selectDisable"
                            alt={`${item?.title} thumbnail`}
                          />
                        </div>
                      </div>
                      <div className="w-full sm:w-7/12 sm:flex sm:items-center">
                        <div>
                          <h1 className=" lg:text-xl text-base text-[#20284F]">
                            {item?.title}
                          </h1>
                          <div className="flex justify-between items-center flex-wrap my-3 lg:my-5 gap-y-4">
                            <div className="w-1/2 flex justify-start items-center gap-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 48 48"
                              >
                                <path
                                  fill="#787878"
                                  d="M37.84 12.02A3.007 3.007 0 0 0 35 10H13c-1.31 0-2.43.84-2.84 2.02L6 24v16c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-2h24v2c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V24l-4.16-11.98zM13 32c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm22 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM10 22l3-9h22l3 9H10z"
                                />
                                <path fill="none" d="M0 0h48v48H0z" />
                              </svg>
                              <p className="lg:text-sm text-xs mr-8 text-[#787878]">
                                {item?.car}
                              </p>
                            </div>
                            <div className="w-1/2 flex justify-start items-center gap-x-2">
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 18 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.03638 0.111225C4.45309 0.0910058 0.686582 3.82443 0.666363 8.40771C0.646144 12.991 4.37956 16.7575 8.96285 16.7777C13.5461 16.7979 17.3126 13.0645 17.3329 8.48124C17.3531 3.89795 13.6197 0.131444 9.03638 0.111225ZM11.944 11.6242L8.55321 9.51752C8.30388 9.36642 8.15505 9.09909 8.15634 8.80743L8.17358 4.89913C8.18342 4.55751 8.468 4.27542 8.80967 4.27693C9.15133 4.27844 9.43341 4.56302 9.4319 4.90468L9.41554 8.61298L12.607 10.5521C12.9062 10.7367 13.0045 11.1288 12.8198 11.428C12.6352 11.7189 12.2431 11.8088 11.944 11.6242Z"
                                  fill="#787878"
                                />
                              </svg>
                              <p className="lg:text-sm text-xs mr-8 text-[#787878]">
                                {item?.duration}
                              </p>
                            </div>
                            <div className="w-1/2 flex justify-start items-center gap-x-2">
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 21 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.4809 18.644L0.481141 18.5557L0.489964 16.5558L1.48995 16.5602L1.55613 1.56031C1.5573 1.2951 1.66377 1.04121 1.85214 0.854502C2.0405 0.667795 2.29531 0.563561 2.56053 0.564731L16.5604 0.626491C16.8256 0.627661 17.0795 0.734139 17.2662 0.922501C17.4529 1.11086 17.5571 1.36568 17.556 1.63089L17.5339 6.63084L19.5339 6.63967L19.4898 16.6396L20.4898 16.644L20.4809 18.644ZM15.4898 16.6219L17.4898 16.6307L17.5251 8.63083L11.5251 8.60436L11.4899 16.6043L13.4898 16.6131L13.5163 10.6132L15.5163 10.622L15.4898 16.6219ZM15.5339 6.62202L15.5516 2.62206L3.55169 2.56912L3.48993 16.569L9.48988 16.5955L9.53399 6.59555L15.5339 6.62202ZM5.52521 8.57789L7.52519 8.58671L7.51636 10.5867L5.51638 10.5779L5.52521 8.57789ZM5.50756 12.5778L7.50754 12.5867L7.49872 14.5867L5.49874 14.5778L5.50756 12.5778ZM5.54285 4.57793L7.54283 4.58675L7.53401 6.58673L5.53403 6.57791L5.54285 4.57793Z"
                                  fill="#787878"
                                />
                              </svg>
                              <p className="lg:text-sm text-xs mr-8 text-[#787878]">
                                {item?.hotel}
                              </p>
                            </div>
                          </div>
                          <div className="text-center sm:text-left">
                            <button
                              onClick={() => handleOpen(item)}
                              className="BestChoice_button px-4 py-1.5 text-base font-thin lg:mt-0 mt-4"
                            >
                              View Detail
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  //  not found error
                  <p className="text-center w-full">Packages not found</p>
                ))}
              {/* Single Package end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
