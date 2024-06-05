import { FaDollarSign, FaEnvelope, FaHandsHelping } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { MdCampaign, MdOutlinePets } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {

    return (
        <>
            <button
                data-drawer-target="separator-sidebar"
                data-drawer-toggle="separator-sidebar"
                aria-controls="separator-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
            </button>
            <aside
                id="separator-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-orange-300 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium ml-4">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <NavLink className='flex gap-1 items-center' to='/dashboard/userHome'>
                                <IoIosHome />User Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex gap-1 items-center' to='/dashboard/addPet'>
                                <IoAddCircle />Add a Pet
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex gap-1 items-center' to='/dashboard/myAddedPet'>
                                <MdOutlinePets />My Added Pet
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex gap-1 items-center' to='/dashboard/adoptionRequest'>
                                <VscGitPullRequestGoToChanges />Adoption Request
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex gap-1 items-center' to='/dashboard/createDonationCampaign'>
                                <MdCampaign />Create Donation Campaign
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex gap-1 items-center' to='/dashboard/myDonationCampaign'>
                                <FaDollarSign />My Donation Campaign
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex gap-1 items-center' to='/dashboard/myDonation'>
                                <FaDollarSign />My Donation
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="pt-4 mt-4 ml-3 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <NavLink className='flex gap-1 items-center' to='/'>
                                <IoIosHome />Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex gap-1 items-center' to='/contact'>
                                <FaEnvelope />Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex gap-1 items-center' to='/help'>
                                <FaHandsHelping />Help
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:ml-64">
                <Outlet></Outlet>
            </div>
        </>

    );
};

export default Dashboard;