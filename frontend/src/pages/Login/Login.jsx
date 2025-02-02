// import { useEffect, useState, useContext } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loginInvestor, loginStartup, loginAdmin } from "@/api/api.js"; // Import your specific login APIs
// import { useDispatch } from "react-redux";
// import { login as reduxLogin } from "@/redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "@/contexts/AuthContext";
// import * as jose from 'jose';
// import { Link } from "react-router-dom";
// function Loader() {
//     return (
//         <div className="flex justify-center items-center h-screen">
//             <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg"fill="none"  viewBox="0 0 24 24" >
//                 <circle className="opacity-25"  cx="12"  cy="12"  r="10" stroke="currentColor" strokeWidth="4" ></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" ></path>
//             </svg>
//         </div>
//     );
// }

// function Login() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { login } = useContext(AuthContext);
//     const [activeTab, setActiveTab] = useState('investor'); // Set default tab to 'investor'
//     const handleTabClick = (tab) => {
//         setActiveTab(tab); // Change active tab
//     };
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     useEffect(() => {
//         document.title = "Innoventures | Log in";
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//     const handleSubmit = async (e) => {
//         setIsLoading(true);
//         e.preventDefault();
//         try {
//             let res;
//             if (activeTab === 'investor') {
//                 res = await loginInvestor(formData);
//             } else if (activeTab === 'startup') {
//                 res = await loginStartup(formData);
//             } else if (activeTab === 'admin') {
//                 res = await loginAdmin(formData);
//             }
//             console.log("API Response:", res); // Log the entire response

//             // Check the response based on the activeTab
//             const decodedUser = jose.decodeJwt(res.access_token);
//             localStorage.setItem("token", res.access_token);

//             if (activeTab === 'investor' && res.investor && res.investor._doc) {
//                 console.log(res.investor, res.investor._doc._id);
//                 localStorage.setItem("user", res.investor._doc._id);
//                 dispatch(reduxLogin(res.access_token));
//                 navigate("/investor/dashboard");
//                 toast.success("Logged in Successfully!");
//             } else if (activeTab === 'startup' && res.startup && res.startup._doc) {
//                 console.log(res.startup, res.startup._doc._id);
//                 localStorage.setItem("user", res.startup._doc._id);
//                 dispatch(reduxLogin(res.access_token));
//                 navigate("/startup/dashboard"); // Navigate to the startup dashboard
//                 toast.success("Logged in Successfully!");
//             } else if (activeTab === 'admin' && res.admin && res.admin._doc) {
//                 console.log(res.admin, res.admin._doc._id);
//                 localStorage.setItem("user", res.admin._doc._id);
//                 dispatch(reduxLogin(res.access_token));
//                 navigate("/admin/dashboard"); // Navigate to the admin dashboard
//                 toast.success("Logged in Successfully!");
//             } else {
//                 throw new Error("User data not found in response");
//             }
//         } catch (error) {
//             console.error("Login error:", error); // Log the error for debugging
//             toast.error(error.message);
//         }
//         setIsLoading(false);
//     };

//     const toggleShowPassword = () => {
//         setShowPassword((prevShowPassword) => !prevShowPassword);
//     };
//     return (
//         <div className="min-h-screen h-screen bg-gray-100 text-gray-900 flex justify-center">
//             <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
//                 <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
//                     <div className="flex justify-center items-center pt-2">
//                         <h1 className="h1 heading text-2xl pb-4">Login To Innoventures</h1>
//                     </div>
//                     {isLoading ? (
//                         <Loader />
//                     ) : (
//                         <div className="mt-3 flex flex-col items-center">
//                             <div className="w-full mb-5">
//                                 <div className="flex justify-center space-x-4 border-b">
//                                     <button
//                                         className={`py-2 px-4 font-medium ${activeTab === 'investor' ? 'border-b-2 border-blue-500' : ''}`}
//                                         onClick={() => handleTabClick('investor')}
//                                     >
//                                         Investor
//                                     </button>
//                                     <button
//                                         className={`py-2 px-4 font-medium ${activeTab === 'admin' ? 'border-b-2 border-blue-500' : ''}`}
//                                         onClick={() => handleTabClick('admin')}
//                                     >
//                                         Admin
//                                     </button>
//                                     <button
//                                         className={`py-2 px-4 font-medium ${activeTab === 'startup' ? 'border-b-2 border-blue-500' : ''}`}
//                                         onClick={() => handleTabClick('startup')}
//                                     >
//                                         Startup/FYP
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="w-full flex-1 mt-3">
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="mx-auto max-w-xs">
//                                         <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                                             type="email" name="email"placeholder="Email"value={formData.email} onChange={handleChange}
//                                         />
//                                         <input
//                                             className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
//                                             type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//                                         <button type="button" onClick={toggleShowPassword} className="text-sm text-blue-600 hover:underline mt-1"
//                                         >
//                                             {showPassword ? "Hide Password" : "Show Password"}
//                                         </button>
//                                         <button className="mt-5 tracking-wide font-semibold bg-blue-400 text-white-500 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
//                                             type="submit" disabled={isLoading}
//                                         >
//                                             {isLoading ? (
//                                                 <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m0 14v1m8-8h1M4 12H3m16.364 4.364l-.707.707m-11.314 0l-.707-.707m16.364-11.314l-.707-.707M4.636 4.636l-.707-.707" />
//                                                 </svg>
//                                             ) : (
//                                                 <>
//                                                     <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                         <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//                                                         <circle cx="8.5" cy="7" r="4" />
//                                                         <path d="M20 8v6M23 11h-6" />
//                                                     </svg>
//                                                     <span className="ml-3">Sign In</span>
//                                                 </>
//                                             )}
//                                         </button>
//                                         <p className="mt-6 text-sm text-gray-600 text-center">
//                                             Not a member? <Link className="text-blue-500" to="/signup"> Sign up</Link>  now!
//                                         </p>
//                                         <p className="mt-6 text-xs text-gray-600 text-center">
//                                             I agree to abide by Blocklance &nbsp;
//                                             <a href="#" className="border-b border-gray-500 border-dotted">
//                                                 Terms of Service &nbsp;
//                                             </a>
//                                             and its &nbsp;
//                                             <a href="#" className="border-b border-gray-500 border-dotted">
//                                                 Privacy Policy
//                                             </a>
//                                         </p>
//                                     </div>
//                                 </form>
//                                 <div className="flex justify-center mt-4 space-x-4">
//                                     <button className="py-2 px-4 bg-blue-400 text-white rounded-lg text-xs hover:bg-blue-500"
//                                         onClick={() => setFormData({ email: 'investor@test.com', password: 'password123' })}>
//                                         Login with Test Investor
//                                     </button>
//                                     <button className="py-2 px-4 bg-green-400 text-white rounded-lg text-xs hover:bg-green-500"
//                                         onClick={() => setFormData({ email: 'startup@test.com', password: 'password123' })} >
//                                         Login with Test Startup
//                                     </button>
//                                     <button className="py-2 px-4 bg-red-400 text-white rounded-lg text-xs hover:bg-red-500"
//                                         onClick={() => setFormData({ email: 'admin@test.com', password: 'password123' })} >
//                                         Login with Test Admin
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 <div className="hidden lg:flex flex-1">
//                     <img src="https://www.shutterstock.com/image-photo/blockchain-technology-concept-revolutionizing-industries-600nw-2481711293.jpg" alt="Background" className="object-cover w-full h-full rounded-r-lg" />
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// }
// export default Login;



import { useEffect, useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginInvestor, loginStartup, loginAdmin } from "@/api/api.js"; // Import your specific login APIs
import { useDispatch } from "react-redux";
import { login as reduxLogin } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import * as jose from 'jose';
import { Link } from "react-router-dom";

function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" ></path>
            </svg>
        </div>
    );
}

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Get login function from AuthContext

    const [activeTab, setActiveTab] = useState('investor'); // Default tab: Investor
    const handleTabClick = (tab) => {
        setActiveTab(tab); // Change active tab
    };

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Innoventures | Log in";
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            let res;
            if (activeTab === 'investor') {
                res = await loginInvestor(formData);
            } else if (activeTab === 'startup') {
                res = await loginStartup(formData);
            } else if (activeTab === 'admin') {
                res = await loginAdmin(formData);
            }

            console.log("API Response:", res); // Debugging

            // Decode JWT token and store it
            const decodedUser = jose.decodeJwt(res.access_token);
            localStorage.setItem("token", res.access_token);

            let userId;
            if (activeTab === 'investor' && res.investor && res.investor._doc) {
                userId = res.investor._doc._id;
            } else if (activeTab === 'startup' && res.startup && res.startup._doc) {
                userId = res.startup._doc._id;
            } else if (activeTab === 'admin' && res.admin && res.admin._doc) {
                userId = res.admin._doc._id;
            } else {
                throw new Error("User data not found in response");
            }

            console.log(`User ID: ${userId}`); // Debugging

            // Store user ID in local storage for session management
            localStorage.setItem("user", userId);

            //  Save user session globally using AuthContext & Redux
            login({ ...decodedUser, userId }, res.access_token);
            dispatch(reduxLogin(res.access_token));

            //  Redirect based on role and pass userId in URL
            if (activeTab === 'investor') {
                navigate(`/investor/dashboard/${userId}`);
            } else if (activeTab === 'startup') {
                navigate(`/startup/dashboard/${userId}`);
            } else if (activeTab === 'admin') {
                navigate(`/admin/dashboard/${userId}`);
            }

            toast.success("Logged in Successfully!");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="min-h-screen h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex justify-center items-center pt-2">
                        <h1 className="h1 heading text-2xl pb-4">Login To Innoventures</h1>
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div className="mt-3 flex flex-col items-center">
                            <div className="w-full mb-5">
                                <div className="flex justify-center space-x-4 border-b">
                                    <button className={`py-2 px-4 font-medium ${activeTab === 'investor' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => handleTabClick('investor')}>Investor</button>
                                    <button className={`py-2 px-4 font-medium ${activeTab === 'admin' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => handleTabClick('admin')}>Admin</button>
                                    <button className={`py-2 px-4 font-medium ${activeTab === 'startup' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => handleTabClick('startup')}>Startup/FYP</button>
                                </div>
                            </div>

                            <div className="w-full flex-1 mt-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="mx-auto max-w-xs">
                                        <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                                        />
                                        <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                                        />
                                        <button type="button" onClick={toggleShowPassword} className="text-sm text-blue-600 hover:underline mt-1">
                                            {showPassword ? "Hide Password" : "Show Password"}
                                        </button>
                                        <button className="mt-5 tracking-wide font-semibold bg-blue-400 text-white-500 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            type="submit" disabled={isLoading}>
                                            Sign In
                                        </button>
                                    </div>
                                </form>
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
