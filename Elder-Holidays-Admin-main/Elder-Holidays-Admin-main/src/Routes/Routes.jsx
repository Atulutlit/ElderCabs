// Modules
import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginLayout from "../Layouts/LoginLayout/LoginLayout";
import PanelLayout from "../Layouts/PanelLayout/PanelLayout";
import auth from "../Api/auth";
import instance from "../Api/config/axios";

// Pages
import Home from "../Pages/Home/Home";

import BlogsList from "../Pages/Blogs/List/Blogs";
import ReviewsList from "../Pages/Reviews/List/Reviews";
import PackagesList from "../Pages/Packages/List/Packages";

import ReviewsDetail from "../Pages/Reviews/Detail/Reviews";
import PackagesDetail from "../Pages/Packages/Detail/Packages";
import BlogsDetail from "../Pages/Blogs/Detail/Blogs";

import Settings from "../Pages/Settings/Settings";
import NotFound from "../Pages/NotFound/NotFound";

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Set LoggedIn Only If Token is Valid
    const token = localStorage.getItem("token");
    if (token)
      auth.validate().then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
          instance.defaults.headers.common["Authorization"] = token;
        }
      });
  }, [loggedIn]);

  const router = loggedIn
    ? createBrowserRouter([
        // When User Logged In
        {
          path: "/",
          element: <PanelLayout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/blogs",
              element: <BlogsList />,
            },
            {
              path: "/blogs/:id",
              element: <BlogsDetail />,
            },
            {
              path: "/reviews",
              element: <ReviewsList />,
            },
            {
              path: "/reviews/:id",
              element: <ReviewsDetail />,
            },
            {
              path: "/packages",
              element: <PackagesList />,
            },
            {
              path: "/packages/:id",
              element: <PackagesDetail />,
            },
            {
              path: "/settings",
              element: <Settings />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ])
    : createBrowserRouter([
        // When User Not Logged In
        {
          path: "/",
          element: <LoginLayout />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ]);

  return <RouterProvider router={router} />;
};

export default Routes;
