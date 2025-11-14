import React from 'react';
import '../styles/CommonStyles.css';

/**
 * Reusable Loading Spinner Component
 * Provides consistent loading indicators across the application
 */
const LoadingSpinner = ({ message = "Processing...", size = "medium" }) => {
  const sizeClass = `spinner-${size}`;
  
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className={`loading-spinner ${sizeClass}`} aria-hidden="true"></div>
      {message && <span className="loading-message">{message}</span>}
    </div>
  );
};

export default LoadingSpinner;