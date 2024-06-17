import React from 'react';
import sectionHeading from '../../utility/sectionHeading';
import Masonry from './Masonry';

const Gallery = () => {
    const SectionHeading = sectionHeading("Gallery", "-Moments of Life");
    return (
        <div className='lg:px-[100px] md:px-[50px] px-5'>
            {
                SectionHeading
            }
            <Masonry />
        </div>
    );
}

export default Gallery;