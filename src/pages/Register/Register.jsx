import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { createUser, updateUserProfile, logOut } = useAuth();

    const onSubmit = (data) => {
        //console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoUrl)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    logOut();
                                    navigate('/');
                                }
                            })
                    })
            })
    }
    return (
        <div>
            <Helmet>
                <title>PetConnect || Register</title>
            </Helmet>
            <h1 className="text-4xl text-orange-500 font-bold text-center my-10">Register Now!!!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        name="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required=""
                    />
                    {errors.email && <span className="text-red-600">This field is required</span>}
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/
                        })}
                        name="password"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <span className="absolute top-[10px] right-3 cursor-pointer" onClick={() =>
                        setShowPassword(!showPassword)}>
                        {
                            showPassword ? <FaRegEye /> : <FaEyeSlash />
                        }
                    </span>
                    {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                    {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less than 20 characters</span>}
                    {errors.password?.type === 'pattern' &&
                        <span className="text-red-600">Password must have one Uppercase, one lowercase, one special and one digit</span>}
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        name="name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required=""
                    />
                    {errors.name && <span className="text-red-600">This field is required</span>}
                    <label
                        htmlFor="floating_repeat_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Your Full Name
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        {...register("photoUrl", { required: true })}
                        name="photoUrl"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required=""
                    />
                    {errors.photoUrl && <span className="text-red-600">This field is required</span>}
                    <label
                        htmlFor="floating_repeat_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Your Photo URL
                    </label>
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
            <p className="mt-5 text-center">Already have an account?
                <Link to='/login' className="text-blue-500 underline italic"> Login now</Link></p>
        </div>
    );
};

export default Register;