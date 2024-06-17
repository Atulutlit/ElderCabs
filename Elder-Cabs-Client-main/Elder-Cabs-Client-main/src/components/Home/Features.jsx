// assets
import img1 from '../../assets/images/home/online-booking.svg';
import img2 from '../../assets/images/home/clean-cab.svg';
import img3 from '../../assets/images/home/driver.svg';
import img4 from '../../assets/images/home/24-hours.svg';
import { Link } from 'react-router-dom';


const Features = () => {

    const data = [
        {
            icon: img1,
            title: 'Online Booking',
            content: `"Conveniently book your cab online in just a few clicks. Enjoy a seamless and reliable travel experience with our hassle-free online booking service."`
        },
        {
            icon: img2,
            title: 'Clean Cab',
            content: `"Experience cleanliness and comfort like never before with our meticulously maintained fleet of clean cabs. Enjoy a fresh and hygienic ride every time."`
        },
        {
            icon: img3,
            title: 'Driver Information',
            content: `"Your safety matters to us. Get complete peace of mind with our cab service that provides detailed driver information, ensuring a secure and reliable journey."`
        },
        {
            icon: img4,
            title: '24/7 Availability',
            content: `"Never worry about transportation again. Our cab service is available 24/7, ready to serve you anytime, anywhere. Book your ride with us and experience convenience around the clock."`
        },
    ];


    return (
        <div className="container mx-auto px-5 mt-14">
            <div className="flex max-lg:flex-col-reverse max-lg:gap-y-10 items-center">
                <div className="lg:w-1/2">
                    <div className='flex flex-col gap-y-4 2xl:gap-y-8 xl:pr-16'>
                        <p className='text-xl text-black font-medium 2xl:text-2xl'>Features</p>
                        <h1 className='text-4xl text-black font-bold 2xl:text-6xl'>We’ve created our service with safety in mind, down to every last detail</h1>
                        <p className='text-xl text-black 2xl:text-2xl'>"Book your ride online with ease, enjoy clean and comfortable cabs, get driver details in advance, and avail our 24/7 service. Experience hassle-free commuting with us!"</p>
                        <Link to={'/#booking'}>
                            <button className='rounded-lg w-fit py-2 px-10 shadow-md hover:shadow-none duration-200 hover:bg-transparent border border-violet-200 hover:border-violet-700 bg-violet-200 text-violet-700 text-sm font-medium'>Book Now</button>
                        </Link>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="grid sm:grid-cols-2 gap-5">
                        {data.map((item, index) => <div key={index} className='bg-[#F9F9F9] p-5 rounded-3xl flex flex-col gap-y-3 2xl:gap-y-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]'>
                            <img src={item.icon} alt={item.title} className='w-12 2xl:w-20 h-auto' />
                            <h2 className='text-black text-xl 2xl:text-2xl font-semibold'>{item.title}</h2>
                            <p className='text-black text-sm 2xl:text-xl'>{item.content}</p>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;
