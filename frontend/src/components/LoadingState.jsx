import React from "react";
import "../styles/CommonStyles.css";

/**
 * Standardized Loading State Component
 * ===================================
 * 
 * Provides consistent loading indicators across the application with:
 * - Visual spinner animation
 * - Customizable message
 * - Accessible labeling
 * - Responsive design
 */

const LoadingState = ({ 
  message = "Processing your request...", 
  size = "medium",
  variant = "default" 
}) => {
  // Size classes for different spinner sizes
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  // Variant classes for different styling
  const variantClasses = {
    default: "border-blue-500",
    success: "border-green-500",
    warning: "border-yellow-500",
    error: "border-red-500"
  };

  return (
    <div className="loading-state-container flex flex-col items-center justify-center p-4">
      <div 
        className={`loading-spinner ${sizeClasses[size]} ${variantClasses[variant]} border-4 border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="loading-message mt-2 text-center text-gray-600 dark:text-gray-300">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingState;