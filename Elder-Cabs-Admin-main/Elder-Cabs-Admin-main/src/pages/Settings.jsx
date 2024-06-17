import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import settingsApi from '../api/settings';
import { AdminContext } from '../contexts';

const InputField = ({ value, onChange, name, sign, label }) => {
    return <FormControl size='small' fullWidth>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
            type='number'
            value={value}
            id={name}
            onChange={onChange}
            startAdornment={<InputAdornment position="start">{sign}</InputAdornment>}
            label={label}
            name={name}
            min={0}
        />
    </FormControl>
}

const OneWayTrip = ({ handleUpdate, value }) => {

    const [data, setData] = useState({ chargePerKm: 0, toll: 0, stateTax: 0, advancePayment: 0 });

    useEffect(() => {
        if (typeof value === 'object') {
            setData({ ...data, ...value })
        }
    }, [value]);

    return <div className='bg-white rounded-md shadow-md py-4 px-4'>
        <h3 className='text-lg font-medium pb-2 pl-3 border-b'>One Way Trip</h3>
        <div className='mt-5 grid grid-cols-3 gap-4'>
            <InputField
                sign={<>&#x20b9;</>}
                label={'Charge ( per km )'}
                name={'chargePerKm'}
                value={data.chargePerKm}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <InputField
                sign={<>&#x20b9;</>}
                label={'Toll'}
                name={'toll'}
                value={data.toll}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <InputField
                sign={<>&#x20b9;</>}
                label={'State Tax'}
                name={'stateTax'}
                value={data.stateTax}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <InputField
                sign={<>&#x00025;</>}
                label={'Advance Payment'}
                name={'advancePayment'}
                value={data.advancePayment}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <div>
                <Button onClick={(e) => handleUpdate(e, { oneWayTrip: data })} variant='contained' className='w-full disabled:!opacity-70'>Update</Button>
            </div>
        </div>
    </div>
}

const LocalTrip = ({ handleUpdate, value }) => {

    const [data, setData] = useState({ basicFare: 0, chargePerHour: 0, chargePerKm: 0, advancePayment: 0 });

    useEffect(() => {
        if (typeof value === 'object') {
            setData({ ...data, ...value })
        }
    }, [value]);

    return <div className='bg-white rounded-md shadow-md py-4 px-4'>
        <h3 className='text-lg font-medium pb-2 pl-3 border-b'>Local Trip</h3>
        <div className='mt-5 grid grid-cols-3 gap-4'>
            <InputField
                sign={<>&#x20b9;</>}
                label={'Basic Fare'}
                name={'basicFare'}
                value={data.basicFare}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <InputField
                sign={<>&#x20b9;</>}
                label={'Charge ( per hour )'}
                name={'chargePerHour'}
                value={data.chargePerHour}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <InputField
                sign={<>&#x20b9;</>}
                label={'Charge ( per km )'}
                name={'chargePerKm'}
                value={data.chargePerKm}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <InputField
                sign={<>&#x00025;</>}
                label={'Advance Payment'}
                name={'advancePayment'}
                value={data.advancePayment}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <div>
                <Button onClick={(e) => handleUpdate(e, { localTrip: data })} variant='contained' className='w-full disabled:!opacity-70'>Update</Button>
            </div>
        </div>
    </div>
}

const RoundTrip = ({ handleUpdate, value }) => {

    const [data, setData] = useState({ basicFare: 0, extraChargePerKm: 0, driverAllowance: 0, advancePayment: 0 });

    useEffect(() => {
        if (typeof value === 'object') {
            setData({ ...data, ...value })
        }
    }, [value]);

    return <div className='bg-white rounded-md shadow-md py-4 px-4'>
        <h3 className='text-lg font-medium pb-2 pl-3 border-b'>Round Trip</h3>
        <div className='mt-5 grid grid-cols-3 gap-4'>
            <InputField
                sign={<>&#x20b9;</>}
                label={'Basic Fare'}
                name={'basicFare'}
                value={data.basicFare}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <InputField
                sign={<>&#x20b9;</>}
                label={'Extra Charge ( per km )'}
                name={'extraChargePerKm'}
                value={data.extraChargePerKm}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <InputField
                sign={<>&#x20b9;</>}
                label={'Driver Allowance ( per day )'}
                name={'driverAllowance'}
                value={data.driverAllowance}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <InputField
                sign={<>&#x00025;</>}
                label={'Advance Payment'}
                name={'advancePayment'}
                value={data.advancePayment}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <div>
                <Button onClick={(e) => handleUpdate(e, { roundTrip: data })} variant='contained' className='w-full disabled:!opacity-70'>Update</Button>
            </div>
        </div>
    </div>
}

const TransferTrip = ({ handleUpdate, value }) => {

    const [data, setData] = useState({ chargePerKm: 0, advancePayment: 0 });

    useEffect(() => {
        if (typeof value === 'object') {
            setData({ ...data, ...value })
        }
    }, [value]);

    return <div className='bg-white rounded-md shadow-md py-4 px-4'>
        <h3 className='text-lg font-medium pb-2 pl-3 border-b'>Transfer Trip</h3>
        <div className='mt-5 grid grid-cols-3 gap-4'>
            <InputField
                sign={<>&#x20b9;</>}
                label={'Charge ( per km )'}
                name={'chargePerKm'}
                value={data.chargePerKm}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <InputField
                sign={<>&#x00025;</>}
                label={'Advance Payment'}
                name={'advancePayment'}
                value={data.advancePayment}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value > 0 ? e.target.value : 0 })}
            />
            <div>
                <Button onClick={(e) => handleUpdate(e, { transferTrip: data })} variant='contained' className='w-full disabled:!opacity-70'>Update</Button>
            </div>
        </div>
    </div>
}


const Settings = () => {

    const { admin } = useContext(AdminContext);

    const handleUpdate = async (e, data) => {

        for (let key in data) {
            let dataObj = data[key];
            for (let item in dataObj) {
                dataObj[item] = parseInt(dataObj[item]);
            }
            data[key] = dataObj;
        }

        e.target.disabled = true;

        try {
            await settingsApi.update(admin._id, data);
        } catch (err) {
            console.error(err);
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div className='flex flex-col gap-5'>
            <OneWayTrip handleUpdate={handleUpdate} value={admin?.oneWayTrip || {}} />
            <LocalTrip handleUpdate={handleUpdate} value={admin?.localTrip || {}} />
            <RoundTrip handleUpdate={handleUpdate} value={admin?.roundTrip || {}} />
            <TransferTrip handleUpdate={handleUpdate} value={admin?.transferTrip || {}} />
        </div>
    );
}

export default Settings;
