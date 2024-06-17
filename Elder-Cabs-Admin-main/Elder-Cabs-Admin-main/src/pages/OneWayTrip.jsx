import { CircularProgress, IconButton } from "@mui/material";
import tripsApi from "../api/trips";
import { useQuery } from "react-query";
import { Delete } from '@mui/icons-material';
import AddOneWayTrip from "../components/Trips/AddOneWayTrip";

const OneWayTrip = () => {

    // fetch all trips
    const { data: trips = [], isLoading, refetch } = useQuery({
        queryKey: ['oneWayTrips'],
        queryFn: async () => {
            const res = await tripsApi.getOneWayTrips();
            return res.data;
        }
    });

    // delete trip
    const deleteTrip = async (e, tripId) => {
        e.target.disabled = true;
        try {
            await tripsApi.deleteOneWayTrip(tripId);
            refetch();
        } catch (err) {
            console.error(err);
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>One-Way Trip</h1>

            {/* add one way trip */}
            <div className="mt-10 rounded-md p-5 bg-white shadow-lg">
                <AddOneWayTrip refetch={refetch} />
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
                                    <th className="px-1 py-3 border-b">Price (per /km)</th>
                                    <th className="px-1 py-3 border-b">Distance</th>
                                    <th className="px-1 py-3 border-b">Driver Allowance</th>
                                    <th className="px-1 py-3 border-b">Surge Price</th>
                                    <th className="px-1 py-3 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {trips.map(item => <tr key={item._id}>
                                    <td className="px-1 py-3 border-b text-center">{item.sourceCity}</td>
                                    <td className="px-1 py-3 border-b text-center">{item.destination}</td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.pricePerKm}</td>
                                    <td className="px-1 py-3 border-b text-center">{item.distance}</td>
                                    <td className="px-1 py-3 border-b text-center">Rs. {item.driverAllowance}</td>
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

export default OneWayTrip;
