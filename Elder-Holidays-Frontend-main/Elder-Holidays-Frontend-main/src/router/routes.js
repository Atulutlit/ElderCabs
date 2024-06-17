import { createBrowserRouter } from "react-router-dom";
import { About } from "../components/About/About";
import Home from "../components/Home/Home";
import { MainAttr } from "../components/MainAttraction/MainAttr";
import Blogs from "../components/Blogs/Blogs";
import { Packages } from "../components/Packages/Packages";
import { AllPackages } from "../components/AllPackages/AllPackages";
import { Hotels } from "../components/Hotels/Hotels";
import { Bookings } from "../components/Bookings/Bookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/aboutus",
    element: <About />,
  },
  {
    path: "/mainAttraction",
    element: <MainAttr />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/theme",
    element: <Packages />,
  },
  {
    path: "/all-packages",
    element: <AllPackages />,
  },
  {
    path: "/hotels",
    element: <Hotels />,
  },
  {
    path: "/bookings/:id",
    element: <Bookings />,
  },
]);

export default router;
