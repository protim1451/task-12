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
import PetDetails from "../pages/PetDetails.jsx/PetDetails";
import MyAddedPets from "../pages/Dashboard/MyAddedPets/MyAddedPets";
import UpdatePet from "../pages/Dashboard/UpdatePet/UpdatePet";
import CreateDonationCampaign from "../pages/Dashboard/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaigns from "../pages/Dashboard/MyDonationCampaigns/MyDonationCampaigns";
import EditDonation from "../pages/Dashboard/EditDonation/EditDonation";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";

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
        {
          path: "pet/:id",
          element: <PrivateRoute>
            <PetDetails></PetDetails>
          </PrivateRoute>,
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
        {
          path: 'update-pet/:id',
          element: <PrivateRoute>
            <UpdatePet></UpdatePet>
          </PrivateRoute>,
        },
        {
          path: 'myAddedPet',
          element: <PrivateRoute>
            <MyAddedPets></MyAddedPets>
          </PrivateRoute>,
        },
        {
          path: 'createDonationCampaign',
          element: <PrivateRoute>
            <CreateDonationCampaign></CreateDonationCampaign>
          </PrivateRoute>,
        },
        {
          path: 'myDonationCampaign',
          element: <PrivateRoute>
            <MyDonationCampaigns></MyDonationCampaigns>
          </PrivateRoute>,
        },
        {
          path: 'edit-donation/:id',
          element: <EditDonation></EditDonation>,
        },
        //Admin routes
        {
          path: 'users',
          element: <AllUsers></AllUsers>,
        },
      ]
    }
  ]);