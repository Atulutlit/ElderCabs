import { useEffect } from "react";
import { useState } from "react";
import bookingApi from "../../api/booking";

const BookingSuccess = ({ bookingId }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                await bookingApi.paymentSuccess({ bookingId });
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [bookingId]);

    return (
        <div className="w-full h-screen z-[100000]  fixed top-0 left-0 bg-[black] bg-opacity-25 grid place-items-center">
            <div className="bg-white shadow-lg px-5 py-7 rounded-2xl text-center">
                <div className="mb-7 flex flex-col items-center gap-3">
                    <svg
                        className="w-16 h-auto mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 66 53"
                        fill="none"
                    >
                        <path
                            d="M5 31.4968L21.5605 48.0574L61.3058 5"
                            stroke="#853095"
                            strokeWidth="8.52581"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <h5 className="text-violet-500 text-xl font-bold uppercase" >SUCCESS!</h5>
                </div>
                <p className="text-sm font-semibold text-[#4A4A4A]">
                    Thank you for your request. <br />
                    We are working hard to find the best service and deals for you.
                </p>
                <p className="text-sm font-normal text-[#4A4A4A] my-5">Kindly check your email for confirmation.</p>
                <button
                    onClick={() => {
                        window.location.search = '';
                    }}
                    disabled={loading}
                    className='rounded-lg w-fit py-2 px-10 shadow-md hover:shadow-none duration-200 hover:bg-transparent border border-violet-200 hover:border-violet-700 bg-violet-200 text-violet-700 text-sm font-medium'
                >Continue</button>
            </div>
        </div>
    );
}

export default BookingSuccess;
