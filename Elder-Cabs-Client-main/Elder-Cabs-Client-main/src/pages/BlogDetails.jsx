import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogApi from '../api/blog';
import { numberShorten } from './Blog';
import moment from 'moment';
import parser from 'html-react-parser';

const BlogDetails = () => {

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const { blogId } = useParams();

    // fetch blog
    useEffect(() => {
        if (blogId) {
            (async () => {
                try {
                    const res = await blogApi.getById(blogId);
                    setBlog(res.data);
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [blogId]);

    // update blog view count
    useEffect(() => {
        if (blog) {
            blogApi.viewCount(blog._id);
        }
    }, [blog]);

    // init scroll
    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    if (loading) {
        return <></>
    }

    if (!blog) {
        return <>Blog Not Found</>;
    }

    const { image, tags, title, content, createdAt, category, viewCount } = blog;

    return (
        <div className='mt-28 pb-20'>
            <div className='container mx-auto px-5 max-md:px-2'>
                <div className='mt-10 flex max-md:flex-col gap-5'>
                    <div className='md:w-8/12'>
                        <div className='rounded-lg shadow-xl overflow-hidden'>
                            <img draggable={false} src={`${import.meta.env.VITE_API_URL}/${image}`} alt={title} className='w-full aspect-[16/9] object-cover' />
                        </div>
                        <div className='mt-10 px-5'>
                            <h1 className='text-black font-semibold text-2xl 2xl:text-4xl'>{title}</h1>
                            <p className='flex justify-start items-center mt-2 gap-3'>
                                <span className='text-violet-500 bg-violet-100  w-fit text-xs 2xl:text-xl font-medium px-2 py-1 rounded'>{category}</span>
                                <span className='text-[#97989F] text-sm 2xl:text-2xl flex items-center gap-1'>
                                    {numberShorten(parseInt(viewCount))}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <span className='text-[#97989F] text-sm 2xl:text-2xl'>{createdAt && moment(createdAt).format('MMMM DD YYYY')}</span>
                            </p>
                            <div className='text-black mt-10 text-sm'>
                                {parser(content)}
                            </div>
                            <h1 className='text-black font-semibold text-xl 2xl:text-2xl mt-10'>Tags</h1>
                            <div className='flex gap-3 flex-wrap mt-3'>
                                {tags.map((item, index) => <span key={index} className='text-violet-500 bg-violet-100  w-fit text-sm 2xl:text-xl font-medium px-4 py-2 rounded-full shadow-lg'>{item}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetails;
