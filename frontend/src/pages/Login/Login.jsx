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
    <div className="min-h-screen h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900 flex justify-center items-center px-4">
  <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500">
    <div className="w-full lg:w-1/2 p-8 sm:p-12">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-700">Login to Innoventures</h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center space-x-4 border-b border-gray-200 pb-4 mb-6">
            {["investor", "admin", "startup"].map((role) => (
              <button
                key={role}
                className={`capitalize px-4 py-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === role
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-500"
                }`}
                onClick={() => handleTabClick(role)}
              >
                {role}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              className="w-full px-5 py-3 rounded-lg border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              className="w-full px-5 py-3 rounded-lg border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
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
              className="text-sm text-blue-500 hover:underline focus:outline-none"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m0 14v1m8-8h1M4 12H3m16.364 4.364l-.707.707m-11.314 0l-.707-.707m16.364-11.314l-.707-.707M4.636 4.636l-.707-.707"
                  />
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Not a member?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>{" "}
            now!
          </p>
        </>
      )}
    </div>

    <div className="hidden lg:block lg:w-1/2">
      <img
        src="https://www.shutterstock.com/image-photo/blockchain-technology-concept-revolutionizing-industries-600nw-2481711293.jpg"
        alt="Login Visual"
        className="object-cover w-full h-full"
      />
    </div>

    <ToastContainer />
  </div>
</div>

  );
}

export default Login;