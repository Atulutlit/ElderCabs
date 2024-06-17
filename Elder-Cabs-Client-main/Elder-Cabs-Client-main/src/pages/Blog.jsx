// assets
import { useEffect, useState } from 'react';
import heroImg from '../assets/images/blog/hero.png';
import HeroSlider from '../components/Blog/HeroSlider';
import blogApi from '../api/blog';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';

export const numberShorten = (num) => {
    num = num?.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
        return num;
    }
    let si = [
        { v: 1e3, s: "K" },
        { v: 1e6, s: "M" },
        { v: 1e9, s: "B" },
        { v: 1e12, s: "T" },
        { v: 1e15, s: "P" },
        { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (
        (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
        si[index].s
    );
};

const BlogItem = ({ blog }) => {

    const { _id, title, image, category, viewCount, createdAt } = blog;

    return <div className='bg-white rounded-lg 2xl:rounded-xl shadow-xl p-4 flex flex-col'>
        <div className='overflow-hidden rounded-lg mb-4'>
            <Link to={`/blog/${_id}`}>
                <img draggable={false} src={`${import.meta.env.VITE_API_URL}/${image}`} alt={title} className='w-full aspect-video h-full object-cover' />
            </Link>
        </div>
        <div className='mt-5 flex-1 flex flex-col max-md:gap-y-3 gap-y-5 2xl:gap-y-8'>
            <span className='text-violet-500 bg-violet-100  w-fit text-xs 2xl:text-xl font-medium px-2 py-1 rounded'>{category}</span>
            <Link to={`/blog/${_id}`} className='flex-1'>
                <h1 className='text-black font-semibold text-xl 2xl:text-3xl'>{title}</h1>
            </Link>
            <div className='flex gap-x-4 items-center justify-between'>
                <span className='text-[#97989F] text-sm 2xl:text-2xl flex items-center gap-1'>
                    {numberShorten(parseInt(viewCount))}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </span>
                {/* <div className='flex items-center gap-2'>
                    <div className='w-10 h-10 2xl:w-14 2xl:h-14 rounded-full overflow-hidden'>
                        <img src='https://images.pexels.com/photos/13607325/pexels-photo-13607325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' className='w-full h-full object-cover' />
                    </div>
                    <span className='text-[#97989F] text-sm 2xl:text-2xl font-medium'>Jhon Smith</span>
                </div> */}
                <span className='text-[#97989F] text-sm 2xl:text-2xl'>{createdAt && moment(createdAt).format('MMMM DD YYYY')}</span>
            </div>
        </div>
    </div>
}

const Blog = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch blogs
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                let res = await blogApi.getAll(1, 1000);
                res = res.data;
                setBlogs(res?.rows);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    // init scroll
    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    const heroBlog = blogs?.length > 0 ? blogs[0] : null;

    return (
        <div className="mt-28 2xl:mt-36">
            <div className="container mx-auto px-5 mt-10">
                <div className='h-[50vw] lg:h-[80vh] w-full overflow-hidden rounded-2xl'>
                    <HeroSlider />
                </div>
                <div className='bg-white rounded-lg 2xl:rounded-2xl shadow-xl max-sm:mx-2 sm:w-[450px] 2xl:w-[650px] sm:translate-x-[20%] max-sm:-translate-y-[20%] sm:-translate-y-[30%] md:-translate-y-[50%] max-sm:p-3 p-5 2xl:p-10'>
                    <span className='text-white bg-violet-500 text-xs 2xl:text-xl font-medium px-3 py-1 rounded'>{heroBlog?.category}</span>
                    <h1 className='max-sm:text-xl text-2xl 2xl:text-4xl text-black font-semibold my-3 2xl:my-7'>{heroBlog?.title}</h1>
                    <div className='flex max-sm:gap-x-2 gap-x-4 items-center'>
                        <span className='text-[#97989F] text-sm 2xl:text-2xl flex items-center gap-1'>
                            {heroBlog?.viewCount && numberShorten(heroBlog?.viewCount)}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </span>
                        {/* <div className='w-12 h-12 2xl:w-16 2xl:h-16 rounded-full overflow-hidden'>
                            <img src='https://images.pexels.com/photos/4974360/pexels-photo-4974360.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' className='w-full h-full object-cover' />
                        </div>
                        <span className='text-[#97989F] text-sm 2xl:text-2xl font-medium'>Jhon Smith</span> */}
                        <span className='text-[#97989F] text-sm 2xl:text-2xl'>{heroBlog?.createdAt && moment(heroBlog?.createdAt).format('MMMM DD YYYY')}</span>
                    </div>
                </div>
            </div>
            <div className='container mx-auto px-5'>
                <div className='pb-20'>
                    <h1 className='text-3xl 2xl:text-5xl font-semibold text-black'>All blog posts</h1>
                    {!loading && (blogs?.length > 0 ? <div className='mt-10 grid sm:grid-cols-2 xl:grid-cols-3 gap-5 2xl:gap-10'>
                        {blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)}
                    </div> : <p className='text-center text-xl text-red-400 font-medium mt-10 w-fit px-5 py-2 bg-red-100 mx-auto'>No blog found</p>)}
                </div>
            </div>
        </div>
    );
}

export default Blog;
