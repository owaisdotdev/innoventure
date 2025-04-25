import React, { useEffect, useState } from "react";
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

const MarketAnalysisCharts = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000); // 4 second loading
    return () => clearTimeout(timer);
  }, []);

  const marketTrendData = {
    labels: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025", "Q2 2025"],
    datasets: [
      {
        label: "Market Size ($M)",
        data: [120, 140, 170, 200, 230, 260],  // Reflecting a growing market
        borderColor: "#34d399", // Green
        backgroundColor: "#a7f3d0", // Light Green
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const marketShareData = {
    labels: ["TechStart", "InnoSolutions", "FutureTech", "NanoDynamics", "Our Startup"],
    datasets: [
      {
        label: "Market Share (%)",
        data: [18, 23, 17, 12, 30],  // More realistic competitor market shares
        backgroundColor: [
          "#f87171", "#60a5fa", "#fbbf24", "#34d399", "#a78bfa"
        ],
      },
    ],
  };

  const consumerSentimentData = {
    labels: ["Price Sensitivity", "Brand Loyalty", "Product Quality", "Innovation", "Customer Support"],
    datasets: [
      {
        label: "Consumer Sentiment",
        data: [72, 65, 80, 75, 70],  // More realistic sentiment based on industry trends
        backgroundColor: "#93c5fd", // Blue
        borderColor: "#60a5fa",
        borderWidth: 2,
      },
    ],
  };

  const competitorPerformanceData = {
    labels: ["TechStart", "InnoSolutions", "FutureTech", "NanoDynamics", "Our Startup"],
    datasets: [
      {
        label: "Performance Score",
        data: [78, 82, 75, 70, 88],  // Performance rating of competitors and own startup
        backgroundColor: "#fca5a5", // Light Red
        borderColor: "#f87171",
        borderWidth: 2,
      },
    ],
  };

  const readinessData = {
    labels: ["Product-Market Fit", "Go-to-Market Strategy", "Revenue Model", "User Acquisition", "Tech Scalability"],
    datasets: [
      {
        label: "Startup Readiness",
        data: [8, 7, 6, 7, 8],  // A more balanced readiness assessment
        backgroundColor: "rgba(16, 185, 129, 0.2)", // Green
        borderColor: "#10b981",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-2">Market Growth Trend</h2>
            <Line data={marketTrendData} />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-2">Market Share Distribution</h2>
            <Pie data={marketShareData} />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-2">Consumer Sentiment</h2>
            <Bar data={consumerSentimentData} />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-2">Competitor Performance</h2>
            <Radar data={competitorPerformanceData} />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">Startup Readiness Assessment</h2>
            <Bar data={readinessData} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MarketAnalysisCharts;
