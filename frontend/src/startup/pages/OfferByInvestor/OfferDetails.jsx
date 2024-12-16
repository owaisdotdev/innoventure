import React, { useState } from "react";
import { ethers } from "ethers";

const OfferDetails = ({ offer, onClose }) => {
  const [signedMessage, setSignedMessage] = useState(null);
  const [signedBy, setSignedBy] = useState(null);

  // Connect to Ethereum using MetaMask
  const handleAccept = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const message = `I accept the offer from ${offer.investorName} with an amount of ${offer.amount} and equity of ${offer.equityPercentage}%`;

        const signedMessage = await signer.signMessage(message);
        const recoveredAddress = await ethers.verifyMessage(message, signedMessage);

        setSignedMessage(signedMessage); // Update state with signed message
        setSignedBy(recoveredAddress); // Update state with recovered address
      } else {
        alert("Please install MetaMask or another Ethereum wallet.");
      }
    } catch (error) {
      console.error("Error signing message", error);
      alert("There was an error accepting the offer.");
    }
  };

  const handleReject = () => {
    alert(`Offer from ${offer.investorName} has been rejected.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 max-h-[90%] overflow-auto rounded-lg shadow-lg p-6">
        <button
          className="text-gray-500 hover:text-gray-800 mb-4"
          onClick={onClose}
        >
          &larr; Back to Offers
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Offer Details
        </h2>
        <p>
          <strong>Investor Name:</strong> {offer.investorName}
        </p>
        <p>
          <strong>Amount:</strong> ${offer.amount.toLocaleString()}
        </p>
        <p>
          <strong>Equity Percentage:</strong> {offer.equityPercentage}%
        </p>
        <p>
          <strong>Status:</strong> {offer.status}
        </p>
        <div className="mt-4">
          <strong>Terms & Conditions:</strong>
          <ul className="list-decimal pl-5 space-y-2">
            {offer.terms.map((term, index) => (
              <li key={index} className="text-sm text-gray-700">
                {term}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>

        {/* Display Signed Message and Signed By */}
        {signedMessage && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <p>
              <strong>Signed Message:</strong>
            </p>
            <pre className="text-xs text-gray-800  ">{signedMessage}</pre>
          </div>
        )}
        {signedBy && (
          <div className="mt-4">
            <p>
              <strong>Signed By:</strong> {signedBy}
            </p>
          </div>
        )}

        {/* Footer - Keep at Bottom */}
        <div className="mt-6 bg-gray-200 p-4 text-center text-sm text-gray-700 rounded-lg">
          <p>Thank you for reviewing the offer.</p>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
