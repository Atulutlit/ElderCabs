import { useState } from "react";
import PropTypes from 'prop-types';
import { beautifyCurrency, tripFare } from "../../utilities";
import { FaAngleRight, FaCarSide } from 'react-icons/fa';
import { FaBagShopping } from 'react-icons/fa6';
import { LiaMoneyBillWaveSolid } from 'react-icons/lia';
import { AiFillCar } from 'react-icons/ai';
import { TbAirConditioning } from 'react-icons/tb';
import { MdOutlineAirlineSeatReclineNormal } from 'react-icons/md';

// assets
import gstImg from '../../assets/images/gst.svg';
import driverImg from '../../assets/images/driver.svg';
import fuelImg from '../../assets/images/fuel.svg';


const FareDetails = ({ children, text }) => {
    return <span className="relative group cursor-pointer">
        {children}
        <span className="!w-[200px] absolute top-full translate-y-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 ">
            {text && <span className="bg-gray-800 block text-white text-center text-xs py-1 px-1 rounded">
                {text}
            </span>}
        </span>
    </span>
}

const Inclusions = ({ tripType, trip }) => {

    return <div className='flex justify-center gap-5 flex-wrap'>
        {tripType === 'one_way_trip' && <>
            <div className='flex flex-col gap-3 items-center'>
                <img src={fuelImg} alt='' className='w-7' />
                <p className='text-black text-xs font-medium'>Base Fare for ₹{trip?.distance} km</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <img src={driverImg} alt='' className='w-7' />
                <p className='text-black text-xs font-medium'>Driver Allowance</p>
            </div>
        </>}

        {tripType === 'round_trip' && <>
            <div className='flex flex-col gap-3 items-center'>
                <img src={fuelImg} alt='' className='w-7' />
                <p className='text-black text-xs font-medium'>Base Fare at ₹{trip?.pricePerKm}/km</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <img src={driverImg} alt='' className='w-7' />
                <p className='text-black text-xs font-medium'>Driver Allowance ( per day )</p>
            </div>
        </>}

        {tripType === 'local_trip' && <>
            <div className='flex flex-col gap-3 items-center'>
                <img src={fuelImg} alt='' className='w-7' />
                <p className='text-black text-xs font-medium'>Base Fare</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <img src={driverImg} alt='' className='w-7' />
                <p className='text-black text-xs font-medium'>Driver Allowance</p>
            </div>
        </>}

        {tripType === 'transfer_trip' && <>
            <div className='flex flex-col gap-3 items-center'>
                <img src={fuelImg} alt='' className='w-7' />
                <p className='text-black text-xs font-medium'>Base Fare</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <img src={driverImg} alt='' className='w-7' />
                <p className='text-black text-xs font-medium'>Driver Allowance</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <LiaMoneyBillWaveSolid className="w-7 h-7 text-black" />
                <p className='text-black text-xs font-medium'>Toll / State tax</p>
            </div>
        </>}

        <div className='flex flex-col gap-3 items-center'>
            <img src={gstImg} alt='' className='w-7' />
            <p className='text-black text-xs font-medium'>GST (5%)</p>
        </div>
    </div>;
}

