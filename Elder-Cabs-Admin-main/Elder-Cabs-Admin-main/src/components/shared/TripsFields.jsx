import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import PropTypes from 'prop-types';

export const SourceCityField = ({ Form }) => {

    // react-hook-form
    const { register, formState: { errors } } = Form;

    return <div>
        <TextField
            label='Source City'
            size="small"
            className="!text-sm"
            InputLabelProps={{ className: '!text-sm' }}
            fullWidth
            {...register('sourceCity', { required: 'Source city is required' })}
        />
        {errors?.sourceCity && <span className="text-xs font-medium text-red-500">{errors.sourceCity?.message}</span>}
    </div>
}

// Props Validation
SourceCityField.propTypes = {
    Form: PropTypes.any
}

export const DestinationField = ({ Form }) => {

    // react-hook-form
    const { register, formState: { errors } } = Form;

    return <div>
        <TextField
            label='Destination'
            size="small"
            className="!text-sm"
            InputLabelProps={{ className: '!text-sm' }}
            fullWidth
            {...register('destination', { required: 'Destination city is required' })}
        />
        {errors?.destination && <span className="text-xs font-medium text-red-500">{errors.destination?.message}</span>}
    </div>
}

// Props Validation
DestinationField.propTypes = {
    Form: PropTypes.any
}

export const NumberInputField = ({ Form, name, errorMsg, label, icon }) => {

    // react-hook-form
    const { register, formState: { errors } } = Form;

    return <div>
        <FormControl fullWidth size="small">
            <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">{icon}</InputAdornment>}
                label={label}
                type="number"
                className="!text-sm"
                InputLabelProps={{ className: '!text-sm' }}
                {...register(name, { required: errorMsg })}
            />
        </FormControl>
        {errors[name] && <span className="text-xs font-medium text-red-500">{errors[name]?.message}</span>}
    </div>
}

// Props Validation
NumberInputField.propTypes = {
    Form: PropTypes.any,
    name: PropTypes.string,
    label: PropTypes.string,
    errorMsg: PropTypes.string,
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
}