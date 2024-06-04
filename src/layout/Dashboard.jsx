import { FaEnvelope } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4 space-y-4">
                    <li>
                        <NavLink className="flex gap-1 items-center" to='/dashboard/adminHome'>
                            <IoIosHome />Admin Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/addPet'>
                            <IoAddCircle />Add Pet
                        </NavLink>
                    </li>
                    <hr className="text-green-400"/>
                    <li>
                        <NavLink to='/'>
                            <IoIosHome />Home
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to='/contact'>
                            <FaEnvelope />Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;