const Exclusions = ({ tripType, trip, km, noOfDays }) => {

    return <div className='flex justify-center gap-5 flex-wrap'>
        {tripType === 'one_way_trip' && <>
            <div className='flex flex-col gap-3 items-center'>
                <LiaMoneyBillWaveSolid className="w-7 h-7 text-black" />
                <p className='text-black text-xs font-medium'>Pay ₹{trip?.pricePerKm}/km after {trip?.distance} km</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <FaCarSide className="w-7 h-7 text-black" />
                <p className='text-black text-xs font-medium'>Multiple pickups/drops</p>
            </div>
        </>}

        {tripType === 'round_trip' && <>
            <div className='flex flex-col gap-3 items-center'>
                <LiaMoneyBillWaveSolid className="w-7 h-7 text-black" />
                <p className='text-black text-xs font-medium'>Pay ₹{trip?.pricePerKm}/km after {km * noOfDays} km</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <LiaMoneyBillWaveSolid className="w-7 h-7 text-black" />
                {/* <p className='text-black text-xs font-medium'>Toll / State tax (₹1470 - ₹1770)</p> */}
                <p className='text-black text-xs font-medium'>Toll / State tax = Actual</p>
            </div>
        </>}

        {tripType === 'local_trip' && <>
            <div className='flex flex-col gap-3 items-center'>
                <LiaMoneyBillWaveSolid className="w-7 h-7 text-black" />
                <p className='text-black text-xs font-medium'>Pay ₹{trip?.pricePerKm}/km after 80 km</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <LiaMoneyBillWaveSolid className="w-7 h-7 text-black" />
                <p className='text-black text-xs font-medium'>Pay ₹{trip?.pricePerHr}/hr after 8 hr</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <LiaMoneyBillWaveSolid className="w-7 h-7 text-black" />
                <p className='text-black text-xs font-medium'>Toll / State tax</p>
            </div>
        </>}

        <div className='flex flex-col gap-3 items-center'>
            <AiFillCar className="w-7 h-7 text-black" />
            <p className='text-black text-xs font-medium'>Parking</p>
        </div>

    </div>;
}

const Facilities = ({ cab }) => {

    return <div className='flex justify-center gap-5 flex-wrap'>
        <div className='flex flex-col gap-3 items-center'>
            <MdOutlineAirlineSeatReclineNormal className="w-7 h-7 text-black" />
            <p className='text-black text-xs font-medium'>{cab?.seat} Seater</p>
        </div>
        <div className='flex flex-col gap-3 items-center'>
            <FaBagShopping className="w-7 h-7 text-black" />
            <p className='text-black text-xs font-medium'>{cab?.bag} Bags</p>
        </div>
        {cab?.ac && <div className='flex flex-col gap-3 items-center'>
            <TbAirConditioning className="w-7 h-7 text-black" />
            <p className='text-black text-xs font-medium'>AC</p>
        </div>}
    </div>;
}

