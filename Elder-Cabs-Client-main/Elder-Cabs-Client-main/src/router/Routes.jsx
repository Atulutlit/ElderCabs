import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import ContactUs from "../pages/ContactUs";
import AttachTaxi from "../pages/AttachTaxi";
import BlogDetails from "../pages/BlogDetails";
import Cabs from "../pages/Cabs";
import Booking from "../pages/Booking";

const Routes = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/blog',
                    element: <Blog />
                },
                {
                    path: '/blog/:blogId',
                    element: <BlogDetails />
                },
                {
                    path: '/attach-taxi',
                    element: <AttachTaxi />
                },
                {
                    path: '/cabs',
                    element: <Cabs />
                },
                {
                    path: '/cabs/booking',
                    element: <Booking />
                },
                {
                    path: '/contact-us',
                    element: <ContactUs />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default Routes;
