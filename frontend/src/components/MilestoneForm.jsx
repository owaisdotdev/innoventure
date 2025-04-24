// src/components/MilestoneForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import pdfParse from "pdf-parse/lib/pdf-parse.js"; // Browser-compatible version

// Configure PDF.js worker dynamically
const loadPDFWorker = () => {
  return new Promise((resolve) => {
    if (window.PDFJS && window.PDFJS.workerSrc) {
      console.log("Worker already configured:", window.PDFJS.workerSrc);
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "/pdf.worker.min.js"; // Path to file in public/
    script.async = true;
    script.onload = () => {
      window.PDFJS = window.PDFJS || {};
      window.PDFJS.workerSrc = "/pdf.worker.min.js"; // Set the older API explicitly
      console.log("PDF worker loaded successfully");
      resolve();
    };
    script.onerror = () => {
      console.error("Failed to load PDF worker script");
      resolve(); // Proceed with fallback
    };
    document.head.appendChild(script);
  });
};

function MilestoneForm({ onClose, addMilestone }) {
  const [formData, setFormData] = useState({
    milestoneId: "",
    title: "",
    description: "",
    budgetSpent: "",
    completionDate: "",
    file: null,
    reportSummary: "",
  });

  // Load the worker when the component mounts
  useEffect(() => {
    loadPDFWorker();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock Pinata upload (replace with your actual Pinata logic if available)
    const fileUrl = formData.file ? "https://ipfs.io/ipfs/mockhash" : "";
    const fileName = formData.file ? formData.file.name : "";

    // Call Gemini API
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    let financialAnalysis = "Analysis unavailable";

    try {
      let reportContent = formData.reportSummary; 

      if (formData.file) {
        try {
          await loadPDFWorker(); // Ensure worker is loaded
          console.log("Worker config before parsing:", window.PDFJS?.workerSrc);
          const arrayBuffer = await formData.file.arrayBuffer();
          const pdfData = await pdfParse(arrayBuffer); // Parse PDF with local worker
          reportContent = pdfData.text || "No text extracted from PDF";
          console.log("Extracted PDF text:", reportContent);
        } catch (pdfError) {
          console.error("PDF Parsing Error:", pdfError);
          reportContent = formData.reportSummary || "PDF parsing failed; using summary if provided.";
        }
      }

      console.log("Report content sent to Gemini:", reportContent);
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a financial analyst AI. Do financial analysis of the following report: '${reportContent}'. Calculate profit and loss and highlight important details. Provide a concise analysis under 150 words.`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: { key: apiKey }, // API key as query parameter
        }
      );
      console.log("Gemini Response:", response.data);
      financialAnalysis = response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API Error:", error.response ? error.response.data : error.message);
      financialAnalysis = "Error analyzing report: " + (error.message || "Unknown error");
    }

    const milestone = {
      milestoneId: formData.milestoneId || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      budgetSpent: formData.budgetSpent,
      completionDate: formData.completionDate,
      fileUrl,
      fileName,
      financialAnalysis,
      submittedAt: new Date().toISOString(),
    };

    addMilestone(milestone);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4">
      <h2 className="text-xl text-white">Submit Milestone</h2>
      <input
        name="milestoneId"
        value={formData.milestoneId}
        onChange={handleChange}
        placeholder="Milestone ID"
        className="w-full p-2 bg-gray-700 text-white rounded"
      />
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 bg-gray-700 text-white rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 bg-gray-700 text-white rounded"
        required
      />
      <input
        name="budgetSpent"
        type="number"
        value={formData.budgetSpent}
        onChange={handleChange}
        placeholder="Budget Spent ($)"
        className="w-full p-2 bg-gray-700 text-white rounded"
        required
      />
      <input
        name="completionDate"
        type="date"
        value={formData.completionDate}
        onChange={handleChange}
        className="w-full p-2 bg-gray-700 text-white rounded"
        required
      />
      <input
        name="file"
        type="file"
        onChange={handleChange}
        className="w-full p-2 bg-gray-700 text-white rounded"
        accept=".pdf" // Restrict to PDF files
      />
      <textarea
        name="reportSummary"
        value={formData.reportSummary}
        onChange={handleChange}
        placeholder="Financial Report Summary (e.g., Revenue: $50,000, Expenses: $20,000) - Optional if file uploaded"
        className="w-full p-2 bg-gray-700 text-white rounded"
      />
      <div className="flex space-x-4">
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">
          Submit
        </button>
        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MilestoneForm;