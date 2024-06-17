
// assets
import { useEffect, useState } from 'react';
import heroImg from '../assets/images/contact/hero.png';
import { useForm } from 'react-hook-form';
import contactApi from '../api/contact';

const ContactUs = () => {

    // states
    const [loading, setLoading] = useState(false);

    // react-hook-form
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // send mail handler
    const sendMailHandler = async (data) => {
        setLoading(true);

        try {
            await contactApi.sendMail(data);
            reset();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // fields array 
    const fieldsArray = [
        {
            name: 'fname',
            type: 'text',
            placeholder: 'First Name',
            validation: { required: 'First name is required' },
        },
        {
            name: 'lname',
            type: 'text',
            placeholder: 'Last Name',
            validation: { required: false },
        },
        {
            name: 'email',
            type: 'email',
            placeholder: 'Your E-Mail ID',
            validation: {
                required: 'Email is required',
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                }
            },
        },
        {
            name: 'phoneNo',
            type: 'tel',
            placeholder: 'Your Phone Number',
            validation: {
                required: 'Phone number is required',
                pattern: {
                    value: /^\d{10}$/,
                    message: 'Invalid phone number'
                }
            },
        },
        {
            name: 'subject',
            type: 'text',
            placeholder: 'Subject',
            validation: {
                required: 'Subject is required',
            },
        },
        {
            name: 'message',
            type: 'textarea',
            placeholder: 'Your Message',
            validation: {
                required: 'Message is required',
            },
        },
    ];

    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    return (
        <div className="">
            <div className='relative'>
                <div className='w-full h-[70vh] after:content-[""] after:w-full after:h-full after:bg-[#00000075] after:top-0 after:left-0 after:absolute'>
                    <img src={heroImg} alt='contact hero' className='w-full h-full object-cover' />
                </div>
                <div className='absolute top-0 left-20 h-full flex items-center'>
                    <h1 className='text-white text-4xl font-semibold'>Contact Us</h1>
                </div>
            </div>
            <div className='container mx-auto px-4'>
                <div className='flex max-lg:flex-col-reverse max-lg:gap-y-16 my-10 justify-between relative'>
                    <div className='lg:w-4/12 flex flex-col gap-y-'>
                        <h2 className='text-lg 2xl:text-2xl font-semibold text-black mb-4'>Elder Fleet Supply Solutions Private Limited</h2>
                        <div className='flex items-start gap-x-3 duration-200 hover:bg-[#8530951A] rounded-lg border-2 border-transparent hover:border-[#853095] p-2 cursor-pointer'>
                            <span className='text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </span>
                            <p className='text-sm 2xl:text-xl text-black font-medium'>1/4751, Balbirnagar Extn.,<br />Shahdara, Delhi 110032</p>
                        </div>
                        <div className='flex items-start gap-x-3 duration-200 hover:bg-[#8530951A] rounded-lg border-2 border-transparent hover:border-[#853095] p-2 cursor-pointer'>
                            <span className='text-black'>
                                <svg
                                    width={18}
                                    height={19}
                                    viewBox="0 0 18 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.62 7.82168C5.06 10.66 7.38 12.9768 10.21 14.431L12.41 12.2246C12.68 11.9538 13.08 11.8635 13.43 11.9839C14.55 12.355 15.76 12.5555 17 12.5555C17.55 12.5555 18 13.0069 18 13.5585V17.0587C18 17.6104 17.55 18.0617 17 18.0617C7.61 18.0617 0 10.4293 0 1.01173C0 0.460111 0.45 0.00878906 1 0.00878906H4.5C5.05 0.00878906 5.5 0.460111 5.5 1.01173C5.5 2.2654 5.7 3.46893 6.07 4.59222C6.18 4.94325 6.1 5.33439 5.82 5.61521L3.62 7.82168Z"
                                        fill="black"
                                    />
                                </svg>
                            </span>
                            <p className='text-sm 2xl:text-xl text-black font-medium'>+91-7428203766</p>
                        </div>
                        <div className='flex items-start gap-x-3 duration-200 hover:bg-[#8530951A] rounded-lg border-2 border-transparent hover:border-[#853095] p-2 cursor-pointer'>
                            <span className='text-black mt-1'>
                                <svg
                                    width={20}
                                    height={17}
                                    viewBox="0 0 20 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20 0.0703125H0V16.0703H20V0.0703125ZM18 4.07031L10 9.07031L2 4.07031V2.07031L10 7.07031L18 2.07031V4.07031Z"
                                        fill="black"
                                    />
                                </svg>
                            </span>
                            <div className='flex flex-col gap-y-2'>
                                <p className='text-sm 2xl:text-xl text-black leading-none font-medium'>info@eldercabs.com</p>
                                <p className='text-sm 2xl:text-xl text-black leading-none font-medium'>infoeldercabs@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-5/12 max-lg:-mt-[50%] lg:absolute lg:bottom-0 lg:right-0'>
                        <div className='bg-white shadow-2xl rounded-xl max-sm:px-4 px-5 py-7'>
                            <form className='flex flex-col gap-y-2' onSubmit={handleSubmit(sendMailHandler)}>
                                {fieldsArray.map((item, index) => <div key={index}>
                                    {item.type === 'textarea' ?
                                        <textarea {...register(item.name, item.validation)} placeholder={item.placeholder} className='focus:border-violet-500 duration-200 w-full h-36 rounded-lg resize-none text-sm 2xl:text-xl outline-none bg-transparent px-3 py-3 text-black border border-[#00000099]'></textarea>
                                        :
                                        <input type={item.type} {...register(item.name, item.validation)} placeholder={item.placeholder} className='focus:border-violet-500 duration-200 w-full rounded-lg text-sm 2xl:text-xl outline-none bg-transparent px-3 py-3 text-black border border-[#00000099]' />
                                    }
                                    {errors[item.name] && <span className='text-xs text-red-500 font-medium'>{errors[item.name]?.message}</span>}
                                </div>
                                )}
                                {loading && <div className='flex justify-center'>
                                    <span className='block w-6 h-6 rounded-full bg-transparent border-[4px] border-t-transparent border-violet-500 animate-spin'></span>
                                </div>}
                                <div>
                                    <button disabled={loading} className='w-full rounded-lg py-3 bg-violet-200 hover:bg-transparent duration-200 border-2 border-violet-200 hover:border-violet-500 text-sm 2xl:text-xl font-medium text-violet-700 hover:text-violet-500'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-10 bg-white rounded-lg p-3'>
                <div className=' min-h-[70vh] relative'>
                    <iframe className='absolute top-0 left-0 h-full w-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1750.0791909783493!2d77.28922167054351!3d28.684908465019472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb0482c9c93b%3A0x1d4db556745fe7d6!2sElder%20Cabs!5e0!3m2!1sen!2sbd!4v1686118137615!5m2!1sen!2sbd" width="100%" height="100%" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
