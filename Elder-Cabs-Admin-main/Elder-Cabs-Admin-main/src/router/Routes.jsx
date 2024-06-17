import { useContext } from 'react';
import { AdminContext } from '../contexts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginLayout from '../layouts/LoginLayout';
import PanelLayout from '../layouts/PanelLayout';
import Blogs from '../pages/Blogs';
import Home from '../pages/Home';
import AddBlog from '../components/Blogs/AddBlog';
import Categories from '../pages/Categories';
import Settings from '../pages/Settings';
import Places from '../pages/Places';
import Cabs from '../pages/Cabs';
import AddCab from '../components/Cabs/AddCab';
import AttachTaxis from '../pages/AttachTaxis';
import OneWayTrip from '../pages/OneWayTrip';
import RoundTrip from '../pages/RoundTrip';
import LocalTrip from '../pages/LocalTrip';
import TransferTrip from '../pages/TransferTrip';

const Routes = () => {

    // context 
    const { admin, loading } = useContext(AdminContext);

    const router = admin ? createBrowserRouter([
        {
            path: '/',
            element: <PanelLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/blogs',
                    element: <Blogs />
                },
                {
                    path: '/blogs/add-blog',
                    element: <AddBlog />
                },
                {
                    path: '/categories',
                    element: <Categories />
                },
                {
                    path: '/places',
                    element: <Places />
                },
                {
                    path: '/cabs',
                    element: <Cabs />
                },
                {
                    path: '/cabs/add-cab',
                    element: <AddCab />
                },
                {
                    path: '/attach-taxis',
                    element: <AttachTaxis />
                },
                {
                    path: '/one-way-trip',
                    element: <OneWayTrip />
                },
                {
                    path: '/round-trip',
                    element: <RoundTrip />
                },
                {
                    path: '/local-trip',
                    element: <LocalTrip />
                },
                {
                    path: '/transfer-trip',
                    element: <TransferTrip />
                },
                {
                    path: '/settings',
                    element: <Settings />
                },
            ],
        },
        {
            path: '*',
            element: <h2>Not Found</h2>
        }
    ]) :
        createBrowserRouter([
            {
                path: '*',
                element: <LoginLayout />
            }
        ]);

    return (
        loading ? <></> : <RouterProvider router={router} ></RouterProvider>
    );
}

export default Routes;
