import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Layout from "./Layout";

const ProjectDetails = () => {
  const { id } = useParams();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetchProposal = async () => {
      const userId = localStorage.getItem("user");
      console.log("User ID:", userId);
  
      if (!userId) {
        console.warn("No user ID found in localStorage");
        setLoading(false);
        return;
      }
  
      try {
        const res = await fetch(`http://localhost:3000/proposals/investor/${userId}`);
        console.log("API status:", res.status);
        const data = await res.json();
        console.log("Fetched proposals:", data);
  
        const proposalById = data.find(p => p._id === id);
        setProposal(proposalById);
      } catch (err) {
        console.error("Error fetching proposal:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProposal();
  },[userId]);
  

  // if (loading) {
  //   return (
  //     <Layout>
  //       <div className="flex justify-center items-center h-screen bg-gray-900">
  //         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-400"></div>
  //       </div>
  //     </Layout>
  //   );
  // }

  // if (!proposal) {
  //   return (
  //     <Layout>
  //       <div className="flex justify-center items-center h-screen text-white bg-gray-900">
  //         <p>Proposal not found.</p>
  //       </div>
  //     </Layout>
  //   );
  // }

  return (
    // <Layout>
      <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h1 className="text-3xl font-bold mb-4 text-indigo-300">{proposal?.title}</h1>
          <p className="text-gray-400 mb-4">{proposal?.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p><strong className="text-gray-200">Startup Name:</strong> {proposal.startupId.name}</p>
              <p><strong className="text-gray-200">Email:</strong> {proposal.startupId.email}</p>
              <p><strong className="text-gray-200">Industry:</strong> {proposal.startupId.businessPlan?.industry}</p>
            </div>
            <div>
              <p><strong className="text-gray-200">Investor:</strong> {proposal.investorId.name}</p>
              <p><strong className="text-gray-200">Investor Email:</strong> {proposal.investorId.email}</p>
              <p><strong className="text-gray-200">Funding Required:</strong> ${proposal.fundingRequired.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-6 text-gray-300">
            <p><strong className="text-gray-200">Message:</strong> {proposal.message}</p>
            <p><strong className="text-gray-200">Status:</strong> {proposal.status}</p>
            <p><strong className="text-gray-200">Sent By:</strong> {proposal.sentBy}</p>
          </div>
        </div>
      </div>
    // </Layout>
  );
};

export default ProjectDetails;
