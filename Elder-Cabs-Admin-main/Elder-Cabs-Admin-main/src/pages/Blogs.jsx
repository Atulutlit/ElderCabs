import { Add, Delete, Edit, Search } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import blogApi from "../api/blog";
import { useState } from "react";
import moment from "moment/moment";

const Blogs = () => {

    const [pagination, setPagination] = useState({ page: 1, limit: 30 });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // blog fetcher
    const { data: blogs = {}, isLoading, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await blogApi.readAll(pagination.page, pagination.limit);
            return res.data;
        }
    });

    // delete handler
    const deleteHandler = async (e, blogId) => {
        e.target.disabled = true;
        try {
            await blogApi.delete(blogId);
            refetch()
        } catch (err) {
            console.error(err)
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Blogs</h1>
            <div className='flex justify-between mt-5'>
                <div className=''>

                </div>
                <Link to={'/blogs/add-blog'}>
                    <Button variant="outlined" startIcon={<Add />}>
                        Add Blog
                    </Button>
                </Link>
            </div>
            <div className="mt-10">
                {isLoading && <div className="flex justify-center py-5">
                    <CircularProgress />
                </div>}
                {!isLoading && (
                    blogs?.rows?.length > 0 ?
                        <div className="grid gap-5 xl:grid-cols-3">
                            {blogs?.rows?.map(({ _id, title, category, image, textContent, createdAt }) => <div key={_id} className="rounded overflow-hidden shadow-lg flex flex-col">
                                <Link>
                                    <div className="relative">
                                        <img
                                            className="w-full aspect-[16/9]"
                                            src={`${import.meta.env.VITE_API_URL}/${image}`}
                                            alt={title}
                                        />
                                        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                                        <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                            {category}
                                        </div>
                                        <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                            <span className="font-bold">{moment(createdAt).format('DD')}</span>
                                            <small>{moment(createdAt).format('MMMM')}</small>
                                        </div>
                                    </div>
                                </Link>
                                <div className="px-6 py-4 flex-1">
                                    <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{title}</a>
                                    <p className="text-gray-500 text-sm">
                                        {textContent.length > 100 ? textContent.slice(0, 100) + '...' : textContent}
                                    </p>
                                </div>
                                <div className="px-6 pb-4 flex justify-between">
                                    <Link to={`/blogs/add-blog?blogId=${_id}`}>
                                        <Button variant="outlined" endIcon={<Edit />}>
                                            Update
                                        </Button>
                                    </Link>
                                    <Button onClick={(e) => deleteHandler(e, _id)} variant="contained" startIcon={<Delete />}>
                                        Delete
                                    </Button>
                                </div>
                                {/* <div className="px-6 py-4 flex flex-row items-center">
                                <span href="#" className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
                                    <svg height="13px" width="13px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml: space="preserve">
                                        <g>
                                            <g>
                                                <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
			c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
			c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span className="ml-1">6 mins ago</span></span>
                            </div> */}
                            </div>)}
                        </div>
                        :
                        <p className="text-center text-red-500 py-5 font-medium">No Blogs Found</p>
                )}
            </div>
        </div >
    );
}

export default Blogs;
