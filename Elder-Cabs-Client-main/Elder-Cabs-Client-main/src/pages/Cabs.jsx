
import { FaClock, FaCalendar, FaAngleRight } from 'react-icons/fa6';

// assets
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AiFillCar } from 'react-icons/ai';
import tripsApi from '../api/trips';
import PropTypes from 'prop-types';
import CabItem from '../components/Cabs/CabItem';

const Header = ({ queryParams, daysOfRoundTrip }) => {

    return <div className="container mx-auto px-3 md:px-5 py-3 flex max-lg:flex-col max-lg:items-center gap-5 justify-between">
        <div className='flex-1'>
            <nav className="flex items-center max-sm:text-xs text-sm text-violet-700 font-medium">
                <ol className="flex flex-wrap items-center space-y-1 space-x-2">
                    <li>
                        Source City: {queryParams?.sourceCity}
                    </li>
                    <li>
                        <FaAngleRight />
                    </li>
                    {queryParams?.destination && <>
                        <li>
                            Destination: {queryParams.destination}
                        </li>
                        <li>
                            <FaAngleRight />
                        </li>
                    </>}
                    {Array.isArray(queryParams?.destinations) &&
                        queryParams.destinations.map((item, index) => <>
                            <li key={index}>
                                Destination: {item}
                            </li>
                            <li>
                                <FaAngleRight />
                            </li>
                        </>
                        )}
                    {queryParams?.trip === 'one_way_trip' && <li>( One Way Trip)</li>}
                    {queryParams?.trip === 'local_trip' && <li>( Local Trip)</li>}
                    {queryParams?.trip === 'transfer_trip' && <li>( Transfer Trip)</li>}
                    {queryParams?.trip === 'round_trip' && <li>{daysOfRoundTrip} Days Round Trip</li>}
                </ol>
            </nav>
        </div>
        <div className="flex items-start gap-5">
            {queryParams?.pickupTime && <p className="flex max-sm:flex-col max-sm:items-center px-2 gap-2 text-violet-700">
                <span className='mt-1'>
                    <FaClock className='w-5 h-auto' />
                </span>
                <span className='flex-1 font-medium max-sm:text-center'>
                    <span className='text-sm font-medium block'>Pickup Time</span>
                    {queryParams.pickupTime}
                </span>
            </p>}
            {queryParams?.pickupDate && <p className="flex max-sm:flex-col max-sm:items-center px-2 gap-2 text-violet-700">
                <span className='mt-1'>
                    <FaCalendar className='w-5 h-auto' />
                </span>
                <span className='flex-1 font-medium max-sm:text-center'>
                    <span className='text-sm font-medium block'>Pickup Date</span>
                    {queryParams.pickupDate}
                </span>
            </p>}
            {queryParams?.returnDate && <p className="flex max-sm:flex-col max-sm:items-center px-2 gap-2 text-violet-700">
                <span className='mt-1'>
                    <FaCalendar className='w-5 h-auto' />
                </span>
                <span className='flex-1 font-medium max-sm:text-center'>
                    <span className='text-sm font-medium block'>Return Date</span>
                    {queryParams.returnDate}
                </span>
            </p>}
        </div>
    </div>
}

const Cabs = () => {

    const [queryParams, setQueryParams] = useState(null);
    const [trips, setTrips] = useState([]);
    const [termsAndCondition, setTermsAndCondition] = useState([]);
    const [surgeDates, setSurgeDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    // get query params
    useEffect(() => {

        const getAllQueryParams = () => {
            return new URLSearchParams(location.search);
        }

        const queryParams = getAllQueryParams();
        let params = {};
        for (const [key, value] of queryParams.entries()) {
            if (params[key]) {
                if (Array.isArray(params[key])) {
                    params[key] = [...params[key], value];
                } else {
                    params[key] = [params[key], value];
                }
            } else {
                params[key] = value;
            }
        }
        setQueryParams(params);
    }, [location]);

    // fetch cabs by trip
    useEffect(() => {
        if (['one_way_trip', 'round_trip', 'local_trip', 'transfer_trip'].includes(queryParams?.trip)) {
            (async () => {
                try {

                    const destinations = Array.isArray(queryParams.destinations) ? queryParams.destinations : []

                    const trip = tripsApi.getTrips({
                        destination: queryParams.destination,
                        trip: queryParams.trip,
                        sourceCity: queryParams.sourceCity,
                        destinations: [queryParams.destination, ...destinations],
                    });

                    const termsAndConditions = tripsApi.getTripsConditions();
                    const surgeDates = tripsApi.getSurgeDates();

                    Promise.all([trip, termsAndConditions, surgeDates])
                        .then(([tripData, conditionsData, surgeDatesData]) => {
                            setTrips(tripData.data);
                            const tripType = queryParams.trip === 'one_way_trip' ? 'onewayTrip'
                                : queryParams.trip === 'round_trip' ? 'roundTrip'
                                    : queryParams.trip === 'local_trip' ? 'localTrip'
                                        : 'transferTrip';
                            setTermsAndCondition(conditionsData.data[tripType]);
                            setSurgeDates(surgeDatesData.data);
                            setLoading(false);
                        });

                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [queryParams]);

    // select cab
    const selectCab = (tripId) => {
        let search = window.location.search;
        search = `${search}&tripId=${tripId}`;
        navigate(`/cabs/booking${search}`);
    }

    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    return (
        <div className='mt-28'>
            <div className="bg-violet-200">
                <Header queryParams={queryParams || {}} daysOfRoundTrip={trips?.totalDays} />
            </div>
            <div className='my-16 container mx-auto max-md:px-3 px-5'>
                {loading && <div className='flex justify-center'>
                    <AiFillCar className='text-violet-500 w-10 h-auto animate-pulse' />
                </div>}

                {!loading && (trips?.length > 0 ? <div className='grid md:grid-cols-2 gap-4 lg:gap-8'>
                    {trips.map(({ cars, ...trip }) => <CabItem
                        key={trip._id}
                        cab={cars}
                        trip={trip}
                        tripType={queryParams?.trip}
                        selectCab={selectCab}
                        pickupDate={queryParams?.pickupDate}
                        returnDate={queryParams?.returnDate}
                        surgeDates={surgeDates}
                        termsAndConditions={termsAndCondition}
                    />)}
                </div>

                    : <p className='text-center text-red-500 font-medium text-sm'>No Cab Found</p>
                )}
            </div>
        </div>
    );
}

// Header component props type validation
Header.propTypes = {
    queryParams: PropTypes.object,
    daysOfRoundTrip: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])
};

export default Cabs;
