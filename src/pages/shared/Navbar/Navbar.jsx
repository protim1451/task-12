import { DarkThemeToggle } from "flowbite-react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import './Navbar.css';


const Navbar = () => {

    const { user, logOut } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged out successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.error(error));
    }

    const links = <>
        <li>
            <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to='donationCampaign'>Donation Campaigns</Link>
        </li>
        <li>
            <Link to='petListing'>Pet Listing</Link>
        </li>
        {/* {
            user && <span>{user.displayName}</span>
        } */}
        {
            !user && <li>
                <Link to='register'>Register</Link>
            </li>
        }
        {
            user && <li>
                <Link to='dashboard'>Dashboard</Link>
            </li>
        }
    </>
    return (
        <div>
            <>
                <nav className="bg-white border-gray-200 dark:bg-gray-900">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                        <a
                            href="#"
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                        >
                            <img
                                src="https://i.ibb.co/LNg3wGM/logo.jpg"
                                className="h-8"
                                alt="Flowbite Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                PetConnect
                            </span>
                        </a>
                        <div className="flex items-center space-x-6 rtl:space-x-reverse">
                            {/* {
                                user ?
                                    <> 
                                        <button onClick={handleLogOut}
                                            type="button"
                                            className="text-white bg-gradient-to-r from-blue-500
                                via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                                 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
                                     text-sm px-5 py-2.5 text-center me-2 mb-2"
                                        >
                                            Logout
                                        </button>
                                    </>
                                    : <>
                                        <Link to='login'>
                                            <button
                                                type="button"
                                                className="text-white bg-gradient-to-r from-blue-500
                                        via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                                         focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
                                             text-sm px-5 py-2.5 text-center me-2 mb-2"
                                            >
                                                login
                                            </button>
                                        </Link>
                                    </>
                            } */}
                            <div className="navbar-end relative flex items-center">
                                {currentUser ? (
                                    <div className="profile-wrapper">
                                        <img className="rounded-full w-10 h-10 cursor-pointer" src={currentUser.photoURL} alt={currentUser.displayName} />
                                        <div className="profile-tooltip">
                                            <p>{currentUser.displayName}</p>
                                            <img className="rounded-full w-20 h-20" src={currentUser.photoURL} alt={currentUser.displayName} />
                                        </div>
                                    </div>
                                ) : null}
                                {user ? (
                                    <button onClick={logOut} type="button"
                                        className="text-white bg-gradient-to-r from-blue-500
                                via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                                 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
                                     text-sm px-5 py-2.5 text-center me-2 mb-2">
                                        Logout</button>
                                ) : (
                                    <Link to='/login'
                                        type="button"
                                        className="text-white bg-gradient-to-r from-blue-500
                                        via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                                         focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
                                             text-sm px-5 py-2.5 text-center me-2 mb-2">
                                        Login</Link>
                                )}

                            </div>
                            <DarkThemeToggle className="text-3xl" />
                        </div>
                    </div>
                </nav>
                <nav className="bg-gray-50 dark:bg-gray-700">
                    <div className="max-w-screen-xl px-4 py-3 mx-auto">
                        <div className="flex items-center justify-center">
                            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                                {links}
                            </ul>
                        </div>
                    </div>
                </nav>
            </>

        </div>
    );
};

export default Navbar;