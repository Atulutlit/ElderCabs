import { Button, CircularProgress, IconButton, } from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import tripsApi from "../api/trips";
import { useQuery } from "react-query";
import { Delete } from '@mui/icons-material';
import ReactTags from 'react-tag-autocomplete'
import { useCallback } from "react";
import { NumberInputField, SourceCityField } from "../components/shared/TripsFields";
import CarSelectField from "../components/shared/CarSelectField";

const RoundTrip = () => {

    // states
    const [submitting, setSubmitting] = useState(false);

    // react-hook-form
    const Form = useForm({
        defaultValues: {
            cars: [],
            destinations: []
        }
    });

    const { reset, getValues, setValue, handleSubmit, control, formState: { errors } } = Form;

    // destinations delete
    const onDelete = useCallback((tagIndex) => {
        let destinations = getValues('destinations');
        destinations = destinations.filter((_, i) => i !== tagIndex);
        setValue('destinations', destinations);
    }, [])

    // add destinations
    const onAddition = useCallback((newTag) => {
        let destinations = getValues('destinations');
        destinations = [...destinations, newTag];
        setValue('destinations', destinations);
    }, [])

    // // car search handler
    // const carsSearchHandler = async (e, value) => {
    //     if (!value) {
    //         return;
    //     }
    //     setLoading(true);
    //     try {
    //         const res = await cabsApi.getAll(value);
    //         let newCars = res.data?.map(i => ({ name: i.name, type: i.type, _id: i._id, image: i.image }));
    //         setCars(newCars);
    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // // debounce function
    // const debounce = (func) => {
    //     let timerId;

    //     return function (...args) {
    //         clearTimeout(timerId);

    //         timerId = setTimeout(() => {
    //             func.apply(this, args);
    //         }, 1000);
    //     };
    // }

    // fetch all trips
    const { data: trips = [], isLoading, refetch } = useQuery({
        queryKey: ['roundTrips'],
        queryFn: async () => {
            const res = await tripsApi.getRoundTrips();
            return res.data;
        }
    });

    // trip add handler
    const tripAddHandler = async (data) => {

        setSubmitting(true);

        data.destinations = data.destinations?.map(i => i.name)

        try {
            await tripsApi.createRoundTrip(data);
            reset();
            refetch();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    // delete trip
    const deleteTrip = async (e, tripId) => {
        e.target.disabled = true;
        try {
            await tripsApi.deleteRoundTrip(tripId);
            refetch();
        } catch (err) {
            console.error(err);
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Round Trip</h1>

            {/* add round trip */}
            <div className="mt-10 rounded-md p-5 bg-white shadow-lg">
                <form onSubmit={handleSubmit(tripAddHandler)} className="grid grid-cols-3 gap-4">

                    <SourceCityField Form={Form} />

                    <div>
                        <Controller
                            control={control}
                            name="destinations"
                            rules={{ required: 'Destinations is required' }}
                            render={({ field: { value } }) => <ReactTags
                                labelText=""
                                tags={value}
                                placeholderText='Add new destinations'
                                onDelete={onDelete}
                                onAddition={onAddition}
                                allowNew={true}
                                classNames={{
                                    root: '!border !rounded-md py-1.5 px-2 !flex !flex-wrap !gap-3',
                                    selected: '!flex !flex-wrap !gap-2',
                                    selectedTag: 'px-3 py-1 !font-medium !rounded-sm !shadow-md !bg-[#fff] !text-sm border',
                                    searchInput: '!w-max !text-sm pr-1 py-1 focus:outline-none'
                                }}
                            />}
                        />
                        {errors?.destinations && <span className="text-xs font-medium text-red-500">{errors.destinations?.message}</span>}
                    </div>

                    <NumberInputField
                        Form={Form}
                        errorMsg={'Price ( per km ) is required'}
                        label={'Price / KM'}
                        name='pricePerKm'
                        icon={<span>&#8377;</span>}
                    />
                    <NumberInputField
                        Form={Form}
                        errorMsg={'Distance is required'}
                        label={'No of KM Charges'}
                        name='noOfKmCharge'
                        icon={<span>km</span>}
                    />

                    <CarSelectField Form={Form} />

                    <NumberInputField
                        Form={Form}
                        errorMsg={'Surge price is required'}
                        label={'Surge Price'}
                        name='surgePrice'
                        icon={<span>&#8377;</span>}
                    />

                    <NumberInputField
                        Form={Form}
                        errorMsg={'Driver allowance  is required'}
                        label={'Driver Allowance (per day)'}
                        name='driverAllowance'
                        icon={<span>&#8377;</span>}
                    />

                    <div>
                        <Button
                            type="submit"
                            disabled={submitting}
                            variant="contained"
                            className="!w-full !py-2"
                            startIcon={submitting && <CircularProgress color="inherit" size={16} />}
                        >
                            Add Trip
                        </Button>
                    </div>
                </form>
            </div>

            {/* show all trips */}
            {isLoading && <div className="flex justify-center py-3 mt-10">
                <CircularProgress />
            </div>}

            {!isLoading && <div className="mt-10 bg-white rounded-md py-5 shadow-xl">
                {(Array.isArray(trips) && trips?.length > 0 ?
                    <div>
                        <table className="w-full text-xs">
                            <thead>
                                <tr>
                                    <th className="px-1 py-3 border-b">Source City</th>
                                    <th className="px-1 py-3 border-b">Destination Cities</th>
                                    <th className="px-1 py-3 border-b">Price (per /km)</th>
                                    <th className="px-1 py-3 border-b">No of Km</th>
                                    <th className="px-1 py-3 border-b">Surge Price</th>
                                    <th className="px-1 py-3 border-b">Driver Allowance ( per day) </th>
                                    <th className="px-1 py-3 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {trips.map(item => <tr key={item._id}>
                                    <td className="px-1 py-3 border-b text-center">{item.sourceCity}</td>
                                    <td className="px-1 py-3 border-b text-center">
                                        {Array.isArray(item.destinations) && item.destinations?.map((i, index) =>
                                            <span key={index} className="pl-1 text-center">{i},</span>
                                        )}
                                    </td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.pricePerKm}</td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.noOfKmCharge}</td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.surgePrice}</td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.driverAllowance}</td>
                                    <td className="px-1 py-3 border-b text-center">
                                        <IconButton onClick={(e) => deleteTrip(e, item._id)} size="small">
                                            <Delete size='small' />
                                        </IconButton>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className="text-center text-sm text-red-500 font-medium">No Trip Found</p>
                )}
            </div>}

        </div>
    );
}

export default RoundTrip;
