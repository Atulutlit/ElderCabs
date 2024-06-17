import React from 'react';
import sectionHeading from '../../utility/sectionHeading';
import TourSlider from '../TourSlider/TourSlider';
// import Slide from './Slide/Slide';

const Tours = () => {
    const SectionHeading = sectionHeading("Tours", "We provide you with interesting and exciting tours to different parts of the world")
    return (
        <div className='px-3 container mx-auto !h-auto'>
            {
                SectionHeading
            }
            <TourSlider />
            {/* <Slide /> */}
        </div>
    );
};

export default Tours;