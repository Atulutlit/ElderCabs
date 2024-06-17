import React from "react";
import Logo from "./../../../src/assets/img/logo/logo-bold-elder 1.png"
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";
import pdf from '../../assets/pdf/Elder Holidays Terms and Conditions.pdf';

const Footer = () => {
    return (
        <footer className="text-center lg:text-left bg-[#DEF3FF] text-[#20284F] lg:px-[100px] md:px-[50px] px-3">
            <div className="top flex flex-col py-10 gap-9 md:flex-row">
                <div className="logo flex-1 hidden md:block">
                    <img src={Logo} alt="" className="w-[244px]" />
                </div>
                <div className="subgroup flex-1 flex flex-col gap-1 text-lg">
                    <div className="mainLink font-bold ">Quick Links</div>
                    <div className="subLink ">
                        <span className="cursor-pointer">
                            <Link to="/" className="hover:text-[#069BCA] duration-500"> Home</Link>
                        </span>
                    </div>
                    <div className="subLink ">
                        <span className="cursor-pointer">
                            <Link to="/aboutus" className="hover:text-[#069BCA] duration-500">About Us</Link>
                        </span>
                    </div>
                    <div className="subLink ">
                        <span className="cursor-pointer">
                            <Link to="/mainAttraction" className="hover:text-[#069BCA] duration-500 p-0">Main Attraction</Link>
                        </span>
                    </div>
                    <div className="subLink ">
                        <span className="cursor-pointer">
                            <Link to="/packages" className="hover:text-[#069BCA] duration-500 p-0">Packages</Link>
                        </span>
                    </div>
                    <div className="subLink ">
                        <span className="cursor-pointer">
                            <Link to="/blogs" className="hover:text-[#069BCA] duration-500 p-0">Blogs</Link>
                        </span>
                    </div>
                </div>
                <div className="subgroup flex-1 flex flex-col gap-1 text-lg">
                    <div className="mainLink font-bold">Packages</div>
                    <div className="subLink "> <span className="cursor-pointer">
                        <Link to="/packages" className="hover:text-[#069BCA] duration-500 p-0">Packages</Link>
                    </span></div>

                    <div className="subLink "> <span className="cursor-pointer hover:text-[#069BCA]">
                        <Link to="/all-packages" className="hover:text-[#069BCA] duration-500 p-0">All Packages</Link>
                    </span></div>
                </div>
                <div className="subgroup flex-1 flex flex-col gap-1 text-lg">
                    <div className="mainLink font-bold">Contact Us</div>
                    <div className="subLink">
                        <a href="tel:+9182719346" className="hover:text-[#069BCA] duration-500 p-0">
                            <span className="data cursor-pointer whitespace-nowrap"><CallIcon />+91 7428203766</span>
                        </a>
                    </div>
                    <div className="subLink">
                        <a className="hover:text-[#069BCA] duration-500 p-0" href="mailto:info@elderholidays.com">
                            <span className="data cursor-pointer whitespace-nowrap">
                                <MailIcon /> info@elderholidays.com
                            </span>
                        </a>
                    </div>
                    <div className="subLink cursor-pointer">
                        <a target="_blank" rel="noreferrer" className="hover:text-[#069BCA] duration-500 p-0" href="https://www.google.com/maps/place/Vaishali,+Ghaziabad,+Uttar+Pradesh/@28.645119,77.3288016,14.78z/data=!4m5!3m4!1s0x390cfad07ac6ca3d:0x4797942eb250fd96!8m2!3d28.6429341!4d77.3401896">
                            <span className="data cursor-pointer whitespace-nowrap">
                                <LocationOnIcon /> 1/4929, Lane No. 9, Balbirnagar Ext.,<br />Shahdara, New Delhi 110032
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="line w-full border border-solid border-[#20284F]"></div>
            <div className="bottom py-5 flex flex-col gap-9 md:flex-row">
                <div className="copyright flex-1 text-sm"><span>Copyright © 2023 Design and Developed by <span className="font-bold cursor-pointer"><a href="https://ingelt.com/" target="_blank" rel="noreferrer">InGelt Pvt. Ltd.</a></span> </span></div>
                <div className="social flex-1 flex items-center justify-center gap-3">
                    <a href='https://www.facebook.com/profile.php?id=100063723653913' rel="noreferrer" target='_blank' ><FacebookRoundedIcon /></a>
                    <a href='https://instagram.com/elderholidays?igshid=OTJlNzQ0NWM=' rel="noreferrer" target='_blank' ><InstagramIcon /></a>
                </div>
                <div className="right flex-1 flex text-sm ">
                    <div className="flex-1 flex gap-2">
                        <div className="flex-1">
                            <a href={pdf} target='_blank' rel="noreferrer">Terms of Service</a>
                        </div>
                        {/* <div className="flex-1">
                            <a href={pdf} target='_blank' rel="noreferrer">Privacy Policy</a>
                        </div> */}
                    </div>
                    <div className="flex-1 text-center">
                        All rights reserved
                    </div>
                </div>
            </div>
        </footer>
    );

}
export default Footer;