import { useQuery } from "react-query";
import attachTaxiApi from "../api/attachTaxi";
import { CircularProgress } from "@mui/material";

const AttachTaxis = () => {

    const { data: attachTaxis = [], isLoading } = useQuery({
        queryKey: ['attachTaxis'],
        queryFn: async () => {
            const res = await attachTaxiApi.getAll();
            return res.data;
        }
    });


    return (
        <div>
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Attach Taxis</h1>
            <div className="mt-10 bg-white rounded-xl pb-10 overflow-hidden">
                {isLoading && <div className="pt-10 flex justify-center">
                    <CircularProgress />
                </div>}

                {!isLoading && (Array.isArray(attachTaxis) && attachTaxis?.length > 0 ? <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="text-center px-2 py-3 border-b">Name</th>
                            <th className="text-center px-2 py-3 border-b">Email</th>
                            <th className="text-center px-2 py-3 border-b">Phone NO</th>
                            <th className="text-center px-2 py-3 border-b">Company</th>
                            <th className="text-center px-2 py-3 border-b">State</th>
                            <th className="text-center px-2 py-3 border-b">City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attachTaxis?.map(item => <tr key={item?._id}>
                            <td className="text-center px-2 py-3 border-b">{item?.name}</td>
                            <td className="text-center px-2 py-3 border-b">{item?.email}</td>
                            <td className="text-center px-2 py-3 border-b">{item?.phoneNo}</td>
                            <td className="text-center px-2 py-3 border-b">{item?.companyName}</td>
                            <td className="text-center px-2 py-3 border-b">{item?.state}</td>
                            <td className="text-center px-2 py-3 border-b">{item?.city}</td>
                        </tr>)}
                    </tbody>
                </table> :
                    <p className="pt-10 text-center font-medium text-red-500">No Item Found</p>
                )}
            </div>
        </div>
    );
}

export default AttachTaxis;
