// components
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaMinus, FaCalendar, FaClock, FaLocationDot } from 'react-icons/fa6';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import BookingSVG from './BookingSVG';
import moment from 'moment/moment';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import placeApi from '../../api/place';
import tripsApi from '../../api/trips';
import PropTypes from 'prop-types';
import SelectInput from './SelectInput';
import DatePickerInput from './DatePickerInput';

//filter time 
const filterTime = (time, pickupDate) => {

    const currentDate = new Date();
    const tomorrowDate = moment().add(1, 'day').format('YYYY-MM-DD');
    pickupDate = moment(pickupDate);
    const selectedDate = new Date(time);

    if ((currentDate.getHours() > 21 || currentDate.getHours() < 6) && (pickupDate.isSame(currentDate, 'day') || pickupDate.isSame(tomorrowDate, 'day'))) {
        if (selectedDate.getHours() > 21) {
            return false;
        }
        if (selectedDate.getHours() < 6) {
            return false;
        }
        return true;
    }

    if (pickupDate.isSame(tomorrowDate, 'day')) {
        if (selectedDate.getHours() < 6 && currentDate.getHours() > 21) {
            return false;
        }
    }

    currentDate.setHours(currentDate.getHours() + 6);

    if (!pickupDate) {
        return currentDate.getTime() < selectedDate.getTime();
    }

    if (moment(pickupDate).format('DD-MM-YYYY') !== moment().format('DD-MM-YYYY')) {
        return time;
    }

    return currentDate.getTime() < selectedDate.getTime();
}

