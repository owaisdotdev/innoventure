import React, { useState } from 'react';
import PdfToText from 'react-pdftotext';
import axios from 'axios';
import { ethers } from 'ethers';
import { ABI } from '@/abi';

const PdfUploader = ({ startupData }) => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [milestoneMessage, setMilestoneMessage] = useState('');
  
  // Pinata credentials
  const pinataApiKey = "21780ea40c3777501825";
  const pinataSecretApiKey = "035da19b1e31d31ee41e578c48b3b4d104a1cdf76817ddd53648258c57afe731";

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
    } else {
      alert('Please upload a valid PDF file');
    }
  };
  const updateMilestoneProgress = async ( newIpfsHash,financialAnalysis,milestoneMessage) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); 

      const contract = new ethers.Contract("0x5422e2f20862cffa4aa16c33dae12152f1ce810f", ABI, signer);

      const tx = await contract.updateMilestoneProgress(0, 0, newIpfsHash,financialAnalysis,milestoneMessage, true);
      await tx.wait();  
      console.log("Milestone progress updated successfully");
    } catch (error) {
      console.error("Error updating milestone progress:", error);
    }
  };

  // Handle milestone message input change
  const handleMessageChange = (e) => {
    setMilestoneMessage(e.target.value);
  };

  // Extract text from PDF and send for analysis
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !milestoneMessage) {
      alert("Please fill in the milestone message and upload a PDF file.");
      return;
    }

    try {
      
      // Extract text from PDF
      const text = await PdfToText(file);
      setExtractedText(text);

      // Send the text to Gemini for financial analysis
      const financialAnalysis = await sendToGemini(text);

      // Upload PDF to IPFS
      const ipfsHash = await uploadFileToIPFS(file);

      // Send the form data along with the analysis and IPFS hash to your database
      // sendToDatabase({ 
      //   ...startupData, 
      //   milestoneMessage, 
      //   reportContent: text, 
      //   financialAnalysis, 
      //   ipfsHash 
      // });
      updateMilestoneProgress(ipfsHash,financialAnalysis,milestoneMessage)
    } catch (error) {
      console.error('Error processing PDF:', error);
    }
  };

  // Function to send extracted text to Gemini API
  const sendToGemini = async (reportContent) => {
    const apiKey = "AIzaSyAp-IL9hAxjotR6PzEaoXTSzKM3w47T6Us"; // Replace with your actual API key
    let financialAnalysis = "Analysis unavailable";

    try {
      console.log("Sending request to Gemini API...");
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a professional financial analyst AI.

                  Please analyze the following financial report and return the results in **STRICT JSON format** with the following structure:

                  {
                    "summary": "A concise summary of the financial situation (max 100 words)",
                    "keyMetrics": {
                      "totalRevenue": "Extracted revenue or 'N/A'",
                      "totalExpenses": "Extracted expenses or 'N/A'",
                      "netProfitOrLoss": "Calculated profit or loss or 'N/A'",
                      "profitMargin": "Profit margin as a percentage or 'N/A'"
                    },
                    "highlights": [
                      "Important finding 1",
                      "Important finding 2",
                      "Other relevant financial insight..."
                    ]
                  }
                  
                  Analyze this report:
                  '''${reportContent}'''`
                }
              ]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          params: { key: apiKey }
        }
      );

      // Log the response
      console.log("Gemini API response:", response);

      // Extract and return the analysis
      financialAnalysis = response.data.candidates[0].content.parts[0].text;
      console.log("Financial Analysis:", financialAnalysis);    

      // Clean the financial analysis response (remove backticks and make it user-friendly)
      const cleanedAnalysis = financialAnalysis.replace(/```json|```/g, '').trim();
      console.log(JSON.parse(cleanedAnalysis));
      return cleanedAnalysis;
    } catch (error) {
      console.error("Gemini API Error:", error.response || error.message);
      return financialAnalysis;
    }
  };

  // Function to upload file to Pinata (IPFS)
  const uploadFileToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      // Extract IPFS hash from response
      const ipfsHash = res.data.IpfsHash;
      console.log("File uploaded to IPFS with hash:", ipfsHash);
      return ipfsHash;
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      return null;
    }
  };

  // Function to send all form data + Gemini analysis to the database
  const sendToDatabase = async (formData) => {
    try {
      const response = await axios.post("/api/submitMilestone", formData);
      console.log("Database Response:", response);
      alert("Milestone submission successful!");
    } catch (error) {
      console.error("Error submitting to database:", error);
      alert("There was an error submitting your milestone.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Submit Milestone</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Milestone Message */}
          <div>
            <label htmlFor="milestoneMessage" className="block text-lg font-semibold text-gray-700 mb-2">
              Milestone Message
            </label>
            <textarea
              name="milestoneMessage"
              value={milestoneMessage}
              onChange={handleMessageChange}
              required
              placeholder="Add any additional comments or details about this milestone"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="5"
            />
          </div>

          {/* Upload PDF */}
          <div>
            <label htmlFor="pdfUpload" className="block text-lg font-semibold text-gray-700 mb-2">
              Upload PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="w-full file:border-gray-300 file:bg-indigo-600 file:text-white file:rounded-lg file:px-4 file:py-2 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Submit Milestone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PdfUploader
