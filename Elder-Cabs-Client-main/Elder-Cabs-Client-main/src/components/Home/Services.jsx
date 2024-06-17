import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

// assets
import img1 from '../../assets/images/home/road-trip.png';
import img2 from '../../assets/images/home/multi-city.png';
import img3 from '../../assets/images/home/one-way.png';
import img4 from '../../assets/images/home/local-trip.png';
import img5 from '../../assets/images/home/transfer.png';
import { useRef } from 'react';


const ServicesItem = ({ title, description, image }) => {
    return (<div className="flex items-center max-sm:gap-y-5 max-sm:flex-col-reverse group-even:sm:flex-row-reverse">
        <div className="sm:w-1/2">
            <h2 className='text-black font-bold text-2xl'>{title}</h2>
            <p className='mt-5 text-sm text-[#00000099] font-medium'>{description}</p>
        </div>
        <div className="sm:w-1/2">
            <img draggable={false} src={image} alt={title} className="w-10/12 max-sm:mx-auto sm:mr-auto group-odd:sm:ml-auto" />
        </div>
    </div>);
}

const Services = () => {

    const prevButton = useRef();
    const nextButton = useRef();

    const slidesArr = [
        {
            title: 'Round-Trip Adventures',
            image: img1,
            description: "For travelers who like to plan ahead and have a fixed itinerary, our Round-Trip service is the ideal choice. Enjoy the convenience of booking your outbound and return journey together, knowing that everything is taken care of. Whether you're traveling for leisure or business, our Round-Trip service ensures a hassle-free and delightful travel experience from start to finish."
        },
        {
            title: 'Multi-City Exploration',
            image: img2,
            description: "If you have a bucket list full of destinations, our Multi-City service is designed just for you. Unleash the explorer within and customize your travel itinerary with multiple stops, each offering its unique charm and attractions. Our expert travel planners are here to assist you in curating a seamless and unforgettable journey across various cities, cultures, and landscapes."
        },
        {
            title: 'One-Way Journeys',
            image: img3,
            description: "Embark on an exciting and liberating adventure with our One-Way service. Perfect for those who prefer spontaneity and wish to explore a destination without the constraint of a return date. Whether you are moving to a new city, seeking a new experience, or just living in the moment, our One-Way journeys will take you there with ease and convenience."
        },
        {
            title: 'Local Experiences',
            image: img4,
            description: "Discover the hidden treasures and local wonders of your chosen destination with our Local service. Immerse yourself in the culture, traditions, and flavors of the place you visit with our knowledgeable local guides. We believe that traveling is not just about the destination, but also about connecting with the heart of the place and its people. Our Local service allows you to do just that."
        },
        {
            title: 'Transfer Services',
            image: img5,
            description: "Arriving at a new destination can be overwhelming, but with our Transfer service, your worries will disappear. We offer reliable and comfortable transfers from airports, train stations, or any other location to your desired destination. Travel with peace of mind knowing that our professional drivers will be waiting to greet you and take you to your next adventure promptly and safely."
        },
    ];

    return (
        <div className="container py-10 mx-auto px-5">
            <h1 className='text-3xl font-bold text-black text-center'>Our Services</h1>
            <div className="mt-10 relative">
                <Swiper
                    autoplay={{
                        delay: 3000,
                        // disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        nextEl: nextButton.current,
                        prevEl: prevButton.current
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevButton.current;
                        swiper.params.navigation.nextEl = nextButton.current;
                    }}
                    speed={1000}
                >
                    {slidesArr.map((item, index) =>
                        <SwiperSlide key={index} className='group'>
                            <ServicesItem {...item} />
                        </SwiperSlide>
                    )}
                    <div className='flex justify-center gap-x-10 mt-8'>
                        <button ref={prevButton} className='bg-violet-500 duration-200 disabled:bg-violet-200 disabled:text-violet-500 text-white rounded-md w-9 h-9 grid place-items-center'>
                            <svg
                                className='w-5 h-5'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 28 26"
                                fill="none"
                            >
                                <path
                                    d="M7.04659 11.3333L15.9866 2.39329L13.6299 0.0366211L0.666586 13L13.6299 25.9633L15.9866 23.6066L7.04659 14.6666H27.3333V11.3333H7.04659Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <button ref={nextButton} className='bg-violet-500 duration-200 disabled:bg-violet-200 disabled:text-violet-500 text-white rounded-md w-9 h-9 grid place-items-center'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-5 h-5'
                                viewBox="0 0 28 26"
                                fill="none"
                            >
                                <path
                                    d="M20.9534 11.3333L12.0134 2.39329L14.3701 0.0366211L27.3334 13L14.3701 25.9633L12.0134 23.6066L20.9534 14.6666H0.666748V11.3333H20.9534Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                </Swiper>

            </div>
        </div>
    );
}

export default Services;
