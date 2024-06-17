import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';
import cabsApi from "../../api/cabs";

const CarSelectField = ({ Form }) => {

    const { control, formState: { errors } } = Form;

    // states
    const [cars, setCars] = useState([]);

    // fetch cars
    useEffect(() => {
        (async () => {
            try {
                const res = await cabsApi.getAll();
                let newCars = res.data?.map(i => ({ name: i.name, type: i.type, _id: i._id, image: i.image }));
                setCars(newCars);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <div>
            <Controller
                control={control}
                name="cars"
                rules={{ required: 'Cars is required' }}
                render={({ field: { value, onChange } }) => <Autocomplete
                    // multiple
                    size="small"
                    onChange={(_, selectedValues) => onChange(selectedValues)}
                    value={value || ''}
                    // onInputChange={debounce(carsSearchHandler)}
                    getOptionLabel={(option) => option.name || ''}
                    loadingText='loading...'
                    noOptionsText='No Car Found'
                    isOptionEqualToValue={(option, value) => option._id === value._id || ''}
                    options={cars}
                    filterSelectedOptions
                    renderInput={(params) => <TextField
                        {...params}
                        label='Cars'
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />}
                    renderOption={(props, option, { selected }) => <li {...props} className={`flex gap-3 px-3 py-2 cursor-pointer hover:bg-[#f2f2f2] duration-300 ${selected && 'bg-[#f2f2f2]'}`}>
                        <img src={import.meta.env.VITE_API_URL + '/' + option.image} alt='' className="max-w-[80px] h-auto mix-blend-darken object-cover" />
                        <span className="flex flex-col">
                            <span className="text-base">{option.name}</span>
                            <span className="text-sm text-[#000000c5]">{option.type}</span>
                        </span>
                    </li>}
                />}
            />
            {errors?.cars && <span className="text-xs font-medium text-red-500">{errors.cars?.message}</span>}
        </div>
    );
}

// Props validation
CarSelectField.propTypes = {
    Form: PropTypes.any,
};

export default CarSelectField;
