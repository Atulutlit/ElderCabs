import { Button, CircularProgress, IconButton } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import tripsApi from "../api/trips";
import { useQuery } from "react-query";
import { Delete } from '@mui/icons-material';
import { NumberInputField, SourceCityField } from "../components/shared/TripsFields";
import CarSelectField from "../components/shared/CarSelectField";
const LocalTrip = () => {

    // states
    const [submitting, setSubmitting] = useState(false);

    // react-hook-form
    const Form = useForm();

    const { reset, handleSubmit } = Form;


    // fetch all trips
    const { data: trips = [], isLoading, refetch } = useQuery({
        queryKey: ['localTrips'],
        queryFn: async () => {
            const res = await tripsApi.getLocalTrips();
            return res.data;
        }
    });

    // trip add handler
    const tripAddHandler = async (data) => {

        setSubmitting(true);

        try {
            await tripsApi.createLocalTrip(data);
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
            await tripsApi.deleteLocalTrip(tripId);
            refetch();
        } catch (err) {
            console.error(err);
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Local Trip</h1>

            {/* add round trip */}
            <div className="mt-10 rounded-md p-5 bg-white shadow-lg">
                <form onSubmit={handleSubmit(tripAddHandler)} className="grid grid-cols-3 gap-4">

                    <SourceCityField Form={Form} />

                    <NumberInputField
                        Form={Form}
                        name={'price'}
                        label={'Total Price'}
                        errorMsg={'Price is required'}
                        icon={<span>&#8377; </span>}
                    />

                    <NumberInputField
                        Form={Form}
                        name={'pricePerKm'}
                        label={'Price / KM ( if the distance is greater than 80 km)'}
                        errorMsg={'Price ( per km ) is required'}
                        icon={<span>&#8377; </span>}
                    />

                    <NumberInputField
                        Form={Form}
                        name={'pricePerHr'}
                        label={'Price / HR ( if the duration is greater than 80 hr )'}
                        errorMsg={'Price ( per hr ) is required'}
                        icon={<span>&#8377; </span>}
                    />

                    <CarSelectField Form={Form} />

                    {/* <div>
                            <FormControl fullWidth size="small">
                                <InputLabel htmlFor="outlined-adornment-amount">Surge Price / Km</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">&#8377; </InputAdornment>}
                                    label="Surge Price / Km"
                                    type="number"
                                    {...register('surgePriceKm', { required: 'Surge price/km is required' })}
                                />
                            </FormControl>
                            {errors?.surgePriceKm && <span className="text-xs font-medium text-red-500">{errors.surgePriceKm?.message}</span>}
                        </div>
                        <div>
                            <FormControl fullWidth size="small">
                                <InputLabel htmlFor="outlined-adornment-amount">Surge Price / Hr</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">&#8377; </InputAdornment>}
                                    label="Surge Price / Hr"
                                    type="number"
                                    {...register('surgePriceHr', { required: 'Surge price/hr is required' })}
                                />
                            </FormControl>
                            {errors?.surgePriceHr && <span className="text-xs font-medium text-red-500">{errors.surgePriceHr?.message}</span>}
                        </div> */}

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
                                    <th className="px-1 py-3 border-b">Total Price</th>
                                    <th className="px-1 py-3 border-b">Price (per km)</th>
                                    <th className="px-1 py-3 border-b">Price (per hr)</th>
                                    <th className="px-1 py-3 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {trips.map(item => <tr key={item._id}>
                                    <td className="px-1 py-3 border-b text-center">{item.sourceCity}</td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.price}</td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.pricePerKm}</td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.pricePerHr}</td>
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

export default LocalTrip;
