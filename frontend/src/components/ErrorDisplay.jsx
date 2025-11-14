import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import "../styles/CommonStyles.css";

/**
 * Standardized Error Display Component
 * ==================================
 * 
 * Provides consistent error display across the application with:
 * - Visual error icon
 * - Clear error message
 * - Retry functionality
 * - Accessible design
 */

const ErrorDisplay = ({ 
  message = "Something went wrong", 
  onRetry, 
  showRetry = true,
  className = ""
}) => {
  return (
    <div className={`error-display-container flex flex-col items-center justify-center p-6 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800 ${className}`}>
      <div className="error-icon-container mb-4">
        <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
      </div>
      
      <div className="error-message-container text-center mb-4">
        <h3 className="error-title text-lg font-medium text-red-800 dark:text-red-200 mb-2">
          Error
        </h3>
        <p className="error-description text-red-700 dark:text-red-300">
          {message}
        </p>
      </div>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="retry-button flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Retry operation"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;