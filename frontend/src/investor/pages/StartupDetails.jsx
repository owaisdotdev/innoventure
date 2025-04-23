import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { MdClose } from "react-icons/md";

const StartupDetails = () => {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    investmentAmount: "",
    equity: "",
    attachment: "",
    message: "",
    sentBy:"investor",
    terms:true
  });

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/investor/${id}`,
          {
            headers: { accept: "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setStartup(data);

          setFormData({
            name: data.name || "",
            industry: data.businessPlan?.industry || "",
            investmentAmount: "",
            equity: "",
            attachment: "",
            message: "",
            sentBy:"investor"
          });
        } else {
          console.error("Failed to fetch startup details");
        }
      } catch (error) {
        console.error("Error fetching startup details:", error);
      }
    };

    fetchStartupDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFormSubmit =async (e) => {
    e.preventDefault();
    console.log("Proposal Submitted:", formData);
      // Include startupId in the formData
      const investor = localStorage.getItem("userId");
      const token= localStorage.getItem("token");
console.log(token)
  const payload = {
    ...formData,
    startupId: id,
    investorId:investor,title:"aasdad"// assuming `id` from useParams is the startup's ID
  };
    const response = await fetch('http://localhost:3000/proposals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to submit proposal');
    }

    const result = await response.json();
    console.log("Proposal Submitted:", result);

    setIsDialogOpen(false);
  };
  const closeModal = () => {
    setIsDialogOpen(false);
  };
  
  if (!startup) {
    return (
      // <Layout>
        <div className="px-6 py-4 flex items-center justify-center">
          <h1 className="text-2xl text-gray-800 font-bold">Loading...</h1>
        </div>
      // </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8 bg-white shadow-md rounded-lg">
        {/* Header Section */}
        <div className="flex items-center space-x-4">
          <div className="flex-none bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-700 font-bold text-2xl">
            {startup.name?.charAt(0) || "-"}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              {startup.name}
            </h1>
            <p className="text-sm text-gray-500">
              {startup.fydpDetails?.university || startup.location || "Unknown Location"} • {startup.fydpDetails?.year || "Unknown Year"}
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Business Plan</h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            {startup.businessPlan?.description || "No description available"}
          </p>
        </div>

        {/* Additional Details */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Industry</h3>
            <p className="text-gray-700 mt-1">
              {startup.businessPlan?.industry || "Not specified"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {startup.fydpDetails?.tags?.length > 0 ? (
                startup.fydpDetails.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-gray-700">No tags available</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8">
          <button
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full shadow-lg text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            onClick={() => setIsDialogOpen(true)}
          >
            Send Your Proposal
          </button>
        </div>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <div className=" flex justify-end items-end">
            <button
  onClick={closeModal}
  className=" text-red-500 hover:text-red-700 hover:bg-gray-100"
>
  <MdClose className="text-3xl" />
</button>
            </div>
  

            <h2 className="text-2xl font-bold text-gray-800 my-4">
              Send Your Proposal
            </h2>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-4">
              <div className="mb-2 ">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold"
                >
                  Startup Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  readOnly
                  className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="industry"
                  className="block text-gray-700 font-semibold"
                >
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  readOnly
                  className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
                />
              </div>
              <div className="mb-2">
  <label
    htmlFor="investmentAmount"
    className="block text-gray-700 font-semibold"
  >
    Investment Amount (in USD)
  </label>
  <input
    type="number"
    id="investmentAmount"
    name="investmentAmount"
    value={formData.investmentAmount}
    onChange={handleInputChange}
    required
    className="w-full mt-2 px-4 py-2 border rounded-lg"
  />
</div>

<div className="mb-2">
  <label htmlFor="equity" className="block text-gray-700 font-semibold">
    Equity Interest (in %)
  </label>
  <input
    type="number"
    id="equity"
    name="equity"
    value={formData.equity}
    onChange={handleInputChange}
    required
    className="w-full mt-2 px-4 py-2 border rounded-lg"
  />
</div>

<div className="mb-2">
  <label
    htmlFor="attachment"
    className="block text-gray-700 font-semibold"
  >
    Attachments (URL or description)
  </label>
  <input
    type="text"
    id="attachment"
    name="attachment"
    value={formData.attachment}
    onChange={handleInputChange}
    className="w-full mt-2 px-4 py-2 border rounded-lg"
    placeholder="Link to a document or file"
  />
</div>


<div className="mb-2">
  <label
    htmlFor="message"
    className="block text-gray-700 font-semibold"
  >
    Message
  </label>
  <textarea
    id="message"
    name="message"
    value={formData.message}
    onChange={handleInputChange}
    required
    className="w-full mt-2 px-4 py-2 border rounded-lg"
    placeholder="Brief introduction or context for this proposal"
  />
</div>

<div className="mb-2 col-span-2">
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      name="terms"
      checked={formData.terms}
      onChange={handleInputChange}
      required
      className="form-checkbox h-5 w-5 text-blue-600"
    />
    <span className="ml-2 text-gray-700 text-sm">
      I agree to the terms and conditions.
    </span>
  </label>
</div>
              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StartupDetails;
