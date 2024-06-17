import { Button, CircularProgress, IconButton, Modal, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import categoryApi from '../api/category';
import { useQuery } from 'react-query';
import { Delete, Edit } from '@mui/icons-material';

export const AddCategory = ({ refetch, categories, category, close }) => {

    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // add category handler
    const addCategoryHandler = async () => {

        if (!categoryName) {
            setError('Category name is required');
            return;
        }

        const findCategory = Array.isArray(categories) && categories.find(i => i.name === categoryName);

        if (findCategory) {
            setError('Category already exists');
            return;
        }

        setLoading(true);
        try {
            await categoryApi.create({ name: categoryName });
            setCategoryName('');
            typeof refetch === 'function' && refetch();
            typeof close === 'function' && close();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // update category handler
    const updateCategoryHandler = async () => {

        if (!categoryName) {
            setError('Category name is required');
            return;
        }

        const findCategory = Array.isArray(categories) && categories.find(i => i.name === categoryName);

        if (findCategory) {
            setError('Category already exists');
            return;
        }

        setLoading(true);
        try {
            await categoryApi.update(category._id, { name: categoryName });
            setCategoryName('');
            typeof refetch === 'function' && refetch();
            category && close();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (category) {
            setCategoryName(category.name);
        }
    }, [category])

    return (<div className='p-4 rounded-lg shadow-lg border'>
        <div className='flex flex-col gap-4'>
            <h1 className='text-center text-xl font-medium pb-2 border-b'>{category ? 'Update Category' : 'Add Category'}</h1>
            <TextField
                label="Category"
                variant="outlined"
                fullWidth size='small'
                type='text'
                required
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            {error && <p className='text-center text-red-500 text-sm font-medium'>{error}</p>}
            <Button
                onClick={category ? updateCategoryHandler : addCategoryHandler}
                variant='contained'
                className='w-full'
                disabled={loading}
                startIcon={loading && <CircularProgress size={16} sx={{ '& circle': { stroke: 'white', strokeWidth: 8 } }} />}
            >
                {category ? 'Update Category' : 'Add Category'}
            </Button>
        </div>
    </div>);
}


const Categories = () => {

    const [editCategory, setEditCategory] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await categoryApi.read();
            return res.data;
        }
    });

    // delete category handler
    const deleteCategory = async (e) => {
        if (!deleteConfirm) {
            return;
        }

        e.target.disabled = true;
        try {
            await categoryApi.delete(deleteConfirm._id);
            refetch();
            setDeleteConfirm(null);
        } catch (err) {
            console.error(err);
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div className=''>
            <h1 className='text-2xl font-semibold pl-3 pb-2 border-b-2'>Categories</h1>
            <div className='flex mt-10 rounded-md px-5 py-8 bg-white gap-5'>
                <div className='w-1/2'>
                    <div className=''>
                        {isLoading && <div className='flex py-3 justify-center'>
                            <CircularProgress />
                        </div>}
                        {!isLoading && (Array.isArray(categories) && categories.length > 0 ? <div className='flex flex-col gap-y-4'>
                            {categories.map(category => <div key={category._id} className='rounded-md border shadow-md px-3 py-1 flex  items-center justify-between'>
                                <p className='flex-1 text-sm font-semibold'>{category.name}</p>
                                <Tooltip title='Edit Category'>
                                    <IconButton size='small' onClick={() => setEditCategory(category)}>
                                        <Edit fontSize='small' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Delete Category'>
                                    <IconButton size='small' onClick={() => setDeleteConfirm(category)}>
                                        <Delete fontSize='small' />
                                    </IconButton>
                                </Tooltip>
                            </div>)}
                        </div> : <p className='text-center text-red-500 py-6 text-sm'>No Category Found</p>)}
                    </div>
                </div>
                <div className='w-1/2'>
                    <AddCategory categories={categories} refetch={refetch} />
                </div>
            </div>

            {/* update modal */}
            <Modal open={Boolean(editCategory)} onClose={() => setEditCategory(null)} className='grid place-items-center'>
                <div className='md:w-[500px] w-11/12 rounded-md bg-white shadow-xl outline-none'>
                    <AddCategory categories={categories} refetch={refetch} category={editCategory} close={() => setEditCategory(null)} />
                </div>
            </Modal>

            {/* delete modal */}
            <Modal open={Boolean(deleteConfirm)} onClose={() => setDeleteConfirm(null)} className='grid place-items-center'>
                <div className='sm:w-[350px] w-11/12 rounded-md bg-white shadow-xl outline-none p-5'>
                    <h1 className='text-xl text-center font-medium'>Are you want to sure delete this category</h1>
                    <h1 className='text-center mt-3 text-2xl text-[#868686]'>"{deleteConfirm?.name}"</h1>
                    <div className='mt-4 flex justify-between gap-x-3'>
                        <Button
                            variant='outlined'
                            color='warning'
                            className='flex-1'
                            onClick={() => setDeleteConfirm(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='error'
                            className='flex-1'
                            onClick={deleteCategory}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>

        </div >
    );
}

export default Categories;
