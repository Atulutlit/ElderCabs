import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./nav.css";

// assets
import logo from '../../../assets/img/logo/elder-white-ingelt.png';

const activeClassLink = 'nav-link text-xl lg:text-base relative duration-500 after:content-[""] after:absolute after:w-full after:h-[2px] after:-bottom-[7px] after:left-0 after:bg-white after:rounded-full';
const navClassLink = 'nav-link text-xl lg:text-base hover:text-[#069BCA] duration-500';

const Nav = () => {

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      let navbar = document.querySelector(".navbar");
      if (window.scrollY > 150) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest(".packages")) {
        setDropdownMenu(false);
      }
    });

  }, []);

  return (
    <div className="fixed 2xl:container w-full z-50 navbar">
      <nav
        className="
                    relative
                    flex flex-wrap
                    items-center
                    justify-between
                    py-2
                    text-gray-500
                    hover:text-gray-700
                    focus:text-gray-700
                    navbar navbar-expand-lg navbar-light
                    "
      >
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <Link to="/">
            <img className="w-36 h-auto" src={logo} alt='Elder Cabs Logo' />
          </Link>
          <button
            className=" lg:hidden block
                        text-white
                        border-0
                        hover:shadow-none hover:no-underline
                        py-2
                        px-2.5
                        bg-transparent
                        focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
                    "
            type="button"
            role='button'
            aria-label="mobileNavbar"
            aria-labelledby="mobileNavbar"
            onClick={() => setMobileMenu(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div
            className={`fixed lg:static top-0 left-0 w-full lg:w-auto h-screen lg:h-auto items-center md:px-[100px] px-8 lg:px-0 lg:bg-transparent bg-[#222831] lg:py-0 py-8 duration-300 lg:translate-x-0 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* for mobile */}
            <div className="flex items-center justify-between lg:hidden" id="mobileNavbar">
              <Link to="/" className="invisible">
                <img className="w-14" src={logo} alt='Elder Cabs Logo' />
              </Link>
              <button
                className="
                        navbar-toggler
                        text-white
                        border-0
                        hover:shadow-none hover:no-underline
                        py-2
                        px-2.5
                        bg-transparent
                        focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
                    "
                type="button"
                onClick={() => setMobileMenu(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* <!-- Left links --> */}
            <ul className="navbar-nav gap-y-8 lg:gap-y-0 mt-10 lg:mt-0 h-auto flex flex-col pl-0 list-style-none mx-auto justify-center items-center text-[#f2f2f2]">
              <li className="nav-item pr-6">
                <NavLink
                  to="/"
                  className={({ isActive }) => isActive ? activeClassLink : navClassLink}
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item pr-6">
                <NavLink
                  to="/aboutus"
                  className={({ isActive }) => isActive ? activeClassLink : navClassLink}
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item pr-6">
                <NavLink
                  to="/mainAttraction"
                  className={({ isActive }) => isActive ? activeClassLink : navClassLink}
                >
                  Main Attraction
                </NavLink>
              </li>
              <li className="nav-item pr-6 relative">
                <NavLink
                  to="/packages"
                  className={({ isActive }) => `nav-link packages flex items-center gap-2 ${isActive ? activeClassLink : navClassLink}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownMenu(!dropdownMenu);
                  }}

                >
                  Packages
                  <svg className={`duration-300 ${dropdownMenu ? 'rotate-180' : 'rotate-0'}`} width="12" height="7" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.12256 1.39069C4.33625 4.33823 6.11352 5.9683 6.60045 6.4149L12.1225 1.43921" strokeWidth={2.5} stroke="white" strokeLinecap="round" />
                  </svg>
                </NavLink>
                {/* submenu */}
                <div className={`lg:absolute top-[2.9rem] duration-300 origin-top left-0 w-full lg:block h-auto ${dropdownMenu ? 'block lg:scale-y-1' : 'hidden lg:scale-y-0'}`}>
                  <ul className="flex flex-col py-3 rounded-b-md lg:bg-[#000000a5] gap-y-8 mt-7 lg:mt-0 lg:gap-y-0">
                    <li className="text-left pb-2">
                      <NavLink to='/theme' className={({ isActive }) => isActive ? activeClassLink : navClassLink}>Themes</NavLink>
                    </li>
                    <li className="text-left lg:pb-2">
                      <NavLink to='/all-packages' className={({ isActive }) => isActive ? activeClassLink : navClassLink}>All Packages</NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              {/* <li className="nav-item pr-6">
                <NavLink
                  to="/hotels"
                  className={({ isActive }) => isActive ? activeClassLink : navClassLink}
                >
                  Hotels
                </NavLink>
              </li> */}
              <li className="nav-item pr-6">
                <NavLink
                  to="/blogs"
                  className={({ isActive }) => isActive ? activeClassLink : navClassLink}
                >
                  Blogs
                </NavLink>
              </li>
            </ul>
            {/* <!-- Left links --> */}
          </div>
          {/* <!-- Collapsible wrapper --> */}
        </div>
      </nav >
    </div >
  );
};

export default Nav;
