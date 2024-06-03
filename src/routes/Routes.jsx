import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import PetListing from "../pages/PetListing/PetListing";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
          path: 'petListing',
          element: <PetListing></PetListing>,
        },
      ],
    },
  ]);