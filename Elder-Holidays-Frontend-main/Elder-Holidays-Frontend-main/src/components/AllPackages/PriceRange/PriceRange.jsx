import React, { useState } from 'react';
import style from './PriceRange.module.css'

const PriceRange = ({ range, setRange }) => {


    const rangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'min') {
            parseInt(range.max) > parseInt(value) && setRange({ ...range, min: value });
        } else if (name === 'max') {
            parseInt(range.min) < parseInt(value) && setRange({ ...range, max: value });
        }
    }

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center">
                <div>
                    <label>Min</label>
                    <p id="min-value">&#8377;{range.min}</p>
                </div>
                <div>
                    <label>Max</label>
                    <p id="max-value">&#8377;{range.max}</p>
                </div>
            </div>
            <div className={`w-full relative mt-2 h-2 ${style.PriceRange}`}>
                <input type="range" name="min" onChange={rangeHandler} value={range.min} className={style.minPrice} min="0" max="500" step="20" />
                <input type="range" name="max" onChange={rangeHandler} value={range.max} className={style.maxPrice} min="0" max="500" step="20" />
            </div>
        </div>
    );
}

export default PriceRange;
