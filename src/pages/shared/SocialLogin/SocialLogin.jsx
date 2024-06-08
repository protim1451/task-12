import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";



const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                //console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }
    return (
        <div>
            <div className="flex items-center justify-center px-8 mb-8">
                <p className="text-green-500 mr-5">Sign in with </p>
                <button
                    onClick={handleGoogleSignIn}
                    className="px-4 py-2 text-secondary border border-secondary rounded-lg bg-teal-400 hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center space-x-2"
                >
                    <FaGoogle />
                    <span>Google</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;