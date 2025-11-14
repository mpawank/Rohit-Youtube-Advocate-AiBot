import React, { createContext, useContext, useState } from 'react';

/**
 * Error Context for centralized error management
 */
export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  /**
   * Set an error for a specific component
   */
  const setError = (component, error) => {
    setErrors(prev => ({
      ...prev,
      [component]: error
    }));
  };

  /**
   * Clear error for a specific component
   */
  const clearError = (component) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[component];
      return newErrors;
    });
  };

  /**
   * Set loading state for a specific component
   */
  const setLoading = (component, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [component]: isLoading
    }));
  };

  /**
   * Check if a component is loading
   */
  const isLoading = (component) => {
    return !!loadingStates[component];
  };

  const value = {
    errors,
    setError,
    clearError,
    setLoading,
    isLoading
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};