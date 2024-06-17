import Autocomplete from "react-google-autocomplete";
import placeApi from "../api/places";
import { useQuery } from "react-query";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const Places = () => {

    // places fetcher
    const { data: places = [], isLoading, refetch } = useQuery({
        queryKey: ['places'],
        queryFn: async () => {
            const res = await placeApi.readAll();
            return res.data;
        }
    });

    // on place handler
    const onPlaceSelected = async (place) => {
        const input = document.getElementById('locationInput');
        input.disabled = true;
        try {
            await placeApi.create({ name: place.formatted_address });
            input.value = '';
            refetch();
        } catch (err) {
            console.error(err)
        } finally {
            input.disabled = false;
        }

    }

    // delete place handler
    const deletePlace = async (e, placeId) => {

        e.target.disabled = true;
        try {
            await placeApi.delete(placeId);
            refetch();
        } catch (err) {
            console.error(err);
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div className="">
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Destinations</h1>
            <div className="mt-10 rounded-lg shadow-xl bg-white px-5 py-8">
                <div>
                    <h3 className="text-lg font-medium">Add Place</h3>
                    <div className="w-[300px] mt-3">
                        <Autocomplete
                            id='locationInput'
                            className="w-full border-2 px-3 py-2 text-sm focus:outline-none"
                            onPlaceSelected={onPlaceSelected}
                            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                        />
                    </div>
                </div>
                <div className="flex flex-col mt-8 gap-y-3">
                    {places?.length > 0 ?
                        places.map(({ _id, name }) => <div key={_id} className="shadow-md py-2 px-3 flex justify-between items-center border rounded-md">
                            <p className="text-sm font-medium">{name}</p>
                            <IconButton onClick={(e) => deletePlace(e, _id)}>
                                <Delete fontSize="small" />
                            </IconButton>
                        </div>)
                        :
                        <p className="text-center font-medium text-red-500 text-sm w-full">No Place Found</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Places;
