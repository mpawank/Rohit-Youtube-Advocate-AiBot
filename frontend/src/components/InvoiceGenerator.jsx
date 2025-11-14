// // src/components/InvoiceGenerator.jsx
import React, { useState, useEffect } from "react";
import { postData } from "../utils/postData";
import { jsPDF } from "jspdf";
import { useError } from "../context/ErrorContext";
import ErrorDisplay from "./ErrorDisplay";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/CommonStyles.css";

export default function InvoiceGenerator() {
  // Initialize state by reading the saved inputs object from localStorage.
  const [inputs, setInputs] = useState(() => {
    const saved = localStorage.getItem("savedInvoiceInputs");
    // If there's saved data, parse it from JSON; otherwise, use the default state.
    return saved ? JSON.parse(saved) : {
      brand: "",
      service: "",
      amount: "",
      include_gst: true,
    };
  });
  
  const [invoiceOutput, setInvoiceOutput] = useState("");     // Generated invoice text
  const [isGenerating, setIsGenerating] = useState(false);    // Invoice generation state
  const [error, setError] = useState("");                    // Error message state

  // Save the entire inputs object to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("savedInvoiceInputs", JSON.stringify(inputs));
  }, [inputs]);
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    
    // 🎨 DEBUG: Form input updated - {id}: {type === 'checkbox' ? checked : value}
    setFormData((previousState) => ({
      ...previousState,
      [id]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  /**
   * Validate form data before processing
   * Ensures all required fields are filled
   * @returns {boolean} - Validation result
   */
  const validateFormData = () => {
    // 🎯 Check if required fields are filled
    if (!formData.brand.trim() || !formData.service.trim() || !formData.amount) {
      setError("⚠️ Please complete all required form fields.");
      // 🎨 DEBUG: Form validation failed - missing required fields
      return false;
    }
    
    // 🎨 DEBUG: Form validation passed
    clearError(componentId);
    return true;
  };

  /**
   * Handle invoice generation
   * Processes form data and sends to backend API to generate invoice
   * @param {Event} e - Form submit event
   */
  const handleInvoiceGeneration = async (e) => {
    // 🎯 Prevent default form submission behavior
    e.preventDefault();
    setLoading(true);
    const response = await postData("/api/invoice/generate", inputs);
    setLoading(false);
    if (response.error) {
      setResult(`❌ Error: ${response.error}`);
    } else {
      setResult(response.answer || "No answer returned.");
      setInputs("");
      localStorage.removeItem("savedInvoiceInputs");
    }
  };

  /**
   * Download invoice as PDF
   * Converts invoice text to PDF and triggers download
   */
  const downloadInvoicePDF = () => {
    // 📄 Create new PDF document
    const pdfDocument = new jsPDF();
    
    // 📝 Add invoice text to PDF
    pdfDocument.text(invoiceOutput, 10, 20);
    
    // 📁 Generate filename based on brand name
    const fileName = `invoice_${formData.brand.replace(/\s+/g, "_").toLowerCase()}.pdf`;
    
    // 🚀 Trigger PDF download
    pdfDocument.save(fileName);
    // 🎨 DEBUG: Invoice PDF downloaded - {fileName}
  };

  /**
   * Render invoice content based on state
   * Handles loading, empty, and result states
   * @returns {JSX.Element} - Invoice content to display
   */
  const renderInvoiceContent = () => {
    // 🔄 Show loading indicator during generation
    if (isLoading(componentId)) {
      return <LoadingSpinner message="Creating professional invoice..." />;
    }
    
    // ❌ Show error message if present
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    
    // 📋 Show invoice output if available
    if (invoiceOutput) {
      return (
        <>
          <div className="invoice-display">{invoiceOutput}</div>
          {/* 🎯 Show download button only for successful invoices */}
          {!invoiceOutput.startsWith("❌") && (
            <button
              onClick={downloadInvoicePDF}
              className="download-button primary"
              disabled={isLoading(componentId)}
            >
              {isLoading(componentId) ? "Processing Download..." : "Export as PDF"}
            </button>
          )}
        </>
      );
    }
    
    // 🎯 Show placeholder when no invoice is available
    return <div className="invoice-placeholder">Your generated invoice will appear in this section...</div>;
  };

  /**
   * Render input fields for invoice form
   * @returns {JSX.Element} - Form input fields
   */
  const renderInputFields = () => (
    <>
      {/* 🏢 BRAND/CLIENT NAME INPUT */}
      <input
        id="brand"
        type="text"
        value={formData.brand}
        onChange={handleFormInputChange}
        placeholder="Enter brand or sponsor name"
        className="form-input-field"
        disabled={isLoading(componentId)}
      />
      
      {/* 🛠️ SERVICE DESCRIPTION INPUT */}
      <input
        id="service"
        type="text"
        value={formData.service}
        onChange={handleFormInputChange}
        placeholder="Describe service provided"
        className="form-input-field"
        disabled={isLoading(componentId)}
      />
      
      {/* 💰 AMOUNT INPUT */}
      <input
        id="amount"
        type="number"
        value={formData.amount}
        onChange={handleFormInputChange}
        placeholder="Enter amount in INR"
        className="form-input-field"
        disabled={isLoading(componentId)}
      />

      {/* 🧾 GST SELECTION CHECKBOX */}
      <label className="gst-selection-label">
        <input
          id="include_gst"
          type="checkbox"
          checked={formData.include_gst}
          onChange={handleFormInputChange}
          disabled={isLoading(componentId)}
          className="gst-selection-checkbox"
        />
        <span className="gst-option-text">Include GST taxation (18%)</span>
      </label>
    </>
  );

  // 🎯 TODO: Add currency selection feature
  // 🎯 TODO: Implement invoice template customization
  // 🎯 TODO: Add email invoice functionality

  return (
    <section className="section-container invoice-creator-section">
      {/* 🎯 SECTION HEADER WITH ICON */}
      <h3 className="section-heading">
        <svg className="heading-icon" width="32" height="32" viewBox="0 0 38 38" fill="none">
          <rect width="38" height="38" rx="10" fill="currentColor" />
          <polygon points="15,12 28,19 15,26" fill="white" />
        </svg>
        Professional Invoice Creator
      </h3>

      {/* 🎯 INVOICE CREATION FORM */}
      <form onSubmit={handleInvoiceGeneration} className="invoice-creation-form">
        {renderInputFields()}
        <button 
          type="submit" 
          className="generate-invoice-button primary" 
          disabled={isLoading(componentId)}
        >
          {isLoading(componentId) ? "Creating Invoice..." : "Generate Professional Invoice"}
        </button>
      </form>

      {/* 📊 INVOICE RESULTS DISPLAY */}
      <div className="invoice-result-container result-card">
        <ErrorDisplay message={isLoading(componentId) ? null : (useError().errors[componentId] || null)} />
        {renderInvoiceContent()}
      </div>
    </section>
  );
};

// 🎯 Placeholder for future enhancements
/**
 * Future enhancement placeholder function
 * @todo Implement advanced invoice features
 */
const futureEnhancement = () => {
  // Reserved for future implementation
};

export default ProfessionalInvoiceCreator;