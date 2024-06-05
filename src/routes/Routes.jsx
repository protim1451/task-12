import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import PetListing from "../pages/PetListing/PetListing";
import DonationCampaign from "../pages/DonationCampaign/DonationCampaign";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddPet from "../pages/Dashboard/AddPet/AddPet";

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
        {
          path: 'donationCampaign',
          element: <DonationCampaign></DonationCampaign>,
        },
        {
          path: 'login',
          element: <Login></Login>,
        },
        {
          path: 'register',
          element: <Register></Register>,
        },
      ],
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'addPet',
          element: <PrivateRoute>
            <AddPet></AddPet>
          </PrivateRoute>,
        },
      ]
    }
  ]);