const CabItem = ({ cab, trip, tripType, selectCab, pickupDate, returnDate, surgeDates, termsAndConditions }) => {

    const [tab, setTab] = useState(0);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const { name, image, type, fare: cabFare, } = cab;

    const { advanceFare, totalFare, noOfDays } = tripFare({ cabFare, pickupDate, returnDate, surgeDates, trip, tripType });

    const tooltipText = (() => {
        switch (tripType) {
            case 'one_way_trip':
                return 'Price Per KM * Distance + Driver Allowance + Cab Fare + 5% GST';
            case 'round_trip':
                return 'Price Per KM * Distance + ( Driver Allowance * No of Days ) + Cab Fare + 5% GST';
            case 'local_trip':
                return 'Base Price + Cab Fare + 5% GST';
            case 'transfer_trip':
                return 'Base Price + Cab Fare + 5% GST';
            default:
                break;
        }
    })();

    return <div>
        <div className={`rounded-xl duration-300 ${!detailsOpen && 'shadow-lg'} border border-violet-400 px-3 sm:px-5 py-5 flex flex-col gap-5`}>

            {/* cab details and fare start */}
            <div className='flex flex-wrap gap-2 justify-between'>
                <div className='w-[calc(100%/2-20px)] lg:w-[calc(100%/4-20px)]'>
                    <img draggable={false} src={import.meta.env.VITE_API_URL + '/' + image} alt='' className='object-cover w-full aspect-[16/10] mix-blend-darken' />
                </div>
                <div className='w-[calc(100%/2-20px)] lg:w-[calc(100%/4-20px)]'>
                    <h3 className='text-black text-2xl font-bold'>{type}</h3>
                    <p className='text-black font-medium text-sm'>{name}</p>
                </div>
                <div className='w-[calc(100%/2-20px)] lg:w-[calc(100%/4-20px)] text-center'>
                    <h3 className='text-black text-2xl font-medium'>Advance</h3>
                    <h3 className='text-black text-2xl font-bold'>&#8377; {beautifyCurrency(advanceFare)}</h3>
                    <p className=' text-sm font-medium text-green-500'>Advance</p>
                </div>
                <div className='w-[calc(100%/2-20px)] lg:w-[calc(100%/4-20px)] text-center'>
                    <h3 className='text-black text-2xl font-medium'>Total Price</h3>
                    <h3 className='text-black text-2xl font-bold'>&#8377;{beautifyCurrency(totalFare)}</h3>
                    <p className=' text-sm font-medium text-violet-500'>
                        <FareDetails text={tooltipText}>Fare Details</FareDetails>
                    </p>
                </div>
            </div>
            {/* cab details and fare end */}

            <div className='flex justify-between items-center'>
                <span onClick={() => setDetailsOpen(!detailsOpen)} className='flex gap-x-1 font-medium cursor-pointer items-center text-violet-500 text-sm'>
                    Details <FaAngleRight className={`mt-0.5 duration-300 ${detailsOpen && 'rotate-90'}`} />
                </span>
                <button onClick={() => selectCab(trip._id)} className='rounded-lg w-fit py-2 px-10 shadow-md hover:shadow-none duration-200 hover:bg-transparent border border-violet-200 hover:border-violet-700 bg-violet-200 text-violet-700 text-sm font-medium'>Select Cab</button>
            </div>

            <div className={`duration-300 transition-all max-h-0 overflow-hidden ${detailsOpen && '!max-h-screen'}`}>
                <div className='flex flex-wrap max-md:gap-2 gap-4 border-violet-400 border-t pt-3'>
                    <button onClick={() => setTab(0)} className={`text-sm max-md:text-xs font-medium rounded-lg ${tab === 0 ? 'bg-violet-500 text-white' : 'bg-transparent text-violet-600'} border border-violet-500 px-5 py-1.5 duration-300 hover:bg-violet-500 hover:text-white`}>Inclusions</button>
                    <button onClick={() => setTab(1)} className={`text-sm max-md:text-xs font-medium rounded-lg ${tab === 1 ? 'bg-violet-500 text-white' : 'bg-transparent text-violet-600'} border border-violet-500 px-5 py-1.5 duration-300 hover:bg-violet-500 hover:text-white`}>Exclusions</button>
                    <button onClick={() => setTab(2)} className={`text-sm max-md:text-xs font-medium rounded-lg ${tab === 2 ? 'bg-violet-500 text-white' : 'bg-transparent text-violet-600'} border border-violet-500 px-5 py-1.5 duration-300 hover:bg-violet-500 hover:text-white`}>Facilities</button>
                    <button onClick={() => setTab(3)} className={`text-sm max-md:text-xs font-medium rounded-lg ${tab === 3 ? 'bg-violet-500 text-white' : 'bg-transparent text-violet-600'} border border-violet-500 px-5 py-1.5 duration-300 hover:bg-violet-500 hover:text-white`}>T&C</button>
                </div>
                <div className='mt-5'>

                    {tab === 0 && <Inclusions tripType={tripType} trip={trip} />}
                    {tab === 1 && <Exclusions tripType={tripType} trip={trip} km={trip?.noOfKmCharge} noOfDays={noOfDays} />}
                    {tab === 2 && <Facilities cab={cab} />}

                    {tab === 3 && <ul className='pl-4 list-disc text-xs text-black space-y-1'>
                        {Array.isArray(termsAndConditions) && termsAndConditions.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>}

                </div>
            </div>
        </div>
    </div>
}

// CabItem component props type validation
CabItem.propTypes = {
    cab: PropTypes.object,
    trip: PropTypes.object,
    tripType: PropTypes.string,
    selectCab: PropTypes.func,
    pickupDate: PropTypes.string,
    returnDate: PropTypes.string,
    surgeDates: PropTypes.array,
    termsAndConditions: PropTypes.array
};

// Inclusions component props type validation
Inclusions.propTypes = {
    trip: PropTypes.object,
    tripType: PropTypes.string,
};

// Exclusions component props type validation
Exclusions.propTypes = {
    trip: PropTypes.object,
    tripType: PropTypes.string,
    km: PropTypes.string,
};

// Facilities component props type validation
Facilities.propTypes = {
    cab: PropTypes.object,
};

FareDetails.propTypes = {
    children: PropTypes.element,
    text: PropTypes.string
};

export default CabItem;