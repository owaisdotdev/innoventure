import React from "react";
import {
  Line,
  Pie,
  Bar,
  Radar,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Layout from "./Layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const InvestorAnalysisCharts = () => {
  const roiData = {
    labels: [
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
    ],
    datasets: [
      {
        label: "ROI (%)",
        data: [2.1, 3.5, 4.2, 3.9, 5.0, 4.6, 6.1, 6.8, 7.2, 7.8, 8.3, 9.0],
        borderColor: "#4ade80",
        backgroundColor: "#bbf7d0",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const sectorData = {
    labels: ["FinTech", "HealthTech", "AI & ML", "E-Commerce", "Green Energy", "Other"],
    datasets: [
      {
        label: "Sector Distribution",
        data: [28, 22, 18, 15, 10, 7],
        backgroundColor: [
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#f87171",
          "#a78bfa",
          "#cbd5e1",
        ],
      },
    ],
  };

  const riskReturnData = {
    labels: ["FinTech", "HealthTech", "AI & ML", "E-Commerce", "Green Energy"],
    datasets: [
      {
        label: "Risk Level",
        data: [3, 2, 4, 2, 5],
        backgroundColor: "#fca5a5",
      },
      {
        label: "Return Score",
        data: [6, 5, 8, 4, 7],
        backgroundColor: "#86efac",
      },
    ],
  };

  const sentimentData = {
    labels: ["Innovation", "Team Strength", "Market Demand", "Growth Potential", "Risk"],
    datasets: [
      {
        label: "Investor Sentiment",
        data: [9, 8, 7, 8, 4],
        backgroundColor: "rgba(96, 165, 250, 0.2)",
        borderColor: "#60a5fa",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Layout>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">ROI Over Time</h2>
        <Line data={roiData} />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Investment by Sector</h2>
        <Pie data={sectorData} />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Risk vs Return</h2>
        <Bar data={riskReturnData} />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Investor Sentiment Radar</h2>
        <Radar data={sentimentData} />
      </div>
    </div>
    </Layout>
  );
};

export default InvestorAnalysisCharts;
