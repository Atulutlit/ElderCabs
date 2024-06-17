import { Button, CircularProgress, IconButton } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import tripsApi from "../api/trips";
import { useQuery } from "react-query";
import { Delete } from '@mui/icons-material';
import { DestinationField, NumberInputField, SourceCityField } from "../components/shared/TripsFields";
import CarSelectField from "../components/shared/CarSelectField";

const TransferTrip = () => {

    // states
    const [submitting, setSubmitting] = useState(false);

    // react-hook-form
    const Form = useForm();
    const { reset, handleSubmit } = Form;


    // fetch all trips
    const { data: trips = [], isLoading, refetch } = useQuery({
        queryKey: ['transferTrips'],
        queryFn: async () => {
            const res = await tripsApi.getTransferTrips();
            return res.data;
        }
    });

    // trip add handler
    const tripAddHandler = async (data) => {

        setSubmitting(true);

        try {
            await tripsApi.createTransferTrip(data);
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
            await tripsApi.deleteTransferTrip(tripId);
            refetch();
        } catch (err) {
            console.error(err);
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Transfer Trip</h1>

            {/* add round trip */}
            <div className="mt-10 rounded-md p-5 bg-white shadow-lg">
                <form onSubmit={handleSubmit(tripAddHandler)} className="grid grid-cols-3 gap-4">

                    <SourceCityField Form={Form} />
                    <DestinationField Form={Form} />

                    <NumberInputField
                        Form={Form}
                        errorMsg={'Price is required'}
                        name={'price'}
                        label={'Total Price'}
                        icon={<>&#8377;</>}
                    />
                    <NumberInputField
                        Form={Form}
                        errorMsg={'Surge price is required'}
                        name={'surgePrice'}
                        label={'Total Surge Price'}
                        icon={<>&#8377;</>}
                    />

                    <CarSelectField Form={Form} />

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
                                    <th className="px-1 py-3 border-b">Destination City</th>
                                    <th className="px-1 py-3 border-b">Total Price</th>
                                    <th className="px-1 py-3 border-b">Total Surge Price</th>
                                    <th className="px-1 py-3 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {trips.map(item => <tr key={item._id}>
                                    <td className="px-1 py-3 border-b text-center">{item.sourceCity}</td>
                                    <td className="px-1 py-3 border-b text-center">{item.destination}</td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.price}</td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.surgePrice}</td>
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

export default TransferTrip;
