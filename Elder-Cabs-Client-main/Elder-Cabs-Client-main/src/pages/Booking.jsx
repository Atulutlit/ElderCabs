
import { Controller, useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaPhone, FaLocationDot, FaCarRear } from 'react-icons/fa6';
import { PiCurrencyInrBold } from 'react-icons/pi';
import { BsFillCreditCardFill } from 'react-icons/bs';

//assets
import taxiImg from '../assets/images/booking.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cabApi from '../api/cab';
import { AiFillCar } from 'react-icons/ai';
import { finalFare } from '../components/Cabs/CabsUtils';
import moment from 'moment';
import bookingApi from '../api/booking';
import BookingSuccess from '../components/Booking/BookingSuccess';
import tripsApi from '../api/trips';
import { tripFare } from '../utilities';

const TextInput = ({ placeholder, name, type, icon, validation, Form, options, disabled }) => {

    const { register, formState: { errors } } = Form;

    return <div className='bg-transparent'>
        <div className='relative cursor-pointer bg-transparent'>
            {type === 'select' && <select
                {...register(name, validation)}
                className='focus:outline-none bg-transparent text-sm text-violet-500 font-medium pl-8 border-2 border-[#00000040] pr-2 py-2 w-full'
            >
                <option value=''>{placeholder}</option>
                {Array.isArray(options) && options.map(item => <option key={item} value={item}>{item}</option>)}
            </select>}
            {type !== 'select' && <input
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                {...register(name, validation)}
                className='focus:outline-none bg-transparent text-sm text-violet-500 font-medium pl-8 border-2 border-[#00000040] pr-2 py-2 w-full'
            />}
            <span className='text-[#00000040] absolute top-1/2 left-4 -translate-x-1/2 -translate-y-1/2'>{icon}</span>
        </div>
        {errors[name] && <span className='text-xs text-red-500 font-medium pl-2'>{errors[name]?.message}</span>}
    </div>
}

const LoadingSVG = () => {
    return <svg
        version="1.1"
        id="L4"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 16"
        className='w-24'
        xmlSpace="preserve"
    >
        <circle fill="#853095" stroke="none" cx={25} cy={8} r={6}>
            <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.1"
            />
        </circle>
        <circle fill="#853095" stroke="none" cx={50} cy={8} r={6}>
            <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.2"
            />
        </circle>
        <circle fill="#853095" stroke="none" cx={75} cy={8} r={6}>
            <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.3"
            />
        </circle>
    </svg>

}

