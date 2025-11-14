// // src/components/ContractExplainer.jsx
import React, { useState, useEffect } from "react"; // Import useEffect
import { postData } from "../utils/postData";
import LoadingState from "./LoadingState";
import ErrorDisplay from "./ErrorDisplay";
import "../styles/CommonStyles.css";
import { AlertCircle } from "lucide-react";

export default function ContractExplainer() {
  // Initialize state by reading from localStorage first.
  const [text, setText] = useState(() => {
    const savedText = localStorage.getItem("savedContractText");
    return savedText || "";
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Add an effect that saves the text to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("savedContractText", text);
  }, [text]);

  const handleSubmit = async (e) => {
    // 🎯 Prevent default form submission behavior
    e.preventDefault();

    // 📋 Validate input before processing
    if (!validateInput()) return;

    // 🚀 Set processing state and clear previous analysis
    setLoading(componentId, true);
    setAnalysis("");
    setError(""); // Clear previous errors
    // 🎨 DEBUG: Starting contract analysis process

    try {
      // 📦 Prepare payload with contract text
      let payload = { text: contractText };

      // 📄 If file is uploaded, extract and append text content
      if (file) {
        const fileText = await file.text();
        payload.text += `\n${fileText}`;
        // 🎨 DEBUG: PDF content appended to payload - {fileText.length} characters
      }

      // 🌐 Send request to backend API for contract simplification
      const apiResponse = await postData("/api/contract/simplify", payload, 20000);
      // 🎨 DEBUG: API response received - {apiResponse ? 'success' : 'error'}

      // 📋 Handle API response
      if (apiResponse.error) {
        setError(`❌ ${apiResponse.error}`);
        // 🎨 DEBUG: API returned error - {apiResponse.error}
      } else {
        setAnalysis(apiResponse.data.summary || "No analysis generated.");
        // 🎨 DEBUG: Analysis completed successfully
      }
    } catch (error) {
      // 🚨 Handle network or processing errors
      setError(`❌ Processing Error: ${error.message || "Service unavailable"}`);
      // 🎨 DEBUG: Processing error occurred - {error.message}
    } finally {
      // 🎯 Always reset processing state
      setLoading(componentId, false);
      // 🎨 DEBUG: Contract analysis process completed
    }
    setLoading(true);
    const response = await postData("/api/contract/simplify", { text });
    setLoading(false);
    if (response.error) {
      setResult(`❌ Error: ${response.error}`);
    } else {
      setResult(response.summary || "No summary returned.");
      setText("");
      localStorage.removeItem("savedContractText");
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

  // 🎯 TODO: Add caching mechanism for repeated contract analyses
  // 🎯 TODO: Implement contract comparison feature
  // 🎯 TODO: Add export functionality for analysis results

  return (
    <section className="section-container contract-section" aria-labelledby="contract-title">
      {/* 🎯 SECTION HEADER WITH ICON */}
      <h3 id="contract-title" className="section-heading">
        <svg className="heading-icon" width="32" height="32" viewBox="0 0 38 38" fill="none" style={{ marginRight: "10px" }}>
          <rect width="38" height="38" rx="10" fill="currentColor" />
          <polygon points="15,12 28,19 15,26" fill="white" />
        </svg>
        Legal Contract Analyzer
      </h3>
      
      {/* 🎯 CONTRACT INPUT FORM */}
      <form onSubmit={handleSubmit} className="component-form">
        {/* 📝 CONTRACT TEXT AREA */}
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste contract text here... your text will be saved as you type."
        />

        {/* 📄 PDF FILE UPLOAD */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={isLoading(componentId)}
          className="component-file-input"
          aria-label="Upload PDF contract"
          style={{ marginTop: "10px" }}
        />

        {/* 🚀 SUBMIT BUTTON */}
        <button 
          type="submit" 
          className="submit-button primary" 
          disabled={isLoading(componentId)}
          aria-label={isLoading(componentId) ? "Analyzing contract" : "Analyze legal terms"}
          style={{ marginTop: "10px" }}
        >
          {isLoading(componentId) ? "Analyzing Contract..." : "Analyze Legal Terms"}
        </button>
      </form>
      
      {/* 📊 ANALYSIS RESULTS DISPLAY */}
      <div className="result-container result-card" role="status" aria-live="polite">
        <ErrorDisplay message={isLoading(componentId) ? null : (useError().errors[componentId] || null)} />
        {renderAnalysis()}
        {renderErrorMessage()}
      </div>
    </section>
  );
};

// 🎯 Placeholder for future enhancements
/**
 * Future enhancement placeholder function
 * @todo Implement advanced contract analysis features
 */
const futureEnhancement = () => {
  // Reserved for future implementation
};

export default LegalContractAnalyzer;