// One Way Component
const OneWayTrip = ({ handleClick }) => {

    // states
    const [sourceCities, setSourceCities] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [filterDes, setFilterDes] = useState(null); // filter destination array
    const [disabledTimeInput, setDisabledTimeInput] = useState(true);

    // react-hook-form
    const Form = useForm({
        values: {
            trip: 'one_way_trip',
            purpose: 'One-way Trip with Elder-Cabs'
        }
    });
    const { setValue, handleSubmit, getValues, watch } = Form;

    useEffect(() => {
        watch((values, { name }) => {
            if (name === 'pickupDate') {
                setValue('pickupTime', null);
                if (values?.pickupDate) {
                    setDisabledTimeInput(false);
                } else {
                    setDisabledTimeInput(true);
                }
            }
            if (name === 'sourceCity') {
                const selectedCity = values.sourceCity;
                const filterDestination = destinations[selectedCity] ? destinations[selectedCity] : []
                if (selectedCity) {
                    setFilterDes(filterDestination);
                } else {
                    setFilterDes(null);
                }
            }
        });
    }, [watch, destinations]);

    // fetch places for one way
    useEffect(() => {
        (async () => {
            try {
                const res = await tripsApi.getOneWayPlaces();
                if (res.data) {
                    res.data?.source && setSourceCities(res.data?.source);
                    res.data?.destination && setDestinations(res.data?.destination);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return <form className='grid sm:grid-cols-3 gap-5' onSubmit={handleSubmit(handleClick)}>

        {/* source cities */}
        <SelectInput
            Form={Form}
            disabled={false}
            name='sourceCity'
            options={sourceCities}
            placeholder='Select Source City'
            required='Source city is required'
        />

        {/* destinations cities */}
        <SelectInput
            Form={Form}
            disabled={Boolean(!filterDes)}
            name='destination'
            options={filterDes}
            placeholder='Select Destination'
            required='Destination city is required'
        />

        {/* date input */}
        <DatePickerInput
            Form={Form}
            name='pickupDate'
            placeholder={'Select Pickup Date'}
            required='Pickup date is required'
            dateFormat={'d-MM-yyyy'}
            minDate={true}
            icon={<FaCalendar className={'w-5 h-5 text-[#666666]'} />}
        />

        {/* time input */}
        <DatePickerInput
            Form={Form}
            name='pickupTime'
            placeholder={'Select Pickup Time'}
            required='Pickup time is required'
            dateFormat={'h:mm aa'}
            filterTime={(time) => filterTime(time, getValues('pickupDate'))}
            minDate={true}
            showTimeOnly={true}
            disabled={disabledTimeInput}
            icon={<FaClock className='w-5 h-5 text-[#666666]' />}
        />

        <div className=''>
            <button type='submit' className='bg-violet-200 disabled:opacity-70 w-full text-sm 2xl:text-xl px-8 py-3 shadow-xl rounded-lg text-violet-600 font-medium'>Get a Cab</button>
        </div>
    </form>
}

// Round Trip Component
const RoundTrip = ({ handleClick }) => {

    // states
    const [pickupDate, setPickupDate] = useState(null);
    const [sourceCities, setSourceCities] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [filterDes, setFilterDes] = useState(null);

    // react-hook-form
    const Form = useForm({
        values: {
            trip: 'round_trip',
            purpose: 'Round Trip with Elder-Cabs'
        }
    });

    const { setValue, watch, handleSubmit, control, getValues, formState: { errors } } = Form;

    // destinations
    const { fields, remove, append } = useFieldArray({ name: 'destinations', control: control });

    // fetch cities for round trip
    useEffect(() => {
        (async () => {
            try {
                const res = await tripsApi.getRoundTripPlaces();
                let data = res.data;
                if (data) {
                    data?.source && setSourceCities(data?.source);
                    data?.destination && setDestinations(data?.destination);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    // filter destination by source city and clear pickup time and date value
    useEffect(() => {
        watch((values, { name }) => {
            if (name === 'pickupDate') {
                setValue('pickupTime', null);
                setValue('returnDate', null);
                if (values?.pickupDate) {
                    setPickupDate(values.pickupDate);
                } else {
                    setPickupDate(null);
                }
            }
            if (name === 'sourceCity') {
                const selectedCity = values.sourceCity;
                const filterDestination = destinations[selectedCity] ? destinations[selectedCity] : []
                if (selectedCity) {
                    setFilterDes(filterDestination);
                } else {
                    setFilterDes(null);
                }
            }
        });
    }, [watch, destinations]);

    return <form className='grid sm:grid-cols-3 gap-5' onSubmit={handleSubmit(handleClick)}>

        {/* source cities */}
        <SelectInput
            Form={Form}
            disabled={false}
            name='sourceCity'
            options={sourceCities}
            placeholder='Select Source City'
            required='Source city is required'
        />

        {/* destinations cities */}
        <SelectInput
            Form={Form}
            disabled={Boolean(!filterDes)}
            name='destination'
            options={filterDes}
            placeholder='Select Destination'
            required='Destination city is required'
        />

        {/* destinations cities */}
        {fields.map((field, index) =>
            <div key={field.id}>
                <Controller
                    control={control}
                    name={`destinations[${index}].destination`}
                    rules={{ required: 'Destination city is required' }}
                    render={({ field: { value, name, onChange } }) =>
                        <div className='relative'>
                            <select
                                value={value || ''}
                                name={name}
                                onChange={onChange}
                                className='text-black !bg-transparent text-sm 2xl:!text-xl font-semibold w-full px-3 py-3 rounded-md outline-none border border-[#00000066] appearance-none cursor-pointer'
                            >
                                <option value=''>Select Destination</option>
                                {Array.isArray(filterDes) && filterDes.map(item => <option key={item} value={item}>{item}</option>)}
                            </select>
                            <span className='inline-block cursor-pointer absolute top-1/2 right-5 -translate-y-1/2'>
                                <FaMinus onClick={() => remove(index)} className={'w-5 h-5 text-[#666666]'} />
                            </span>
                        </div>
                    }
                />
                {errors?.destinations?.[index].destination && <span className='text-xs text-red-500 font-medium pl-2'>{errors.destinations[index].destination?.message}</span>}
            </div>
        )}

        <div className=''>
            <button type='button' onClick={() => append({ destination: '' })} className='w-full py-3 text-[#666666] text-center border border-[#666666] rounded-md outline-none flex justify-center items-center text-sm font-medium gap-x-3'>
                Add More Destinations
                <FaPlus className='w-5 h-5' />
            </button>
        </div>

        <div className='flex gap-x-2'>

            {/* date input */}
            <DatePickerInput
                Form={Form}
                name='pickupDate'
                placeholder={'Select Pickup Date'}
                required='Pickup date is required'
                dateFormat={'d-MM-yyyy'}
                minDate={true}
                icon={<FaCalendar className={'w-5 h-5 text-[#666666]'} />}
            />

            {/* time input */}
            <DatePickerInput
                Form={Form}
                name='pickupTime'
                placeholder={'Select Pickup Time'}
                required='Pickup time is required'
                dateFormat={'h:mm aa'}
                filterTime={(time) => filterTime(time, getValues('pickupDate'))}
                minDate={true}
                showTimeOnly={true}
                disabled={Boolean(!pickupDate)}
                icon={<FaClock className='w-5 h-5 text-[#666666]' />}
            />

            {/* 
            <div className='w-1/2'>
                <Controller
                    control={control}
                    name='pickupDate'
                    rules={{ required: 'Pickup date is required' }}
                    render={({ field: { name, value } }) => <DateInput
                        placeholder={'Pickup Date'}
                        name={name}
                        value={value}
                        icon={<FaCalendar className={'w-5 h-5 text-[#666666]'} />}
                        onChange={(date) => {
                            setValue(name, date);
                            clearErrors(name);
                            setValue('pickupTime', null);
                            setPickupDate(date);
                        }}
                        dateFormat={'d-MM-yyyy'}
                        // maxDate={true}
                        minDate={true}
                    />}
                />
                {errors?.pickupDate && <span className='text-xs text-red-500 font-medium pl-2'>{errors.pickupDate?.message}</span>}
            </div>
            <div className='w-1/2'>
                <Controller
                    control={control}
                    name='pickupTime'
                    rules={{ required: 'Pickup time is required' }}
                    render={({ field: { name, value } }) => <DateInput
                        placeholder={'Select Pickup Time'}
                        name={name}
                        value={value}
                        disabled={Boolean(!pickupDate)}
                        showTimeOnly={true}
                        icon={<FaClock className='w-5 h-5 text-[#666666]' />}
                        onChange={(time) => {
                            setValue(name, time);
                            clearErrors(name)
                        }}
                        dateFormat={'h:mm aa'}
                        filterTime={(time) => filterTime(time, getValues('pickupDate'))}
                    />}
                />
                {errors?.pickupTime && <span className='text-xs text-red-500 font-medium pl-2'>{errors.pickupTime?.message}</span>}
            </div> */}
        </div>

        {/* return date input */}
        <DatePickerInput
            Form={Form}
            name='returnDate'
            placeholder={'Select Return Date'}
            required='Return date is required'
            dateFormat={'d-MM-yyyy'}
            minDate={pickupDate}
            disabled={Boolean(!pickupDate)}
            icon={<FaCalendar className={'w-5 h-5 text-[#666666]'} />}
        />

        {/* <div>
            <Controller
                control={control}
                name='returnDate'
                rules={{ required: 'Return date is required' }}
                render={({ field: { name, value } }) => <DateInput
                    placeholder={'Return Date'}
                    name={name}
                    value={value}
                    disabled={Boolean(!pickupDate)}
                    icon={<FaCalendar className={'w-5 h-5 text-[#666666]'} />}
                    onChange={(date) => {
                        setValue(name, date);
                        clearErrors(name)
                    }}
                    dateFormat={'d-MM-yyyy'}
                    // maxDate={true}
                    minDate={pickupDate}
                />}
            />
            {errors?.returnDate && <span className='text-xs text-red-500 font-medium pl-2'>{errors.returnDate?.message}</span>}

        </div> */}

        <div className=''>
            <button type='submit' className='bg-violet-200 disabled:opacity-70 w-full text-sm 2xl:text-xl px-8 py-3 shadow-xl rounded-lg text-violet-600 font-medium'>Get a Cab</button>
        </div>
    </form>

}

// Transfer Trip Component
const TransferTrip = ({ handleClick }) => {

    // states
    const [pickupDate, setPickupDate] = useState(null);
    const [sourceCities, setSourceCities] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [filterDes, setFilterDes] = useState(null);

    // react-hook-form
    const Form = useForm({
        values: {
            trip: 'transfer_trip',
            purpose: 'Transfer Trip with Elder-Cabs'
        }
    });
    const { setValue, handleSubmit, watch, getValues } = Form;

    // fetch cities for transfer trip
    useEffect(() => {
        (async () => {
            try {
                const res = await tripsApi.getTransferTripsPlaces();
                let data = res.data;
                if (data) {
                    data?.source && setSourceCities(data?.source);
                    data?.destination && setDestinations(data?.destination);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    // filter destinations and clear pickup time
    useEffect(() => {
        watch((values, { name }) => {
            if (name === 'pickupDate') {
                setValue('pickupTime', null);
                if (values?.pickupDate) {
                    setPickupDate(values.pickupDate);
                } else {
                    setPickupDate(null);
                }
            }
            if (name === 'sourceCity') {
                const selectedCity = values.sourceCity;
                const filterDestination = destinations[selectedCity] ? destinations[selectedCity] : []
                if (selectedCity) {
                    setFilterDes(filterDestination);
                } else {
                    setFilterDes(null);
                }
            }
        });
    }, [watch, destinations]);

    return <form className='grid sm:grid-cols-3 gap-5' onSubmit={handleSubmit(handleClick)}>

        {/* source cities */}
        <SelectInput
            Form={Form}
            disabled={false}
            name='sourceCity'
            options={sourceCities}
            placeholder='Select Source City'
            required='Source city is required'
        />

        {/* destinations cities */}
        <SelectInput
            Form={Form}
            disabled={Boolean(!filterDes)}
            name='destination'
            options={filterDes}
            placeholder='Select Destination'
            required='Destination city is required'
        />

        {/* date input */}
        <DatePickerInput
            Form={Form}
            name='pickupDate'
            placeholder={'Select Pickup Date'}
            required='Pickup date is required'
            dateFormat={'d-MM-yyyy'}
            minDate={true}
            icon={<FaCalendar className={'w-5 h-5 text-[#666666]'} />}
        />

        {/* time input */}
        <DatePickerInput
            Form={Form}
            name='pickupTime'
            placeholder={'Select Pickup Time'}
            required='Pickup time is required'
            dateFormat={'h:mm aa'}
            filterTime={(time) => filterTime(time, getValues('pickupDate'))}
            minDate={true}
            showTimeOnly={true}
            disabled={Boolean(!pickupDate)}
            icon={<FaClock className='w-5 h-5 text-[#666666]' />}
        />

        <div className=''>
            <button type='submit' className='bg-violet-200 disabled:opacity-70 w-full text-sm 2xl:text-xl px-8 py-3 shadow-xl rounded-lg text-violet-600 font-medium'>Get a Cab</button>
        </div>
    </form >
}

// Local Trip Component
const LocalTrip = ({ handleClick }) => {

    // states
    const [pickupDate, setPickupDate] = useState(null);
    const [sourceCities, setSourceCities] = useState([]);

    // react-hook-form
    const Form = useForm({
        values: {
            trip: 'local_trip',
            purpose: 'Local Trip with Elder-Cabs'
        }
    });
    const { setValue, handleSubmit, watch, getValues } = Form;

    // fetch cities for local trip
    useEffect(() => {
        (async () => {
            try {
                const res = await tripsApi.getLocalTripsPlaces();
                let data = res.data;
                if (data) {
                    data?.source && setSourceCities(data?.source);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    // clear pickup time
    useEffect(() => {
        watch((values, { name }) => {
            if (name === 'pickupDate') {
                setValue('pickupTime', null);
                if (values?.pickupDate) {
                    setPickupDate(values.pickupDate);
                } else {
                    setPickupDate(null);
                }
            }

        });
    }, [watch]);

    return <form className='grid sm:grid-cols-3 gap-5' onSubmit={handleSubmit(handleClick)}>

        {/* source cities */}
        <SelectInput
            Form={Form}
            disabled={false}
            name='sourceCity'
            options={sourceCities}
            placeholder='Select Source City'
            required='Source city is required'
        />

        {/* date input */}
        <DatePickerInput
            Form={Form}
            name='pickupDate'
            placeholder={'Select Pickup Date'}
            required='Pickup date is required'
            dateFormat={'d-MM-yyyy'}
            minDate={true}
            icon={<FaCalendar className={'w-5 h-5 text-[#666666]'} />}
        />

        {/* time input */}
        <DatePickerInput
            Form={Form}
            name='pickupTime'
            placeholder={'Select Pickup Time'}
            required='Pickup time is required'
            dateFormat={'h:mm aa'}
            filterTime={(time) => filterTime(time, getValues('pickupDate'))}
            minDate={true}
            showTimeOnly={true}
            disabled={Boolean(!pickupDate)}
            icon={<FaClock className='w-5 h-5 text-[#666666]' />}
        />

        <div className=''>
            <button type='submit' className='bg-violet-200 disabled:opacity-70 w-full text-sm 2xl:text-xl px-8 py-3 shadow-xl rounded-lg text-violet-600 font-medium'>Get a Cab</button>
        </div>
    </form>
}


const Booking = () => {

    const location = useLocation();
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();


    useEffect(() => {
        if (location.hash === '#booking') {
            const element = document.getElementById('booking');
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    }, [location]);


    useEffect(() => {
        (async () => {
            try {
                const res = await placeApi.getAll();
                const getPlaces = Array.isArray(res.data) ? res.data.map(i => i.name) : [];
                setPlaces(getPlaces);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    // convert object to query string
    const objectToQueryString = (obj) => {
        return Object.keys(obj)
            .map((key) => {
                const value = obj[key];
                if (Array.isArray(value)) {
                    return value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item?.destination)}`).join('&');
                }
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            })
            .join('&');
    }

    // move to cabs page
    const handleClick = (data) => {
        data.pickupDate = moment(data.pickupDate).format('DD-MM-YYYY');
        data.pickupTime = moment(data.pickupTime).format('LT');
        if (data.returnDate) {
            data.returnDate = moment(data.returnDate).format('DD-MM-YYYY');
        }
        const queryString = objectToQueryString(data);
        navigate(`/cabs?${queryString}`);
    }


    return (
        <div id='booking'>
            <div className='bg-violet-500 py-6'>
                <div className='container mx-auto max-sm:px-3 px-5'>
                    <h1 className='text-3xl font-semibold text-white'>Book Your Cab</h1>
                    <div className='mt-10'>
                        <div className='flex w-fit relative z-0'>
                            {/* ${tab ? 'translate-x-full' : ''} */}
                            <span
                                className={`absolute top-0 w-1/4 bg-white block h-full rounded-t-lg -z-10 duration-200`}
                                style={{
                                    left: (() => {
                                        switch (search.get('tab')) {
                                            case 'round_trip':
                                                return `${100 / 4 * 1}%`;
                                            case 'local_trip':
                                                return `${100 / 4 * 2}%`;
                                            case 'transfer_trip':
                                                return `${100 / 4 * 3}%`;
                                            default:
                                                return `${100 / 4 * 0}%`;
                                        }
                                    })()
                                }}
                            >
                                <span className='block absolute bottom-0 left-full w-5 h-3 bg-white after:content-[""] after:w-full after:h-full after:bg-violet-500 after:absolute after:rounded-bl-full'></span>
                                <span className={`${!search.get('tab') && 'opacity-0'} duration-200 block absolute bottom-0 right-full w-5 h-3 bg-white after:content-[""] after:w-full after:h-full after:bg-violet-500 after:absolute after:rounded-br-full`}></span>
                            </span>
                            <button onClick={() => setSearch({})} className={`px-2 text-center max-sm:w-20 w-32 2xl:w-44 py-3 max-sm:text-xs text-sm 2xl:text-xl duration-200 font-semibold ${!search.get('tab') ? 'text-violet-500' : 'text-white'}`}>One Way</button>
                            <button onClick={() => setSearch({ tab: 'round_trip' })} className={`px-2 text-center max-sm:w-20 w-32 2xl:w-44 py-3 max-sm:text-xs text-sm 2xl:text-xl duration-200 font-semibold ${search.get('tab') === 'round_trip' ? 'text-violet-500' : 'text-white'}`}>Round Trip</button>
                            <button onClick={() => setSearch({ tab: 'local_trip' })} className={`px-2 text-center max-sm:w-20 w-32 2xl:w-44 py-3 max-sm:text-xs text-sm 2xl:text-xl duration-200 font-semibold ${search.get('tab') === 'local_trip' ? 'text-violet-500' : 'text-white'}`}>Local</button>
                            <button onClick={() => setSearch({ tab: 'transfer_trip' })} className={`px-2 text-center max-sm:w-20 w-32 2xl:w-44 py-3 max-sm:text-xs text-sm 2xl:text-xl duration-200 font-semibold ${search.get('tab') === 'transfer_trip' ? 'text-violet-500' : 'text-white'}`}>Transfer</button>
                        </div>
                        <div className='bg-white py-8 px-6'>
                            {!search.get('tab') && <OneWayTrip places={places} handleClick={handleClick} />}
                            {search.get('tab') === 'round_trip' && <RoundTrip places={places} handleClick={handleClick} />}
                            {search.get('tab') === 'local_trip' && <LocalTrip places={places} handleClick={handleClick} />}
                            {search.get('tab') === 'transfer_trip' && <TransferTrip places={places} handleClick={handleClick} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-16'>
                <h2 className='text-3xl font-bold text-black text-center'>Get Booking In 4 Steps</h2>
                <p className='text-[#00000099] text-center font-medium'>Get your cab in four easy steps.</p>
                <div className='w-full h-auto mt-10'>
                    <BookingSVG />
                    {/* <img src={bookingImg} alt="" className="w-full h-auto" /> */}
                </div>
            </div>
        </div>
    );
}

// component props validation

LocalTrip.propTypes = {
    handleClick: PropTypes.func,
};

TransferTrip.propTypes = {
    handleClick: PropTypes.func,
};

RoundTrip.propTypes = {
    handleClick: PropTypes.func,
};

OneWayTrip.propTypes = {
    handleClick: PropTypes.func,
};

export default Booking;
