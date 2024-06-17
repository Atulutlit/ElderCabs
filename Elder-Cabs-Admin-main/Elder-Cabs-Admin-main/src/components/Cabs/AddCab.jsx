import { ChevronLeft } from "@mui/icons-material";
import { Button, Checkbox, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { fileCompress } from "../shared/ImageCropper";
import { toast } from "react-toastify";
import cabsApi from "../../api/cabs";

const CabImage = ({ image, setImage }) => {

    const [error, setError] = useState('');

    const { getInputProps, getRootProps } = useDropzone({
        multiple: false,
        accept: {
            'image/png': ['.png', '.jpeg', '.webp', '.jpg']
        },
        onDrop: async (acceptFiles, rejectFiles) => {
            if (rejectFiles.length > 0) {
                setError('File type not supported');
            } else {
                const file = await fileCompress(acceptFiles[0]);
                setImage(file);
                setError('');
            }
        },
    });

    return <>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {!image && <div className="w-full border-2 border-dashed px-3 py-5 text-center cursor-pointer">
                <p className="text-sm">Drag 'n' drop cab image here, or click to select cab image</p>
                <p className="text-sm opacity-75">Accept .png, .jepg, .webp</p>
            </div>}
            {image && typeof image === 'object' && <img src={URL.createObjectURL(image)} className='w-full h-auto rounded-md object-cover aspect-[16/12]' alt='' />}
            {/* {image && typeof image === 'string' && <img src={`${import.meta.env.VITE_API_URL}/${blog.image}`} className='w-full h-auto rounded-md aspect-video' alt='' />} */}
        </div>
        {error && <p className="text-xs font-medium text-red-500 w-full mt-2 text-center">{error}</p>}
    </>
}

const AddCab = () => {

    const [cab, setCab] = useState({ type: '', name: '', ac: false, driverAllowance: 0, seat: 0, bag: 0, image: null, });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // cab add handler
    const addHandler = async (e) => {
        e.preventDefault();
        if (!cab.image) {
            toast.warning('Please select cab image');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        for (let key in cab) {
            formData.append(key, cab[key]);
        }

        try {
            await cabsApi.create(formData);
            toast.success('Cab added successfully');
            setCab({ trip: '', type: '', name: '', fare: 0, ac: false, driverAllowance: 0, seat: 0, bag: 0, image: null, });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Add Cab</h1>
            <Button onClick={() => window.history.back()} className="!mt-5" variant="outlined" startIcon={<ChevronLeft />}>
                Go Back
            </Button>
            <div className="mt-10 bg-white rounded-lg shadow-xl px-5 py-7 flex gap-5">
                <div className="w-1/2">
                    <CabImage
                        image={cab.image}
                        setImage={(image) => setCab({ ...cab, image: image })}
                    />
                </div>
                <form onSubmit={addHandler} className="w-1/2 flex flex-col gap-y-5">
                    <div className="flex items-center">
                        <TextField
                            fullWidth
                            size='small'
                            label='Name'
                            variant="outlined"
                            value={cab.name}
                            required
                            onChange={(e) => setCab({ ...cab, name: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center">
                        <TextField
                            fullWidth
                            size='small'
                            label='Type'
                            variant="outlined"
                            value={cab.type}
                            required
                            onChange={(e) => setCab({ ...cab, type: e.target.value })}
                        />
                    </div>
                    {/* <div className='flex items-center'>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Type</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={cab.type}
                                label="Type"
                                required
                                MenuProps={{ sx: { maxHeight: '70vh' } }}
                                onChange={(e) => setCab({ ...cab, type: e.target.value })}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value='one_way_trip'>One Way Trip</MenuItem>
                                <MenuItem value='round_trip'>Round Trip</MenuItem>
                                <MenuItem value='local_trip'>Local Trip</MenuItem>
                                <MenuItem value='transfer_trip'>Transfer Trip</MenuItem>
                            </Select>
                        </FormControl>
                    </div> */}
                    {/* <div className='flex items-center'>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Trip</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={cab.trip}
                                label="Trip"
                                required
                                MenuProps={{ sx: { maxHeight: '70vh' } }}
                                onChange={(e) => setCab({ ...cab, trip: e.target.value })}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value='one_way_trip'>One Way Trip</MenuItem>
                                <MenuItem value='round_trip'>Round Trip</MenuItem>
                                <MenuItem value='local_trip'>Local Trip</MenuItem>
                                <MenuItem value='transfer_trip'>Transfer Trip</MenuItem>
                            </Select>
                        </FormControl>
                    </div> */}
                    {/* <div className="flex items-center">
                        <TextField
                            fullWidth
                            size='small'
                            type="number"
                            label='Fare'
                            variant="outlined"
                            value={cab.fare}
                            required
                            onChange={(e) => setCab({ ...cab, fare: e.target.value })}
                        />
                    </div> */}
                    <div className="flex items-center">
                        <TextField
                            fullWidth
                            size='small'
                            type="number"
                            label='Driver Allowance'
                            variant="outlined"
                            value={cab.driverAllowance}
                            required
                            onChange={(e) => setCab({ ...cab, driverAllowance: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center">
                        <TextField
                            fullWidth
                            size='small'
                            type="number"
                            label='Seat'
                            variant="outlined"
                            value={cab.seat}
                            required
                            onChange={(e) => setCab({ ...cab, seat: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center">
                        <TextField
                            fullWidth
                            size='small'
                            type="number"
                            label='Bag'
                            variant="outlined"
                            value={cab.bag}
                            required
                            onChange={(e) => setCab({ ...cab, bag: e.target.value })}
                        />
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <span className='text-base'>Air Conditioner <small>(ac)</small> </span>
                        <Checkbox checked={cab.ac} onChange={(e) => setCab({ ...cab, ac: e.target.checked })} />
                    </div>
                    {error && <p className="mt-4 text-center text-red-500 text-sm">{error}</p>}
                    <div className=''>
                        <Button type='submit' disabled={loading} variant="contained" className="!w-full !py-3" startIcon={loading && <CircularProgress size={18} sx={{ '& circle': { stroke: '#fff', strokeWidth: 8 } }} />} >Add Cab</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCab;
