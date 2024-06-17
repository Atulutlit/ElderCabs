import * as React from "react";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import img1 from "../../assets/img/gallery/img1.webp";
import img2 from "../../assets/img/gallery/img2.webp";
import img3 from "../../assets/img/gallery/img3.webp";
import img4 from "../../assets/img/gallery/img4.webp";
import img5 from "../../assets/img/gallery/img5.webp";
import img6 from "../../assets/img/gallery/img6.webp";
import img7 from "../../assets/img/gallery/img7.webp";
import img8 from "../../assets/img/gallery/img8.webp";
import img9 from "../../assets/img/gallery/img9.webp";
import img10 from "../../assets/img/gallery/img10.webp";
import img11 from "../../assets/img/gallery/img11.webp";
import img12 from "../../assets/img/gallery/img12.webp";
import img13 from "../../assets/img/gallery/img13.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ImageMasonry() {
    return (
        <Box sx={{ width: '100%', minHeight: 829, marginTop: 5, marginBottom: 5 }}>
            <Masonry
                columns={{ xs: 2, sm: 3, md: 5 }}
                spacing={2}
            >
                {itemData.map((item, index) => {
                    if (item.img !== '') {
                        return (
                            <div style={{ height: item.ht }} key={index}>
                                <LazyLoadImage
                                    src={`${item.img}?w=162&auto=format`}
                                    srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                                    alt={''}
                                    className='w-full h-full object-cover rounded-lg'
                                />
                            </div>
                        )
                    }
                    else {
                        return (
                            <div style={{ height: item.ht }} key={index}>
                                <></>
                            </div>
                        )
                    }
                })}
            </Masonry>
        </Box>
    );
}

const itemData = [
    {
        img: '',
        ht: 200,
    },
    {
        img: '',
        ht: 100,
    },
    {
        img: img1,
        ht: 400,
    },
    {
        img: '',
        ht: 100,
    },
    {
        img: '',
        ht: 200,
    },
    {
        img: img2,
        ht: 250,
    },
    {
        img: img3,
        ht: 250,
    },
    {
        img: img4,
        ht: 250,
    },
    {
        img: img5,
        ht: 150,
    },
    {
        img: img6,
        ht: 200,
    },
    {
        img: img7,
        ht: 250,
    },
    {
        img: img8,
        ht: 200,
    },
    {
        img: img9,
        ht: 150,
    },
    {
        img: img10,
        ht: 200,
    },
    {
        img: img11,
        ht: 200,
    },
    {
        img: img12,
        ht: 250,
    },
    {
        img: img13,
        ht: 250,
    },
];