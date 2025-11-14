import React, { useState, useEffect } from "react"; // Import useEffect
import { postData } from "../utils/postData";
import { useError } from "../context/ErrorContext";
import ErrorDisplay from "./ErrorDisplay";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/CommonStyles.css";

export default function ContentSafetyChecker() {
  // MODIFICATION: Initialize state from localStorage, or with an empty string if nothing is saved.
  const [script, setScript] = useState(() => {
    const savedScript = localStorage.getItem("savedUserScript");
    return savedScript || "";
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // MODIFICATION: Add a useEffect hook to save the script to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("savedUserScript", script);
  }, [script]); // This effect runs every time the 'script' state changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await postData("/api/content/check", { text: script });
    setLoading(false);
    if (response.error) {
      setResult(`❌ Error: ${response.error}`);
    } else {
      setResult(response.answer || "No answer returned.");
      setScript("");
      localStorage.removeItem("savedUserScript");
    }
  };

  // 🎯 TODO: Add content history feature
  // 🎯 TODO: Implement content category filtering
  // 🎯 TODO: Add save functionality for important reports

  return (
    <section className="section-container safety-analyzer-section">
      {/* 🎯 SECTION HEADER WITH ICON AND EMOJI */}
      <h3 className="section-header">
        <svg className="header-icon" width="32" height="32" viewBox="0 0 38 38" fill="none" style={{ marginRight: "10px" }}>
          <rect width="38" height="38" rx="10" fill="currentColor" />
          <path d="M19 10L22 15L27 16L23 20L24 25L19 22L14 25L15 20L11 16L16 15L19 10Z" fill="white" />
        </svg>
        🔍 Content Safety Checker
      </h3>

      {/* 🎯 CONTENT ANALYSIS FORM */}
      <form onSubmit={handleContentAnalysis} className="content-analysis-form">
        {/* 📝 CONTENT TEXT AREA */}
        <textarea
          rows={6}
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Paste your content here... it will be saved automatically."
        />
        
        {/* 🚀 ANALYSIS SUBMIT BUTTON */}
        <button 
          type="submit" 
          className="submit-button primary" 
          disabled={isLoading(componentId)}
          aria-label={isLoading(componentId) ? "Analyzing content" : "Run safety check"}
        >
          {isLoading(componentId) ? "Analyzing Content..." : "Run Safety Check"}
        </button>
      </form>
      
      {/* 📊 ANALYSIS RESULTS DISPLAY */}
      <div className="result-container result-card" role="status" aria-live="polite">
        <ErrorDisplay message={isLoading(componentId) ? null : (useError().errors[componentId] || null)} />
        {renderResult()}
      </div>
    </section>
  );
};

// 🎯 Placeholder for future enhancements
/**
 * Future enhancement placeholder function
 * @todo Implement advanced content analysis features
 */
const futureEnhancement = () => {
  // Reserved for future implementation
};

export default ContentSafetyAnalyzer;