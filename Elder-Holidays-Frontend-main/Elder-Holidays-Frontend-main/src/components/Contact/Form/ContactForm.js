import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useMail from '../../../hooks/useMail';

const ContactForm = () => {

    const [loading, setLoading] = useState(false);
    const [mail] = useMail();

    const formHandler = async (e) => {
        e.preventDefault();
        const form = e.target,
            name = form.name.value,
            email = form.email.value,
            message = form.message.value;

        setLoading(true);
        const res = await mail('/mail/contact', { name, email, message });
        form.reset();
        toast.success('Successfully submitted');
        setLoading(false);
    }

    return (
        <>
            <div className="text-left font-medium text-lg">
                <div className='mb-10'>
                    <h2 className="font-medium leading-tight text-3xl mt-0 mb-2">Message Us</h2>
                </div>
                <form onSubmit={formHandler}>
                    <div className="form-group mb-6">
                        <label htmlFor="name" className="form-label inline-block mb-2 text-gray-700">Name</label>
                        <input type="text" className="form-control border-black block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="name"
                            placeholder="Name" name='name' required />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700">Email ID</label>
                        <input type="email" className="form-control border-black block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
                            placeholder="Email address" name='email' required />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="message" className="form-label inline-block mb-2 text-gray-700">Message</label>
                        <textarea
                            className="form-control border-black block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="message"
                            rows="3"
                            placeholder="Message"
                            name='message'
                        ></textarea>
                    </div>
                    <button disabled={loading} type="submit" className="w-full px-6 py-2.5 bg-sky-500 text-white font-medium text-lg leading-tight capitalize rounded-lg shadow-md hover:bg-sky-500 hover:shadow-lg focus:bg-sky-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Send</button>
                </form>
            </div>
        </>
    );
};

export default ContactForm;