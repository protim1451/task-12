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
import MyAdoptionRequests from "../pages/Dashboard/MyAdoptionRequests/MyAdoptionRequests";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AllPets from "../pages/Dashboard/AllPets/AllPets";
import AllDonationCampaigns from "../pages/Dashboard/AllDonationCampaigns/AllDonationCampaigns";
import DonationDetails from "../pages/Dashboard/DonationDetails/DonationDetails";
import NotFound from "../pages/NotFound/NotFound";
import MyDonation from "../pages/Dashboard/MyDonation/MyDonation";
import AllDonations from "../pages/Dashboard/AllDonations/AllDonations";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <NotFound></NotFound>,
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
          path: 'donationCampaign/:id',
          element: <DonationDetails></DonationDetails>,
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
      element: <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>,
      children: [
        {
          path: 'addPet',
          element: <AddPet></AddPet>,
        },
        {
          path: 'update-pet/:id',
          element: <UpdatePet></UpdatePet>,
        },
        {
          path: 'myAddedPet',
          element: <MyAddedPets></MyAddedPets>,
        },
        {
          path: 'createDonationCampaign',
          element:  <CreateDonationCampaign></CreateDonationCampaign>,
        },
        {
          path: 'myDonationCampaign',
          element: <MyDonationCampaigns></MyDonationCampaigns>,
        },
        {
          path: 'edit-donation/:id',
          element: <EditDonation></EditDonation>,
        },
        {
          path: 'adoption-requests',
          element: <MyAdoptionRequests></MyAdoptionRequests>,
        },
        {
          path: 'userHome',
          element:  <UserHome></UserHome>,
        },
        {
          path: 'myDonation',
          element: <MyDonation></MyDonation>,
        },
        
        //Admin routes
        {
          path: 'users',
          element: <AllUsers></AllUsers>,
        },
        {
          path: 'adminHome',
          element: <AdminHome></AdminHome>,
        },
        {
          path: 'allPet',
          element: <AllPets></AllPets>,
        },
        {
          path: 'allDonation',
          element: <AllDonationCampaigns></AllDonationCampaigns>,
        },
        {
          path: 'donations',
          element: <AllDonations></AllDonations>,
        },
      ]
    }
  ]);