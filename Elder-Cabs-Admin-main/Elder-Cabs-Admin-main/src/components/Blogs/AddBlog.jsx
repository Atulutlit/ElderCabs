import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import categoryApi from "../../api/category";
import { Button, Checkbox, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import RichEditor from "./RichEditor/RichEditor";
import { useSearchParams } from "react-router-dom";
import blogApi from "../../api/blog";
import { AddCategory } from "../../pages/Categories";
import { ChevronLeft, Delete } from "@mui/icons-material";
import ImageCropper from "../shared/ImageCropper";
import { toast } from 'react-toastify';

const AddBlog = () => {

    // states
    const [blog, setBlog] = useState({ title: '', tags: [], content: '', textContent: '', image: null, category: '', published: false, });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [categoryModal, setCategoryModal] = useState(false);
    const [tag, setTag] = useState('');
    const [editorInitContent, setEditInitContent] = useState('');

    const [search] = useSearchParams();
    const blogId = search.get('blogId');

    // categories
    const { data: categories = [], refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await categoryApi.read();
            return res.data;
        }
    });

    // add blog handler 
    const addBlogHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        setError('');

        if (!blog.image) {
            setError('Blog image is required');
            return;
        }

        if (!blog.textContent) {
            setError('Blog content is required');
            return;
        }

        if (blog.tags.length <= 0) {
            setError('Blog tags is required');
            return;
        }

        for (let key in blog) {
            if (Array.isArray(blog[key])) {
                for (let item of blog[key]) {
                    formData.append(key, item);
                }
            } else {
                formData.append(key, blog[key]);
            }
        }

        try {

            await blogApi.create(formData);
            setBlog({ title: '', tags: [], content: '', textContent: '', image: null, category: '', published: false, });

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // update blog handler
    const updateBlogHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        setError('');

        if (!blog.textContent) {
            setError('Blog content is required');
            return;
        }

        if (blog.tags.length <= 0) {
            setError('Blog tags is required');
            return;
        }

        for (let key in blog) {
            if (key !== 'image') {
                if (Array.isArray(blog[key])) {
                    for (let item of blog[key]) {
                        formData.append(key, item);
                    }
                } else {
                    formData.append(key, blog[key]);
                }
            }
        }

        if (typeof blog.image === 'object') {
            formData.append('image', blog.image);
        }
        setLoading(true);
        try {
            await blogApi.update(blogId, formData);
            toast.success('Updated');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

    }

    // fetch blog by blog id
    useEffect(() => {
        if (blogId) {
            (async () => {
                try {
                    const res = await blogApi.readById(blogId);
                    if (res.data) {
                        let blog = res.data;
                        blog?.createdAt && delete blog.createdAt;
                        blog?.updatedAt && delete blog.updatedAt;
                        setBlog(blog);
                        setEditInitContent(blog?.content);
                    }
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [blogId]);

    return (
        <div className=''>
            <h1 className='text-2xl font-semibold mb-4 pl-3 pb-2 border-b-2'>{blog?._id ? 'Update Blog' : 'Add Blog'}</h1>

            <Button onClick={() => window.history.back()} variant="contained" className="!ml-5" startIcon={<ChevronLeft />}>
                Go Back
            </Button>

            <form onSubmit={blog._id ? updateBlogHandler : addBlogHandler} className='bg-white rounded-md px-5 py-10 mt-10'>
                <div className="grid grid-cols-2 gap-6">
                    <div className='col-span-2'>
                        <TextField
                            fullWidth
                            size='small'
                            label='Title'
                            variant="outlined"
                            value={blog.title}
                            required
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        />
                    </div>
                    <div className='col-span-2'>
                        <RichEditor
                            initialContent={editorInitContent}
                            content={blog.content}
                            changeHandler={(html, text) => {
                                if (text.trim()) {
                                    setBlog({ ...blog, content: html, textContent: text.trim() });
                                }
                            }}
                        />
                    </div>
                    <div className='flex items-center'>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Category</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={blog.category}
                                label="Category"
                                required
                                MenuProps={{ sx: { maxHeight: '70vh' } }}
                                onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {categories.map(category => <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button
                            type='button'
                            variant="contained"
                            className="whitespace-nowrap !px-5 !py-2"
                            onClick={() => setCategoryModal(true)}
                        >
                            Add Category
                        </Button>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <span className='text-base'>Published</span>
                        <Checkbox checked={Boolean(blog.published)} onChange={(e) => setBlog({ ...blog, published: e.target.checked })} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <span className='text-base'>Tags</span>
                        <div className="flex flex-wrap gap-3">
                            {blog.tags.map((item, index) => <p key={index} className="px-3 py-2 group rounded-full text-sm bg-[#000] bg-opacity-30 text-black cursor-pointer relative overflow-hidden">
                                <span
                                    className="absolute top-0 left-0 text-white grid place-items-center w-full h-full bg-black duration-300 invisible group-hover:visible"
                                    onClick={() => {
                                        let tags = [...blog.tags];
                                        tags.splice(index, 1);
                                        setBlog({ ...blog, tags: tags });
                                    }}>
                                    <Delete fontSize="small" />
                                </span>
                                {item}
                            </p>)}
                        </div>
                        <div className="flex mt-2">
                            <div className="flex-1">
                                <TextField
                                    fullWidth
                                    size='small'
                                    label='Tag'
                                    variant="outlined"
                                    name='tag'
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                />
                            </div>
                            <Button
                                disabled={Boolean(!tag)}
                                type='button'
                                variant="contained"
                                className="whitespace-nowrap !px-5 !py-2"
                                onClick={() => {
                                    const tags = [...blog.tags];
                                    tags.push(tag);
                                    setBlog({ ...blog, tags: tags });
                                    setTag('');
                                }}
                            >
                                Add Tag
                            </Button>
                        </div>
                    </div>
                    <div>
                        <ImageCropper resizableImage={(e) => setBlog({ ...blog, image: e })}>
                            {!blog.image && <div className="w-full px-2 text-center py-5 border-4 cursor-pointer border-dashed">
                                <p className="text-sm">Drag 'n' drop thumbnail here, or click to select thumbnail</p>
                                <p className="text-sm opacity-75">Accept .png, .jepg, .webp</p>
                            </div>}
                            {blog.image && typeof blog.image === 'object' && <img src={URL.createObjectURL(blog?.image)} className='w-full h-auto rounded-md aspect-video' alt='' />}
                            {blog.image && typeof blog.image === 'string' && <img src={`${import.meta.env.VITE_API_URL}/${blog.image}`} className='w-full h-auto rounded-md aspect-video' alt='' />}
                        </ImageCropper>
                    </div>
                </div>
                {error && <p className="mt-4 text-center text-red-500 text-sm">{error}</p>}
                <div className='mt-5'>
                    <Button type='submit' disabled={loading} variant="contained" className="!w-full !py-3" startIcon={loading && <CircularProgress size={18} sx={{ '& circle': { stroke: '#fff', strokeWidth: 8 } }} />} >{blog?._id ? 'Update Blog' : 'Add Blog'}</Button>
                </div>
            </form>

            {/* add category modal */}
            <Modal open={categoryModal} onClose={() => setCategoryModal(false)} className='grid place-items-center'>
                <div className='md:w-[500px] w-11/12 rounded-md bg-white shadow-xl outline-none'>
                    <AddCategory categories={categories} refetch={refetch} close={() => setCategoryModal(false)} />
                </div>
            </Modal>

        </div>
    );
}

export default AddBlog;
