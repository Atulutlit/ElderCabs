import { Link, NavLink, useLocation } from "react-router-dom";

// assets
import logo from '../../assets/images/logo.png';
import whiteLogo from '../../assets/images/logo-white.png';
import { useEffect, useState } from "react";

const Header = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [sticky, setSticky] = useState(false);

    const navLinks = [
        { path: '/', name: 'Home' },
        { path: '/#about-us', name: 'About Us' },
        { path: '/attach-taxi', name: 'Attach Taxi ' },
        { path: '/blog', name: 'Blog' },
    ];

    useEffect(() => {
        const menus = document.querySelectorAll('.navLink');
        menus.forEach(element => {
            element.onClick = setIsOpen(false);
        });

        const __scroll = () => {
            if (50 < window.scrollY) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        }

        document.addEventListener('scroll', __scroll);

        return () => document.removeEventListener('scroll', __scroll);

    }, []);

    return (
        <header className="w-full z-40 fixed top-0 left-0 overflow-hidden max-lg:bg-violet-500">
            <span className={`max-lg:hidden absolute bg-violet-500 top-0 right-0 ${sticky ? 'translate-x-0 rounded-l-none' : 'translate-x-full rounded-l-full'} h-full w-[100vw] duration-300`}></span>
            <div className="container mx-auto px-5 flex justify-between ">
                <Link to='/' className="inline-block py-2 px-2 z-[1]">
                    <img src={(() => {
                        if (window.innerWidth < 1024) return whiteLogo;
                        else if (['/blog', '/cabs', '/cabs/booking'].includes(location.pathname) && !sticky) return logo;
                        else if (sticky) return whiteLogo;
                        else return whiteLogo;
                    })()} alt="Elder Cabs Logo" className={`${sticky && 'lg:!w-12 2xl:!w-20'} w-16 2xl:w-24 duration-300 h-auto`} />
                </Link>
                <button onClick={() => setIsOpen(true)} className="text-white bg-transparent outline-none border-none lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <nav className={`bg-violet-500 lg:pl-28 lg:rounded-l-full lg:relative max-lg:z-50 max-lg:shadow-2xl max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-[100vh] duration-200 max-lg:w-[50vw] ${isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-[60vw]'}`}>
                    <span className={`lg:hidden absolute top-0 right-0 w-[50vw] h-full bg-[#00000075] -z-10 duration-200 delay-100 ${isOpen ? 'translate-x-full opacity-100' : 'translate-x-0 opacity-0'}`}></span>
                    <span className=" max-lg:hidden absolute bg-violet-500 top-0 right-0 translate-x-full h-full w-[100vw]"></span>
                    <button onClick={() => setIsOpen(false)} className="text-white top-5 right-5 absolute lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <ul className="max-lg:bg-violet-500 flex max-lg:flex-col max-lg:justify-center max-sm:gap-y-3 max-lg:gap-y-6 h-full items-center gap-x-5">
                        {navLinks.map(item => <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={'navLink font-medium max-sm:text-base max-lg:text-xl text-sm 2xl:text-2xl text-white inline-block py-3 px-6'}
                            >{item.name}</NavLink>
                        </li>)}
                        <li>
                            <NavLink
                                to='/contact-us'
                                className={'navLink font-medium max-sm:text-base max-lg:text-xl text-sm 2xl:text-2xl inline-block py-2.5 2xl:py-5 2xl:px-10 px-6 bg-violet-200 hover:bg-transparent duration-200 hover:text-violet-200 rounded-md text-violet-700 border-2 border-violet-200'}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
