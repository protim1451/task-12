import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import SocialLogin from "../shared/SocialLogin/SocialLogin";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()

    const { signIn } = useAuth();

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged in successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                //navigate(from, {replace: true});
                navigate('/');
            })
    }

    return (
        <div>
            <Helmet>
                <title>PetConnect || Login</title>
            </Helmet>
            <h1 className="text-4xl text-orange-500 font-bold text-center my-10">Login Now!!!</h1>
            <form onSubmit={handleLogin} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your Email"
                        required=""
                    />
                </div>
                <div className="mb-5 relative">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                    <span className="absolute top-[40px] right-3 cursor-pointer" onClick={() =>
                        setShowPassword(!showPassword)}>
                        {
                            showPassword ? <FaRegEye /> : <FaEyeSlash />
                        }
                    </span>
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
            <SocialLogin></SocialLogin>
            <p className="text-center mt-5">Don't have an account?
                <Link to='/register' className="text-blue-500 underline italic"> Register now!</Link></p>
        </div>
    );
};

export default Login;