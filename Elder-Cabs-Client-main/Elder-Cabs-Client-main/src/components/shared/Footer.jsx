import { Link } from 'react-router-dom';

// assets
import facebook from '../../assets/images/facebook.svg';
import instagram from '../../assets/images/instagram.svg';
import linkedin from '../../assets/images/linkedin.svg';
import twitter from '../../assets/images/twitter.svg';
import pinterest from '../../assets/images/pinterest.svg';
import location from '../../assets/images/location.svg';
import phone from '../../assets/images/phone.svg';
import envelope from '../../assets/images/envelope.svg';
import www from '../../assets/images/www.svg';
import privacyPolicy from '../../assets/Privacy_Policy.pdf';
import CancellationPolicy from '../../assets/Cancellation_Policy.pdf';
import termsAndCondition from '../../assets/Terms_&_Condition.pdf';



const Footer = () => {
    return (
        <footer className="bg-violet-900 pt-20">
            <div className="container mx-auto px-5">
                <div className="grid gap-6 grid-cols-1 max-md:gap-y-10 md:grid-cols-12 mb-10 2xl:mb-16">
                    <div className="col-span-1 md:col-span-5 lg:col-span-6 2xl:col-span-5">
                        <h2 className="mb-3 2xl:mb-8 text-2xl 2xl:text-4xl font-semibold">About Us</h2>
                        <p className="text-sm 2xl:text-2xl max-lg:w-11/12 w-7/12 2xl:w-10/12"><strong>Elder Cabs (Elder Fleet Supply Solutions Pvt. Ltd.)</strong> is an online/offline taxi service provider which has been offering exceptional Intercity / Intra-city taxi or other passenger vehicles services for local, transfer, one-way, round-trip,, and multi city travel. We offer taxi of various types and qualities in major cities of India. We have 200+ fleet vendor and still adding.</p>
                        <div className="flex items-center gap-x-5 2xl:gap-x-10 mt-4 2xl:mt-7">
                            <a rel='noreferrer' target="_blank" className='cursor-pointer' href='#'>
                                <img src={facebook} alt='facebook' className='2xl:w-8' />
                            </a>
                            <a rel='noreferrer' target="_blank" className='cursor-pointer' href='#'>
                                <img src={instagram} alt='instagram' className='2xl:w-8' />
                            </a>
                            <a rel='noreferrer' target="_blank" className='cursor-pointer' href='#'>
                                <img src={linkedin} alt='linkedin' className='2xl:w-8' />
                            </a>
                            <a rel='noreferrer' target="_blank" className='cursor-pointer' href='#'>
                                <img src={twitter} alt='twitter' className='2xl:w-8' />
                            </a>
                            <a rel='noreferrer' target="_blank" className='cursor-pointer' href='#'>
                                <img src={pinterest} alt='pinterest' className='2xl:w-8' />
                            </a>
                        </div>
                    </div>
                    <div className='col-span-1 md:col-span-3'>
                        <h2 className="mb-3 2xl:mb-8 text-2xl 2xl:text-4xl font-semibold">Explore Links</h2>
                        <ul className='flex flex-col gap-y-4 2xl:gap-y-6'>
                            <li><Link className='text-sm 2xl:text-2xl duration-300 hover:opacity-80 hover:ml-2 font-medium' to='/'>Home</Link></li>
                            <li><Link className='text-sm 2xl:text-2xl duration-300 hover:opacity-80 hover:ml-2 font-medium' to='/about-us'>About Us</Link></li>
                            <li><a rel='noreferrer' target='_blank' className='text-sm 2xl:text-2xl duration-300 hover:opacity-80 hover:ml-2 font-medium' href={termsAndCondition}>Terms & Conditions</a></li>
                            <li><a rel='noreferrer' target='_blank' className='text-sm 2xl:text-2xl duration-300 hover:opacity-80 hover:ml-2 font-medium' href={privacyPolicy}>Privacy & Policy</a></li>
                            <li><a rel='noreferrer' target='_blank' className='text-sm 2xl:text-2xl duration-300 hover:opacity-80 hover:ml-2 font-medium' href={CancellationPolicy}>Cancellation Policy</a></li>
                            <li><Link className='text-sm 2xl:text-2xl duration-300 hover:opacity-80 hover:ml-2 font-medium' to='/contact-us'>Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className='col-span-1 md:col-span-4 lg:col-span-3 2xl:col-span-4'>
                        <h2 className="mb-3 2xl:mb-8 text-2xl 2xl:text-4xl font-semibold">Contact Address</h2>
                        <ul className='flex flex-col gap-y-4 2xl:gap-y-6'>
                            <li><p className='text-sm 2xl:text-2xl'>Elder Fleet Supply Solutions Private Limited</p></li>
                            <li>
                                <p className='text-sm 2xl:text-2xl flex gap-x-2 2xl:gap-x-5'>
                                    <img src={location} alt='location SVG' className='2xl:w-8' />
                                    <span>1/4751, Balbirnagar Extn, Shahdara, Delhi 110032</span>
                                </p>
                            </li>
                            <li>
                                <p className='text-sm 2xl:text-2xl flex gap-x-2 2xl:gap-x-5'>
                                    <img src={phone} alt='location SVG' className='2xl:w-8' />
                                    <span><a href='tel:+91-7428203766'>+91-7428203766</a></span>
                                </p>
                            </li>
                            <li>
                                <p className='text-sm 2xl:text-2xl flex gap-x-2 2xl:gap-x-5'>
                                    <img src={envelope} alt='location SVG' className='2xl:w-8' />
                                    <span><a href='mailto:info@eldercabs.com'>info@eldercabs.com</a></span>
                                </p>
                            </li>
                            <li>
                                <p className='text-sm 2xl:text-2xl flex gap-x-2 2xl:gap-x-5'>
                                    <img src={www} alt='location SVG' className='2xl:w-8' />
                                    <span><a href='https://www.eldercabs.com' rel='noreferrer' target='_blank'>www.eldercabs.com</a></span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="rounded-lg bg-white bg-opacity-30 py-3 2xl:py-5 2xl:px-8 px-2 sm:px-5 flex max-lg:flex-col max-lg:gap-y-5 justify-between items-center">
                    <h3 className="text-xl 2xl:text-3xl font-medium">Newsletter Sign Up</h3>
                    <div className="bg-white py-2 px-2 rounded-md max-lg:w-full lg:w-[500px] 2xl:w-[600px] flex items-center justify-between">
                        <div className='flex-1'>
                            <input type="email" name="email" placeholder="Enter your email here..." className="text-sm 2xl:text-2xl !bg-transparent border-0 sm:px-2 outline-none text-violet-500 w-full" />
                        </div>
                        <button className="bg-violet-200 rounded-lg px-6 py-2 2xl:py-4 2xl:px-10 text-sm 2xl:text-2xl text-violet-700 font-medium">Submit</button>
                    </div>
                </div>
                <div className="flex max-lg:flex-col max-lg:gap-y-5 justify-between items-center pb-20 pt-10 text-white">
                    <p className="text-sm 2xl:text-2xl font-light text-center">© Copyrights 2019 Elder Fleet Supply Solutions Private Limited. All Rights Reserved.</p>
                    <p className="text-sm 2xl:text-2xl font-light text-center">Design and Developed by <a rel="noreferrer" href='https://www.ingelt.com' target="_blank">InGelt</a> Pvt. Ltd.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
