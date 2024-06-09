import React, { useState, useEffect } from 'react';
import { FaDollarSign, FaEnvelope, FaHandsHelping, FaUsers } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { MdCampaign, MdOutlinePets } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer/Footer";
import { DarkThemeToggle } from "flowbite-react";
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState('');

    // useEffect(() => {
    //     if (user && user.role) {
    //         setUserRole(user.role);
    //     }
    // }, [user]);

    // console.log('user role', userRole);
    //const [isAdmin] = useAdmin();
    const isAdmin = false;

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleCloseSidebar = () => {
        if (isSidebarOpen) {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            <button
                onClick={handleSidebarToggle}
                aria-controls="separator-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
            </button>
            <aside
                id="separator-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0`}
                aria-label="Sidebar"
                onClick={handleCloseSidebar}
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-orange-300 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium ml-4">
                        <li>
                            <NavLink className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" to="#">
                                <span className="ms-3">Dashboard</span>
                            </NavLink>
                        </li>
                        {
                            isAdmin ?
                                <>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/adminHome">
                                            <IoIosHome />Admin Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/users">
                                            <FaUsers></FaUsers>All Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/allPet">
                                            <MdOutlinePets />All Pets
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/allDonation">
                                            <FaDollarSign />All Donations
                                        </NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/userHome">
                                            <IoIosHome />User Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/addPet">
                                            <IoAddCircle />Add a Pet
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/myAddedPet">
                                            <MdOutlinePets />My Added Pet
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/adoption-requests">
                                            <VscGitPullRequestGoToChanges />Adoption Request
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/createDonationCampaign">
                                            <MdCampaign />Create Donation Campaign
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/myDonationCampaign">
                                            <FaDollarSign />My Donation Campaign
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/myDonation">
                                            <FaDollarSign />My Donation
                                        </NavLink>
                                    </li>
                                </>
                        }
                    </ul>
                    <ul className="pt-4 mt-4 ml-3 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <NavLink className="flex gap-1 items-center" to="/">
                                <IoIosHome />Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="flex gap-1 items-center" to="/contact">
                                <FaEnvelope />Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="flex gap-1 items-center" to="/help">
                                <FaHandsHelping />Help
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:ml-64">
                <div className="flex gap-1 items-center justify-center text-teal-500">
                    <p>Toggle theme</p>
                    <DarkThemeToggle className="text-3xl"></DarkThemeToggle>
                </div>
                <Outlet />
                <div className="mt-6 md:mt-12">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
