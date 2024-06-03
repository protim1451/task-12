import { DarkThemeToggle } from "flowbite-react";
import { Link } from "react-router-dom";


const Navbar = () => {

    const links = <>
        <li>
           <Link>Home</Link>
        </li>
        <li>
           <Link>Donation Campaigns</Link>
        </li>
        <li>
           <Link to='petListing'>Pet Listing</Link>
        </li>
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
                            <a
                                href="#"
                                className="text-sm  text-gray-500 dark:text-white hover:underline"
                            >
                                (555) 412-1234
                            </a>
                            <Link
                                className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Login
                            </Link>
                            <DarkThemeToggle className="text-3xl"/>
                        </div>
                    </div>
                </nav>
                <nav className="bg-gray-50 dark:bg-gray-700">
                    <div className="max-w-screen-xl px-4 py-3 mx-auto">
                        <div className="flex items-center justify-center">
                            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                                { links }
                            </ul>
                        </div>
                    </div>
                </nav>
            </>

        </div>
    );
};

export default Navbar;