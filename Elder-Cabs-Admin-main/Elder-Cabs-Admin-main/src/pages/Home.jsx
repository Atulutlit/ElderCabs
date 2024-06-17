import { useContext, useEffect, useState } from "react";
import TermsAndCondition from "../components/Home/TermsAndCondition";
import { AdminContext } from "../contexts";
import SurgeDates from "../components/Home/SurgeDates";

const Home = () => {

    // context
    const { admin } = useContext(AdminContext);
    const [data, setData] = useState([
        {
            tripName: 'One-Way Trip',
            name: 'onewayTrip',
            conditions: [],
        },
        {
            tripName: 'Round Trip',
            name: 'roundTrip',
            conditions: [],
        },
        {
            tripName: 'Local Trip',
            name: 'localTrip',
            conditions: [],
        },
        {
            tripName: 'Transfer Trip',
            name: 'transferTrip',
            conditions: [],
        },
    ]);

    useEffect(() => {
        if (admin.termsAndConditions) {
            const newData = data.map(i => ({ ...i, conditions: admin.termsAndConditions[i.name] || [] }));
            setData(newData);
        }
    }, [admin]);

    return (
        <div>
            <div className="p-5 rounded-md shadow-md bg-white mb-5">
                <SurgeDates />
            </div>
            <div className='p-5 rounded-md shadow-md bg-white'>
                <h2 className='font-semibold text-xl pb-2 px-3 border-b'>Terms and Conditions</h2>
                <div className='flex flex-col gap-y-4 mt-7'>
                    {data.map((item, index) => <TermsAndCondition key={index} {...item} adminId={admin._id} />)}
                </div>
            </div>
        </div>
    );
}

export default Home;
