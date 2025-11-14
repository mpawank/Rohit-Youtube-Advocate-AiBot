// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { postData } from "../utils/postData";
import LoadingState from "./LoadingState";
import ErrorDisplay from "./ErrorDisplay";
import "../styles/CommonStyles.css";

export default function YouTubePolicyQA() {
  // Initialize state from localStorage, or with an empty string if nothing is saved.
  const [question, setQuestion] = useState(() => {
    const savedQuestion = localStorage.getItem("savedPolicyQuestion");
    return savedQuestion || "";
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Save the question to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("savedPolicyQuestion", question);
  }, [question]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await postData("/api/youtube/policy", { question });
    setLoading(false);
    if (response.error) {
      setResult(`❌ Error: ${response.error}`);
    } else {
      setResult(response.answer || "No answer returned.");
      setQuestion("");
      localStorage.removeItem("savedPolicyQuestion");
    }
  };

  /**
   * Render error message with appropriate styling
   * @returns {JSX.Element|null} - Error message element or null
   */
  const renderErrorMessage = () => {
    if (!error) return null;
    
    return (
      <div className="error-message-container">
        <div className="error-message">{error}</div>
        {error.includes("Network error") && (
          <div className="error-suggestion">
            💡 Tip: Check your internet connection and make sure the backend server is running.
          </div>
        )}
        {error.includes("Service Unavailable") && (
          <div className="error-suggestion">
            💡 Tip: The service may be temporarily unavailable. Please try again in a few minutes.
          </div>
        )}
      </div>
    );
  };

  // 🎯 TODO: Add policy question history feature
  // 🎯 TODO: Implement policy category filtering
  // 🎯 TODO: Add bookmark functionality for important answers

  return (
    <section className="section-container policy-advisor-section">
      {/* 🎯 SECTION HEADER WITH ICON AND EMOJI */}

      <h3 className="section-header">
        <svg className="header-icon" width="32" height="32" viewBox="0 0 38 38" fill="none" style={{ marginRight: "10px" }}>
          <rect width="38" height="38" rx="10" fill="currentColor" />
          <polygon points="15,12 28,19 15,26" fill="white" />
        </svg>
        🛡️ YouTube Policy Advisor
      </h3>

      {/* 🎯 POLICY RESEARCH FORM */}

      <form onSubmit={handlePolicyResearch} className="policy-research-form">
        {/* ❓ POLICY QUESTION TEXT AREA */}
        <textarea
          rows={4}
          value={policyQuestion}
          onChange={handlePolicyInputChange}
          placeholder="Ask about YouTube community guidelines, monetization, or content policies..."
          disabled={isLoading(componentId)}
          className="policy-question-input"
        />
        
        {/* 🚀 RESEARCH SUBMIT BUTTON */}
        <button 
          type="submit" 
          className="research-button primary" 
          disabled={isLoading(componentId)}
        >
          {isLoading(componentId) ? "🔍 Researching..." : "Get Policy Insights"}
        </button>
      </form>

      {/* 📊 POLICY RESPONSE DISPLAY */}
      <div className="policy-response-container result-card">
        <ErrorDisplay message={isLoading(componentId) ? null : (useError().errors[componentId] || null)} />
        {renderPolicyResponse()}
        {renderErrorMessage()}
      </div>
    </section>
  );
};

// 🎯 Placeholder for future enhancements
/**
 * Future enhancement placeholder function
 * @todo Implement advanced policy research features
 */
const futureEnhancement = () => {
  // Reserved for future implementation
};

export default YouTubePolicyAdvisor;