import ReactDatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';

const DatePickerInput = ({ Form, name, placeholder, disabled, required, showTimeOnly, icon, dateFormat, maxDate, minDate, filterTime }) => {

    // react-hook-form
    const { control, formState: { errors } } = Form;

    return (
        <div className="flex flex-col gap-1">
            <Controller
                control={control}
                name={name}
                rules={{ required: required }}
                render={({ field: { value, onChange } }) =>
                    <div className='relative'>
                        <ReactDatePicker
                            selected={value}
                            onChange={onChange}
                            placeholderText={placeholder}
                            dateFormat={dateFormat}
                            showTimeSelect={Boolean(showTimeOnly)}
                            showTimeSelectOnly={Boolean(showTimeOnly)}
                            wrapperClassName='!w-full'
                            maxDate={maxDate && new Date().setDate(new Date().getDate() + 1)}
                            minDate={minDate && (typeof minDate === 'object' ? new Date(minDate) : new Date())}
                            filterTime={filterTime && filterTime}
                            disabled={disabled}
                            calendarClassName='!z-[100]'
                            className='!text-sm 2xl:!text-xl text-black !bg-transparent !py-3 !px-3 !w-full !font-medium !outline-none !border !border-[#00000066] rounded-md'
                        />
                        <span className='inline-block cursor-pointer absolute top-1/2 right-5 -translate-y-1/2'>{icon}</span>
                    </div>
                }
            />
            {errors[name] && <span className='text-xs text-red-500 font-medium pl-2'>{errors[name]?.message}</span>}
        </div>
    );
}

// Props Validation
DatePickerInput.propTypes = {
    Form: PropTypes.object,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    showTimeOnly: PropTypes.bool,
    icon: PropTypes.element,
    dateFormat: PropTypes.string,
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    filterTime: PropTypes.any
};

export default DatePickerInput;
