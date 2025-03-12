import { useEffect, useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginInvestor, loginStartup, loginAdmin } from "@/api/api.js"; // Adjust path
import { useDispatch } from "react-redux";
import { login as reduxLogin } from "@/redux/slices/authSlice"; // Adjust path
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext"; // Adjust path
import * as jose from "jose";
import { Link } from "react-router-dom";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>
  );
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("investor");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Innoventures | Log in";
  }, []);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(`Attempting login as ${activeTab} with:`, formData);

      let res;
      if (activeTab === "investor") res = await loginInvestor(formData);
      else if (activeTab === "startup") res = await loginStartup(formData);
      else if (activeTab === "admin") res = await loginAdmin(formData);

      console.log("API Response:", res);

      const token = res.access_token || res.token;
      if (!token) throw new Error("No access token found in response");

      const decodedUser = jose.decodeJwt(token);
      console.log("Decoded Token:", decodedUser);

      const userId =
        res.userId ||
        res.id ||
        res._id ||
        (activeTab === "investor" && res.investor?._doc?._id) ||
        (activeTab === "startup" && res.startup?._doc?._id) ||
        (activeTab === "admin" && res.admin?._doc?._id) ||
        decodedUser.userId ||
        decodedUser.id ||
        decodedUser._id;

      if (!userId) throw new Error("User ID not found in response or token");

      console.log(`User ID: ${userId}`);

      localStorage.setItem("token", token);
      localStorage.setItem("user", userId);
      localStorage.setItem("userId", userId); // Added for consistency

      login({ ...decodedUser, userId, email: formData.email, role: activeTab }, token);
      dispatch(reduxLogin(token));

      navigate(`/${activeTab}/dashboard/${userId}`);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex justify-center items-center pt-2">
            <h1 className="text-2xl pb-4 font-bold">Login To Innoventures</h1>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="mt-3 flex flex-col items-center">
              <div className="w-full mb-5">
                <div className="flex justify-center space-x-4 border-b">
                  {["investor", "admin", "startup"].map((role) => (
                    <button
                      key={role}
                      className={`py-2 px-4 font-medium ${
                        activeTab === role ? "border-b-2 border-blue-500 text-blue-500" : ""
                      }`}
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
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
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
                        <svg
                          className="w-6 h-6 animate-spin"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v1m0 14v1m8-8h1M4 12H3m16.364 4.364l-.707.707m-11.314 0l-.707-.707m16.364-11.314l-.707-.707M4.636 4.636l-.707-.707"
                          />
                        </svg>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>
                </form>
                <p className="mt-6 text-sm text-gray-600 text-center">
                  Not a member?{" "}
                  <Link className="text-blue-500" to="/signup">
                    Sign up
                  </Link>{" "}
                  now!
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="hidden lg:flex flex-1">
          <img
            src="https://www.shutterstock.com/image-photo/blockchain-technology-concept-revolutionizing-industries-600nw-2481711293.jpg"
            alt="Background"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;