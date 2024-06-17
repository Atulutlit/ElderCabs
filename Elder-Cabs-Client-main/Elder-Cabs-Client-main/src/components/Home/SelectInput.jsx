import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FaLocationDot } from 'react-icons/fa6';
import Select, { components } from 'react-select';


const SelectInput = ({ Form, name, options, disabled, required, placeholder, icon, errorMsg }) => {

    const { formState: { errors }, control, } = Form;

    return (
        <div className="flex flex-col gap-1">
            <Controller
                control={control}
                rules={{ required: required }}
                name={name}
                render={({ field: { onChange, value } }) => <Select
                    className='!text-sm !text-black !cursor-pointer'
                    placeholder={placeholder}
                    isClearable={true}
                    isDisabled={disabled}
                    components={{
                        DropdownIndicator: (props) => <components.DropdownIndicator {...props}>
                            {icon ? icon : <FaLocationDot className={'w-5 h-5 text-[#666666]'} />}
                        </components.DropdownIndicator>
                    }}
                    options={Array.isArray(options) ? options.map(i => ({ value: i, label: i })) : []}
                    onChange={(e) => {
                        onChange(e?.value || '');
                    }}
                    value={Array.isArray(options) ? options.map(i => ({ value: i, label: i })).find(i => i.value === value) : null}
                    styles={{
                        input: (provided) => ({
                            ...provided,
                            padding: '12px 0px',
                            marginTop: '0px !important',
                            marginBottom: '0px !important',
                        }),
                        control: (provided) => ({
                            ...provided,
                            cursor: 'pointer',
                            border: '1px solid #00000066 !important',
                            boxShadow: 'none !important',
                            minHeight: '0px !important',
                        }),
                        valueContainer: (provided) => ({
                            ...provided,
                            paddingBottom: '0px !important',
                            paddingTop: '0px !important',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? '#853095' : 'whitesmoke',
                            color: state.isSelected ? '#fff' : '#000000',
                            cursor: 'pointer',
                            ':hover': {
                                backgroundColor: '#853095',
                                color: '#fff',
                            }
                        }),
                    }}
                />}
            />

            {/* <div className='relative'>
                <select
                    disabled={disabled}
                    {...register(name, {})}
                    className='text-black !bg-transparent text-sm 2xl:!text-xl font-semibold w-full px-3 py-3 rounded-md outline-none border border-[#00000066] appearance-none cursor-pointer'
                >
                    <option value=''>{placeholder}</option>
                    {Array.isArray(options) && options.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
                <span className='inline-block cursor-pointer absolute top-1/2 right-5 -translate-y-1/2'>
                    {icon ? icon : <FaLocationDot className={'w-5 h-5 text-[#666666]'} />}
                </span>
            </div> */}

            {errorMsg && <span className='text-xs text-red-500 font-medium pl-2'>{errorMsg}</span>}
            {errors[name] && <span className='text-xs text-red-500 font-medium pl-2'>{errors[name]?.message}</span>}
        </div>
    );
}

// Props Validation
SelectInput.propTypes = {
    Form: PropTypes.object,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
    options: PropTypes.array,
    disabled: PropTypes.bool,
    icon: PropTypes.element,
    required: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
};

export default SelectInput;
