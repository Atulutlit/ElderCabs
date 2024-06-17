import { useForm } from "react-hook-form";
import { useState } from "react";
import tripsApi from "../../api/trips";
import { Button, CircularProgress } from "@mui/material";
import PropTypes from 'prop-types';
import CarSelectField from "../shared/CarSelectField";
import { DestinationField, NumberInputField, SourceCityField } from "../shared/TripsFields";

const AddOneWayTrip = ({ refetch }) => {

    // states
    const [submitting, setSubmitting] = useState(false);

    // react-hook-form
    const Form = useForm();
    const { reset, resetField, handleSubmit } = Form;

    // trip add handler
    const tripAddHandler = async (data) => {

        setSubmitting(true);
        try {
            await tripsApi.createOneWayTrip(data);
            reset();
            resetField();
            refetch();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(tripAddHandler)} className="grid grid-cols-3 gap-4">

            {/* source city */}
            <SourceCityField Form={Form} />

            {/* destination field */}
            <DestinationField Form={Form} />

            {/* price per km */}
            <NumberInputField
                Form={Form}
                label={'Price / KM'}
                errorMsg={'Price ( per km ) is required'}
                name={'pricePerKm'}
                icon={<span>&#8377;</span>}
            />

            {/* no of km */}
            <NumberInputField
                Form={Form}
                label={'No of KMs'}
                errorMsg={'Distance is required'}
                name={'distance'}
                icon={'km'}
            />

            {/* car select field */}
            <CarSelectField Form={Form} />

            {/* surge price */}
            <NumberInputField
                Form={Form}
                label={'Surge Price'}
                errorMsg={'Surge price is required'}
                name={'surgePrice'}
                icon={<span>&#8377;</span>}
            />

            {/* driver allowance */}
            <NumberInputField
                Form={Form}
                label={'Driver Allowance'}
                errorMsg={'Driver allowance is required'}
                name={'driverAllowance'}
                icon={<span>&#8377;</span>}
            />

            {/* <div>
                <Controller
                    name="dates"
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => <DatePicker
                        multiple={true}
                        plugins={[
                            <DatePanel key={1} />
                        ]}
                        format="MM-DD-YYYY"
                        placeholder="Select Dates"
                        value={value}
                        containerClassName="!w-full"
                        inputClass="!w-full focus:!outline-none border border-[#000000] rounded-md py-2 px-3 text-sm"
                        onChange={(_, v) => {
                            const val = v.validatedValue.filter(i => typeof i === 'string');
                            onChange(val);
                        }}
                    />}
                />
            </div> */}
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
    );
}

// Props validation
AddOneWayTrip.propTypes = {
    refetch: PropTypes.func
};

export default AddOneWayTrip;
