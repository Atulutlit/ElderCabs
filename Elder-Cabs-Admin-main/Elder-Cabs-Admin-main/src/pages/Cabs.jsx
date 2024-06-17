import { Add, Delete } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import cabsApi from "../api/cabs";
import { toast } from "react-toastify";

const Cabs = () => {

    // fetch cabs
    const { data: cabs = [], isLoading, refetch } = useQuery({
        queryKey: ['cabs'],
        queryFn: async () => {
            const res = await cabsApi.getAll();
            return res.data;
        }
    });

    // trip 
    const beautifyTrip = (text) => {
        switch (text) {
            case 'one_way_trip':
                return 'One Way Trip';
            case 'round_trip':
                return 'Round Trip';
            case 'local_trip':
                return 'Local Trip';
            case 'transfer_trip':
                return 'Transfer Trip';
            default:
                return '';
        }
    }

    // delete cab
    const deleteCab = async (e, cabId) => {
        e.target.disabled = true;
        try {
            await cabsApi.delete(cabId);
            toast.success('Deleted');
            refetch();
        } catch (err) {
            console.error(err);
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Cabs</h1>
            <div className="py-3 flex justify-between gap-5">
                <div></div>
                <Link to={'/cabs/add-cab'}>
                    <Button variant="outlined" startIcon={<Add />}>
                        Add Cab
                    </Button>
                </Link>
            </div>
            <div className="mt-10 rounded-xl shadow-xl bg-white px-5 py-5">
                {isLoading && <div className='flex justify-center py-5 w-full'>
                    <CircularProgress />
                </div>}
                {!isLoading && (Array.isArray(cabs) && cabs?.length > 0 ? <div className="grid grid-cols-3 gap-5">
                    {cabs.map(item => <div key={item._id} className="rounded-md shadow-md px-3 py-5">
                        <img src={import.meta.env.VITE_API_URL + '/' + item.image} draggable={false} alt='' className="w-full object-cover aspect-[16/12] rounded-md" />
                        <h4 className="text-2xl font-semibold">{item.name}</h4>
                        <h4 className="text-base font-semibold">{item.type}</h4>
                        <p>{beautifyTrip(item.trip)}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <Button onClick={(e) => deleteCab(e, item._id)} variant="outlined" startIcon={<Delete />}>Delete</Button>
                        </div>
                    </div>)}
                </div>
                    : <p className="text-center w-full  font-semibold text-red-500 ">No Cab Found</p>
                )}
            </div>
        </div>
    );
}

export default Cabs;
