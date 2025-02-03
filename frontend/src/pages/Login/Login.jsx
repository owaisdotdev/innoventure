import { useEffect, useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginInvestor, loginStartup, loginAdmin } from "@/api/api.js";
import { useDispatch } from "react-redux";
import { login as reduxLogin } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import * as jose from 'jose';
import { Link } from "react-router-dom";

function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
        </div>
    );
}

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('investor');
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Innoventures | Log in";
    }, []);

    const handleTabClick = (tab) => setActiveTab(tab);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            let res;
            if (activeTab === 'investor') res = await loginInvestor(formData);
            else if (activeTab === 'startup') res = await loginStartup(formData);
            else if (activeTab === 'admin') res = await loginAdmin(formData);

            console.log("API Response:", res);

            const decodedUser = jose.decodeJwt(res.access_token);
            localStorage.setItem("token", res.access_token);

            let userId;
            if (activeTab === 'investor' && res.investor?._doc?._id) userId = res.investor._doc._id;
            else if (activeTab === 'startup' && res.startup?._doc?._id) userId = res.startup._doc._id;
            else if (activeTab === 'admin' && res.admin?._doc?._id) userId = res.admin._doc._id;
            else throw new Error("User data not found in response");

            console.log(`User ID: ${userId}`);

            localStorage.setItem("user", userId);
            login({ ...decodedUser, userId }, res.access_token);
            dispatch(reduxLogin(res.access_token));

            navigate(`/${activeTab}/dashboard/${userId}`);
            toast.success("Logged in Successfully!");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex justify-center items-center pt-2">
                        <h1 className="text-2xl pb-4 font-bold">Login To Innoventures</h1>
                    </div>

                    {isLoading ? <Loader /> : (
                        <div className="mt-3 flex flex-col items-center">
                            <div className="w-full mb-5">
                                <div className="flex justify-center space-x-4 border-b">
                                    {["investor", "admin", "startup"].map((role) => (
                                        <button
                                            key={role}
                                            className={`py-2 px-4 font-medium ${activeTab === role ? "border-b-2 border-blue-500" : ""}`}
                                            onClick={() => handleTabClick(role)}
                                        >
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full flex-1 mt-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="mx-auto max-w-xs">
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleShowPassword}
                                            className="text-sm text-blue-600 hover:underline mt-1"
                                        >
                                            {showPassword ? "Hide Password" : "Show Password"}
                                        </button>
                                        <button
                                            className="mt-5 tracking-wide font-semibold bg-blue-400 text-white w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m0 14v1m8-8h1M4 12H3m16.364 4.364l-.707.707m-11.314 0l-.707-.707m16.364-11.314l-.707-.707M4.636 4.636l-.707-.707" />
                                                </svg>
                                            ) : "Sign In"}
                                        </button>
                                    </div>
                                </form>
                                <p className="mt-6 text-sm text-gray-600 text-center">
                                    Not a member? <Link className="text-blue-500" to="/signup">Sign up</Link> now!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="hidden lg:flex flex-1">
                    <img src="https://www.shutterstock.com/image-photo/blockchain-technology-concept-revolutionizing-industries-600nw-2481711293.jpg" alt="Background" className="object-cover w-full h-full rounded-r-lg" />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