const Booking = () => {

    // states
    const [queryParams, setQueryParams] = useState({});
    const [trip, setTrip] = useState(null);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(0);
    const [btnLoading, setBtnLoading] = useState(false);
    const [surgeDates, setSurgeDates] = useState([]);

    // react-hook-form
    const Form = useForm({ defaultValues: { paymentPercent: 20, amount: 0 } });
    const { handleSubmit, setValue, getValues, control, register, watch, formState: { errors } } = Form;

    // fields array
    const fieldsArr = [
        {
            name: 'fname',
            placeholder: 'First Name',
            type: 'text',
            icon: <FaUser />,
            validation: { required: 'First name is required' }
        },
        {
            name: 'lname',
            placeholder: 'Last Name',
            type: 'text',
            icon: <FaUser />,
            validation: { required: 'First name is required' }
        },
        {
            name: 'email',
            placeholder: 'Email',
            type: 'email',
            icon: <FaEnvelope />,
            validation: {
                required: 'Email is required',
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                }
            }
        },
        {
            name: 'phoneNo',
            placeholder: 'Phone Number',
            type: 'tel',
            icon: <FaPhone />,
            validation: {
                required: 'Phone number is required',
                pattern: {
                    value: /^\d{10}$/,
                    message: 'Invalid phone number'
                }
            }
        },
        // {
        //     name: 'state',
        //     placeholder: 'State',
        //     type: 'select',
        //     icon: <FaLocationDot />,
        //     options: ['State 1', 'State 2'],
        //     validation: { required: 'State is required' }
        // },
        // {
        //     name: 'city',
        //     placeholder: 'City',
        //     type: 'text',
        //     icon: <FaLocationDot />,
        //     validation: { required: 'City is required' }
        // },
        {
            name: 'pickupAddress',
            placeholder: 'Pickup Address',
            type: 'text',
            icon: <FaLocationDot />,
            validation: { required: 'Pickup address is required' }
        },
        // {
        //     name: 'cab',
        //     placeholder: 'Select Cab',
        //     type: 'select',
        //     icon: <FaCarRear />,
        //     options: ['1 Cab', '2 Cab', '3 Cab'],
        //     validation: { required: 'Cab is required' }
        // }
    ];

    // create payment url
    const createPaymentUrl = async (data) => {
        setBtnLoading(true);
        try {
            data.buyer_name = `${data?.fname} ${data?.lname && data.lname}`;
            data.purpose = queryParams.purpose;
            data.trip = queryParams;
            const res = await bookingApi.createPayment(data);
            if (res.data?.success) {
                // reset();
                window.location = res.data.payment_request.longurl;
            } else {
                console.error(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setBtnLoading(false);
        }
    }

    // get query params
    useEffect(() => {

        const getAllQueryParams = () => {
            return new URLSearchParams(location.search);
        }

        const queryParams = getAllQueryParams();
        let params = {};
        for (const [key, value] of queryParams.entries()) {
            params[key] = value;
        }
        setQueryParams(params);
    }, [location]);

    // fetch cabs by trip
    useEffect(() => {
        if (['one_way_trip', 'round_trip', 'local_trip', 'transfer_trip'].includes(queryParams?.trip)) {
            (async () => {
                try {

                    const trip = tripsApi.getTripById(queryParams.tripId, queryParams?.trip);
                    const surgeDates = tripsApi.getSurgeDates();

                    Promise.all([trip, surgeDates])
                        .then(([tripData, surgeDatesData]) => {
                            setTrip(tripData.data);
                            setSurgeDates(surgeDatesData.data);
                            setLoading(false);
                        });

                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [queryParams]);

    // get total fare
    useEffect(() => {
        if (trip) {
            const { totalFare } = tripFare({
                pickupDate: queryParams.pickupDate,
                returnDate: queryParams.returnDate,
                surgeDates: surgeDates,
                trip,
                tripType: queryParams.trip,
            });
            setAmount(totalFare);
        }

    }, [trip, queryParams, surgeDates]);

    // set amount by percent
    useEffect(() => {
        watch((values, { name }) => {
            if (name === 'paymentPercent') {
                let percent = values.paymentPercent;
                percent = parseInt(percent);
                let x = amount / 100 * percent;
                setValue('amount', Math.ceil(x));
            }
        });

        let percent = getValues('paymentPercent');
        percent = parseInt(percent);
        let x = amount / 100 * percent;
        x = Math.ceil(x);
        setValue('amount', x);

    }, [amount]);

    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    return (
        <div className="mt-28 2xl:mt-32">
            <div className="flex items-center flex-col gap-2 px-3 text-center">
                <h1 className="uppercase max-sm:text-3xl text-4xl text-violet-500 font-semibold">Booking Details</h1>
                <p className="text-sm font-medium text-violet-500">Fill Your Details To Book the Cab.</p>
            </div>

            {loading && <div className='my-20 flex justify-center'>
                <AiFillCar className='text-violet-500 w-10 h-auto animate-pulse' />
            </div>}

            {!loading && <div className="my-16 container mx-auto max-md:px-3 px-5">
                <div className="flex items-center max-md:gap-y-7 max-md:flex-col lg:gap-6">
                    <div className="md:w-1/2 px-3 sm:px-5">
                        <img draggable={false} src={taxiImg} alt='' className="w-full h-auto" />
                    </div>
                    <div className="md:w-1/2 lg:px-5">
                        <div className=' rounded-md shadow-lg overflow-hidden'>
                            <h1 className='text-center text-xl font-semibold text-white py-2 bg-violet-500'>{trip?.cars?.name}</h1>
                            <form onSubmit={handleSubmit(createPaymentUrl)} className='px-2 sm:px-5 py-5 grid grid-cols-2 gap-y-3 sm:gap-y-6 gap-x-3 sm:gap-x-5'>
                                {fieldsArr.map((item, index) => <TextInput key={index} {...item} Form={Form} />)}
                                <div>
                                    <div className='relative cursor-pointer bg-transparent'>
                                        <Controller
                                            name='paymentPercent'
                                            control={control}
                                            render={({ field: { name, value } }) => <select
                                                name={name}
                                                value={value}
                                                onChange={(e) => {
                                                    let percent = e.target.value;
                                                    percent = parseInt(percent);
                                                    setValue(name, percent);
                                                    const amount = totalFare(percent);
                                                    setAmount(amount);
                                                    setValue('amount', amount);
                                                }}
                                                className='focus:outline-none bg-transparent text-sm text-violet-500 font-medium pl-8 border-2 border-[#00000040] pr-2 py-2 w-full'
                                            >
                                                <option value={20}>20%</option>
                                                <option value={50}>50%</option>
                                                <option value={75}>75%</option>
                                                <option value={100}>100%</option>
                                            </select>}
                                        />
                                        <span className='text-[#00000040] absolute top-1/2 left-4 -translate-x-1/2 -translate-y-1/2'><BsFillCreditCardFill /></span>
                                    </div>
                                    {errors['paymentPercent'] && <span className='text-xs text-red-500 font-medium pl-2'>{errors['paymentPercent']?.message}</span>}
                                </div>
                                <div className='relative cursor-pointer bg-transparent'>
                                    <input
                                        type='number'
                                        readOnly
                                        className='focus:outline-none bg-transparent text-sm text-violet-500 font-medium pl-8 border-2 border-[#00000040] pr-2 py-2 w-full'
                                        {...register('amount', { required: 'Amount is required' })}
                                    />
                                    <span className='text-[#00000040] absolute top-1/2 left-4 -translate-x-1/2 -translate-y-1/2'><PiCurrencyInrBold /></span>
                                </div>
                                {btnLoading && <div className='flex justify-center col-span-2'>
                                    <LoadingSVG />
                                </div>}
                                <div className='col-span-2'>
                                    <button disabled={btnLoading} className='rounded-lg w-full py-2 px-10 shadow-md hover:shadow-none duration-200 hover:bg-transparent border border-violet-200 hover:border-violet-700 bg-violet-200 text-violet-700 text-sm font-medium'>Pay Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Booking;
