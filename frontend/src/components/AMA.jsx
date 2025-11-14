// // src/components/AMA.jsx

import React, { useState, useEffect } from "react";
import { postData } from "../utils/postData";
import { useError } from "../context/ErrorContext";
import ErrorDisplay from "./ErrorDisplay";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/CommonStyles.css";

export default function AMA() {
  // Initialize state from localStorage, or with an empty string if nothing is saved.
  const [question, setQuestion] = useState(() => {
    const savedQuestion = localStorage.getItem("savedAMAQuestion");
    return savedQuestion || "";
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Save the question to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("savedAMAQuestion", question);
  }, [question]);

  const handleSubmit = async (e) => {
    // 🎯 Prevent default form submission behavior
    e.preventDefault();
    setLoading(true);
    const response = await postData("/api/ama/ask", { question });
    setLoading(false);
    if (response.error) {
      setResult(`❌ Error: ${response.error}`);
    } else {
      setResult(response.answer || "No answer returned.");
      setQuestion("");
      localStorage.removeItem("savedAMAQuestion");
    }
  };

  // 🎯 TODO: Add question history feature
  // 🎯 TODO: Implement response rating system
  // 🎯 TODO: Add follow-up question suggestions

  return (
    <section className="section-container advisor-section" aria-labelledby="advisor-title">
      {/* 🎯 SECTION HEADER WITH ICON */}
      <h3 id="advisor-title" className="section-heading">
        <svg className="heading-icon" width="32" height="32" viewBox="0 0 38 38" fill="none" style={{ marginRight: "10px" }}>
          <rect width="38" height="38" rx="10" fill="currentColor" />
          <polygon points="15,12 28,19 15,26" fill="white" />
        </svg>
        YouTube Policy Advisor
      </h3>
      
      {/* 🎯 QUESTION INPUT FORM */}
      <form onSubmit={handleSubmit} className="component-form">
        {/* ❓ QUESTION TEXT AREA */}
        <textarea
          rows={4}
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your YouTube policy question here..."
          disabled={isLoading(componentId)}
          className="component-textarea"
          aria-label="Enter your YouTube policy question"
        />
        
        {/* 🚀 SUBMIT BUTTON */}
        <button 
          type="submit" 
          className="submit-button primary" 
          disabled={isLoading(componentId)}
          aria-label={isLoading(componentId) ? "Processing request" : "Consult advisor"}
        >
          {isLoading(componentId) ? "Processing Request..." : "Consult Advisor"}
        </button>
      </form>
      
      {/* 📊 ADVISOR RESPONSE DISPLAY */}
      <div className="response-container result-card" role="status" aria-live="polite">
        <ErrorDisplay message={isLoading(componentId) ? null : (useError().errors[componentId] || null)} />
        {renderResponse()}
      </div>
    </section>
  );
};

// 🎯 Placeholder for future enhancements
/**
 * Future enhancement placeholder function
 * @todo Implement advanced advisor features
 */
const futureEnhancement = () => {
  // Reserved for future implementation
};

export default YouTubeAdvisorAMA;