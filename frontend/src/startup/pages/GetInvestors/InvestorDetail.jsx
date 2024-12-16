// src/components/InvestorDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaEnvelope, FaIndustry, FaGlobeAmericas, FaChartLine, FaMoneyCheckAlt } from 'react-icons/fa';
import Layout from '@/startup/Layout/Layout';
import { toast, ToastContainer } from "react-toastify";

const InvestorDetail = () => {
  const { id } = useParams();
  const [investor, setInvestor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    email: '',
    fundingRequired: '',
    pitchDeckLink: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Show fake loading
      toast.info("Submitting your pitch...", { autoClose: 2000 });
  
      // Simulate delay for loading
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      // Placeholder: Keeping the API call for the future
      // const response = await fetch(`https://innoventure-api.vercel.app/pitches`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, investorId: id }),
      // });
  
      // Fake success response
      const success = true;
  
      if (success) {
        // Display success message and toast
        toast.success("Pitch submitted successfully!");
        setIsModalOpen(false);
  
        // Reset form
        setFormData({
          startupName: '',
          founderName: '',
          email: '',
          fundingRequired: '',
          pitchDeckLink: '',
          description: '',
        });
      } else {
        throw new Error("Failed to submit pitch");
      }
    } catch (error) {
      console.error("Error submitting pitch:", error);
      toast.error("An error occurred while submitting your pitch.");
    }
  };
  

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const response = await fetch(`https://innoventure-api.vercel.app/investors/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch investor details');
        }
        const data = await response.json();
        setInvestor(data);
      } catch (error) {
        console.error('Error fetching investor:', error);
      }
    };

    fetchInvestor();
  }, [id]);

  if (!investor) return <p>Loading...</p>;

  const handlePitch = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
   <div className="min-h-screen flex items-center justify-center  py-12">
  <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
    {/* Header Section */}
    <div className="text-center border-b pb-6 mb-8">
      <h1 className="text-4xl font-bold text-gray-800">{investor?.name || "Investor Name"}</h1>
      {/* <p className="text-gray-500">{investor?.email || "investor@example.com"}</p> */}
    </div>

    {/* Business Plan Section */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Business Plan</h2>
      <p className="text-gray-600 text-justify bg-gray-100 font-medium p-8 shadow-md rounded-xl leading-relaxed">
        {investor?.businessPlan?.description || "No business plan description provided."}
      </p>
    </div>

    {/* Preferences & Criteria */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="p-6 bg-blue-50 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-700  flex items-center mb-4">
          <FaIndustry className="text-blue-500 mr-2" /> Preferences
        </h3>
        <ul className="text-gray-600 space-y-2">
          <li><strong>Sectors:</strong> {investor?.preferences?.sectors?.join(", ") || "Not specified"}</li>
          <li><strong>Regions:</strong> {investor?.preferences?.regions?.join(", ") || "Not specified"}</li>
          <li><strong>Risk Tolerance:</strong> {investor?.preferences?.riskTolerance || "Not specified"}</li>
        </ul>
      </div>
      <div className="p-6 bg-purple-50 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-700 flex items-center mb-4">
          <FaMoneyCheckAlt className="text-purple-500 mr-2" /> Investment Criteria
        </h3>
        <ul className="text-gray-600 space-y-2">
          <li><strong>Min Investment:</strong> ${investor?.criteria?.minInvestment || "N/A"}</li>
          <li><strong>Max Investment:</strong> ${investor?.criteria?.maxInvestment || "N/A"}</li>
          <li><strong>Investment Horizon:</strong> {investor?.criteria?.investmentHorizon || "N/A"}</li>
        </ul>
      </div>
    </div>

    {/* Investments Section */}
    <div className="bg-green-50 p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Previous Investments</h2>
      {investor?.investments?.length >1 ? (
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          {investor.investments.map((inv) => (
            <li key={inv.id}>{inv.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No investments found.</p>
      )}
    </div>

    {/* Footer Section */}
    <div className="flex justify-between items-center">
      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
        investor?.profileStatus === "active"
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}>
        Profile: {investor?.profileStatus || "Status Unknown"}
      </span>
      <button
        onClick={handlePitch}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md"
      >
        Pitch Now
      </button>
    </div>
  </div>
</div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-h-[90%] overflow-auto max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Pitch Investor</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="startupName">
                  Startup Name
                </label>
                <input
                  id="startupName"
                  name="startupName"
                  value={formData.startupName}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="founderName">
                  Founder Name
                </label>
                <input
                  id="founderName"
                  name="founderName"
                  value={formData.founderName}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Planned Use of Funds (e.g., product development, marketing, hiring)

                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="fundingRequired">
                  Funding Required (USD)
                </label>
                <input
                  id="fundingRequired"
                  name="fundingRequired"
                  value={formData.fundingRequired}
                  onChange={handleChange}
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="pitchDeckLink">
                  Equity Offered
                </label>
                <input
                  id="pitchDeckLink"
                  name="pitchDeckLink"
                  value={formData.pitchDeckLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-300 rounded-lg"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Submit Pitch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer/>
    </Layout>
  );
};

export default InvestorDetail;
