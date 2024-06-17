import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css'

// assets
import img1 from '../../assets/images/blog/hero.png';
import img2 from '../../assets/images/blog/slide-1.webp';
import img3 from '../../assets/images/blog/slide-2.webp';
import img4 from '../../assets/images/blog/slide-3.webp';

const HeroSlider = () => {
    return (
        <div className='h-full'>
            <Swiper
                speed={1500}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop={true}
                className='!h-full -z-40'
            >
                <SwiperSlide className='!h-full' >
                    <img draggable={false} src={img1} alt='Blog Hero' className='w-full h-full object-cover' />
                </SwiperSlide>
                <SwiperSlide className='!h-full' >
                    <img draggable={false} src={img2} alt='Blog Hero' className='w-full h-full object-cover' />
                </SwiperSlide>
                <SwiperSlide className='!h-full' >
                    <img draggable={false} src={img3} alt='Blog Hero' className='w-full h-full object-cover' />
                </SwiperSlide>
                <SwiperSlide className='!h-full' >
                    <img draggable={false} src={img4} alt='Blog Hero' className='w-full h-full object-cover' />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default HeroSlider;
