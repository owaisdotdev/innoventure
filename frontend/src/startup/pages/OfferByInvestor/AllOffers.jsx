// AllOffers.jsx
import React, { useState } from "react";
import Layout from "@/startup/Layout/Layout";
import OfferDetails from "./OfferDetails";

const AllOffers = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const offers = [
    {
      id: 1,
      investorName: "Alice Johnson",
      equityPercentage: 12,
      amount: 50000,
      status: "Under Review",
      terms: [
        "1. Investor agrees to take a 12% equity stake in the company.",
        "2. ROI is expected within 2 years.",
        "3. Investor will receive quarterly reports on the company's financial status.",
        "4. Investor’s equity stake is non-dilutable for the first 3 years.",
        "5. The company commits to providing an annual audit of financial records.",
        "6. Investor will have voting rights on all major company decisions.",
        "7. Investor can request to attend quarterly board meetings.",
        "8. The company will provide a preferred return of 5% per annum to the investor.",
        "9. The company agrees not to incur more than 10% debt without the investor's consent.",
        "10. Investor agrees to keep all company-related information confidential.",
        "11. The company guarantees an exit strategy after the third year.",
        "12. The investor agrees to participate in a joint strategy session after 12 months."
      ],
    },
    {
      id: 2,
      investorName: "Robert Chen",
      equityPercentage: 15,
      amount: 75000,
      status: "Accepted",
      terms: [
        "1. Investor receives a 15% equity stake in the company.",
        "2. Investor's equity is non-dilutable for the first 3 years.",
        "3. Quarterly financial and performance reports will be provided to the investor.",
        "4. Investor will receive 10% of the annual profits for the first 3 years.",
        "5. The investor has the right to appoint one board member for the first 5 years.",
        "6. The company agrees to maintain detailed records of all transactions.",
        "7. The investor can attend all shareholder meetings.",
        "8. Any additional funding from the investor will be mutually agreed upon.",
        "9. The company will provide a clear exit strategy after 5 years.",
        "10. All business decisions will require approval from the investor for the first 3 years.",
        "11. The investor agrees to provide feedback on business performance at each quarterly meeting.",
        "12. The company will maintain full transparency regarding business operations."
      ],
    },
    {
      id: 3,
      investorName: "Sofia Martinez",
      equityPercentage: 10,
      amount: 60000,
      status: "Declined",
      terms: [
        "1. Investor agrees to take a 10% equity stake in the company.",
        "2. Company will ensure regular quarterly reports and updates.",
        "3. Investor will have access to annual financial audits.",
        "4. Investor will participate in board meetings annually.",
        "5. Exit strategy will be finalized within 5 years.",
        "6. Investor's equity stake is non-dilutable for the first 4 years.",
        "7. The company agrees to maintain full transparency of operations.",
        "8. Any additional funding requirements will be discussed and agreed upon jointly.",
        "9. The company commits to providing a 5% annual return on investment for the first 3 years.",
        "10. The company will focus on market expansion and growth within the first 2 years.",
        "11. Investor agrees to support the company’s sustainability goals.",
        "12. The company will provide updates on strategic partnerships and collaborations."
      ],
    },
    {
      id: 4,
      investorName: "Michael Patel",
      equityPercentage: 18,
      amount: 100000,
      status: "Pending",
      terms: [
        "1. Investor agrees to take an 18% equity stake in the company.",
        "2. The company guarantees annual profit-sharing of 10% for the first 3 years.",
        "3. Quarterly financial and performance reports will be shared with the investor.",
        "4. Investor will have the right to attend annual general meetings (AGMs).",
        "5. The company will ensure no more than 15% debt is incurred without prior consent from the investor.",
        "6. The investor agrees to be involved in decision-making processes for major business operations.",
        "7. Investor will have the right to request an independent audit of financial records once per year.",
        "8. The company will provide a clear and structured exit strategy within 4 years.",
        "9. Investor can appoint a board member during the investment period.",
        "10. The company commits to providing detailed business projections for the next 5 years.",
        "11. Investor’s equity stake is non-dilutable for the first 4 years.",
        "12. The company will provide updates on key milestones and achievements every 6 months."
      ],
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Investment Offers
          </h1>

          {/* Offers List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedOffer(offer)}
              >
                <h2 className="text-xl font-bold text-gray-800">
                  {offer.investorName}
                </h2>
                <p className="mt-2">
                  <strong>Amount:</strong> ${offer.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Equity:</strong> {offer.equityPercentage}%
                </p>
                <p
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-bold ${
                    offer.status === "Accepted"
                      ? "bg-green-100 text-green-600"
                      : offer.status === "Under Review"
                      ? "bg-yellow-100 text-yellow-600"
                      : offer.status === "Declined"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {offer.status}
                </p>
              </div>
            ))}
          </div>

          {/* Offer Details */}
          {selectedOffer && (
            <OfferDetails
              offer={selectedOffer}
              onClose={() => setSelectedOffer(null)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllOffers;
