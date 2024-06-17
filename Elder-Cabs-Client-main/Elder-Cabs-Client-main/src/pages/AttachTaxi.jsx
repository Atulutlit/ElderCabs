// components
import Form from '../components/AttachTaxi/Form';

//assets
import heroImg from '../assets/images/attach-taxi/hero.png';
import cityImg from '../assets/images/attach-taxi/city.svg';
import { useEffect } from 'react';

const AttachTaxi = () => {

    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    return (
        <div>
            <div className='relative'>
                <div className='w-full h-[70vh] after:content-[""] after:w-full after:h-full after:bg-[#00000075] after:top-0 after:left-0 after:absolute'>
                    <img src={heroImg} alt='contact hero' className='w-full h-full object-cover' />
                </div>
                <div className='absolute container top-0 left-1/2 -translate-x-1/2 h-full flex items-center px-5 md:px-10'>
                    <div className='md:w-1/2'>
                        <h1 className='text-white text-4xl 2xl:text-6xl font-semibold'>Attach Your Taxi</h1>
                        {/* <p className='text-white mt-3 text-sm 2xl:text-2xl'>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation</p> */}
                    </div>
                </div>
            </div>
            <Form />
            <div className='w-full h-auto pb-20'>
                <img src={cityImg} alt='City' className='w-full h-auto' />
            </div>
        </div>
    );
}

export default AttachTaxi;
