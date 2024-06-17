import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import attachTaxiApi from '../../api/attachTaxi'

const FloatingLabelInput = ({ label, name, type, validation, HookForm }) => {

    const { register, formState: { errors } } = HookForm;

    useEffect(() => {
        const label = document.getElementById(`${name}-label`);
        const input = document.getElementById(name);

        input.onfocus = () => {
            label.classList.add('!top-0', '!text-xs', '2xl:!text-base');
        }

        input.onblur = (e) => {
            if (!e.target.value) {
                label.classList.remove('!top-0', '!text-xs', '2xl:!text-base');
            }
        }

    }, [name]);

    return (
        <div>
            <div className="relative">
                <label
                    htmlFor={name}
                    id={`${name}-label`}
                    className="absolute -z-40 top-1/2 -translate-y-1/2 left-0  transition-all duration-300 ease-in-out text-[#00000099] text-sm 2xl:text-xl ml-3 "
                >{label}</label>
                <input
                    type={type}
                    id={name}
                    className="w-full peer z-50 text-black focus:bg-transparent appearance-none text-sm 2xl:text-2xl px-3 pb-2 pt-3 border-b border-[#00000099] focus:outline-none bg-transparent"
                    {...register(name, validation)}
                />
            </div>
            {errors[name] && <span className='text-xs text-red-500 font-medium'>{errors[name]?.message}</span>}
        </div>
    );
};

const Form = () => {

    // states 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // react-hook-form for form validation
    const HookForm = useForm();
    const { handleSubmit, reset, resetField } = HookForm;

    // form submit
    const attachTaxiHandler = async (data) => {
        setLoading(true);
        try {
            await attachTaxiApi.create(data);
            setSuccess(true);
            reset();
            resetField();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // fields
    const fieldArr = [
        {
            name: 'name',
            type: 'text',
            label: 'Full Name',
            validation: { required: 'Name is required' }
        },
        {
            name: 'phoneNo',
            type: 'tel',
            label: 'Mobile Number',
            validation: {
                required: 'Mobile number is required',
                pattern: {
                    value: /^\d{10}$/,
                    message: 'Invalid mobile number'
                }
            }
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email ID',
            validation: {
                required: 'Email is required',
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                }
            }
        },
        {
            name: 'companyName',
            type: 'text',
            label: 'Company Name',
            validation: { required: 'Company name is required' }
        },
        {
            name: 'state',
            type: 'text',
            label: 'State',
            validation: { required: 'State is required' }
        },
        {
            name: 'city',
            type: 'text',
            label: 'City',
            validation: { required: 'city is required' }
        },
    ];

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        }
    }, [success])

    return (
        <div className="py-20">
            <form onSubmit={handleSubmit(attachTaxiHandler)} className="px-5 lg:w-[1000px] mx-auto">
                <div className="grid max-sm:grid-cols-1 grid-cols-2 sm:gap-x-20 lg:gap-x-32 gap-y-8 mb-10 2xl:mb-16">
                    {fieldArr.map((item, index) => <FloatingLabelInput key={index} {...item} HookForm={HookForm} />)}
                    {/* <FloatingLabelInput name='name' label={''} type='text' HookForm={HookForm} />
                    <FloatingLabelInput name='phone' label={'Mobile Number'} type='tel' HookForm={HookForm} />
                    <FloatingLabelInput name='email' label={'Email ID'} type='email' HookForm={HookForm} />
                    <FloatingLabelInput name='companyName' label={'Company Name'} type='text' HookForm={HookForm} />
                    <FloatingLabelInput name='state' label={'Your State'} type='text' HookForm={HookForm} />
                    <FloatingLabelInput name='city' label={'Your City'} type='text' HookForm={HookForm} /> */}
                </div>
                {loading && <div className='flex justify-center'>
                    <svg
                        className='w-20 h-auto'
                        version="1.1"
                        id="L5"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100"
                        enableBackground="new 0 0 0 0"
                        xmlSpace="preserve"
                    >
                        <circle fill="#853095" stroke="none" cx={6} cy={50} r={6}>
                            <animateTransform
                                attributeName="transform"
                                dur="1s"
                                type="translate"
                                values="0 15 ; 0 -15; 0 15"
                                repeatCount="indefinite"
                                begin="0.1"
                            />
                        </circle>
                        <circle fill="#853095" stroke="none" cx={30} cy={50} r={6}>
                            <animateTransform
                                attributeName="transform"
                                dur="1s"
                                type="translate"
                                values="0 10 ; 0 -10; 0 10"
                                repeatCount="indefinite"
                                begin="0.2"
                            />
                        </circle>
                        <circle fill="#853095" stroke="none" cx={54} cy={50} r={6}>
                            <animateTransform
                                attributeName="transform"
                                dur="1s"
                                type="translate"
                                values="0 5 ; 0 -5; 0 5"
                                repeatCount="indefinite"
                                begin="0.3"
                            />
                        </circle>
                    </svg>
                </div>}
                {success && <p className='text-sm max-w-[300px] mx-auto text-violet-500 font-medium text-center pb-5'>Successfully submitted your query. Our team contact you soon.</p>}
                <div className="text-center">
                    <button disabled={loading} type='submit' className='w-1/2 rounded-2xl py-3 bg-violet-200 hover:bg-transparent duration-200 border-2 border-violet-200 hover:border-violet-500 text-sm 2xl:text-xl font-medium text-violet-700 hover:text-violet-500'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
