/**
 * Unified Error Handler Utility
 * =============================
 * 
 * Provides consistent error handling across the application with:
 * - Standardized error message formatting
 * - Error categorization and logging
 * - User-friendly error display
 * - Error reporting capabilities
 */

/**
 * Error categories for better classification
 */
export const ERROR_CATEGORIES = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  AUTHENTICATION: 'authentication',
  SERVER: 'server',
  CLIENT: 'client',
  UNKNOWN: 'unknown'
};

/**
 * Format error message for user display
 * @param {string|Error|Object} error - The error to format
 * @param {string} context - Context where the error occurred
 * @returns {string} Formatted error message
 */
export const formatErrorMessage = (error, context = '') => {
  // Handle different error types
  if (typeof error === 'string') {
    return error;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (error && typeof error === 'object') {
    if (error.error) {
      return error.error;
    }
    if (error.message) {
      return error.message;
    }
    return JSON.stringify(error);
  }
  
  return 'An unexpected error occurred';
};

/**
 * Log error for debugging purposes
 * @param {Error|string|Object} error - The error to log
 * @param {string} context - Context where the error occurred
 * @param {string} category - Category of the error
 */
export const logError = (error, context = '', category = ERROR_CATEGORIES.UNKNOWN) => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    category,
    error: error instanceof Error ? error.message : error,
    stack: error instanceof Error ? error.stack : undefined
  };
  
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('[ErrorHandler]', errorInfo);
  }
  
  // TODO: In production, send to error tracking service
  // Example: Sentry.captureException(error, { contexts: { app: errorInfo } });
};

/**
 * Create user-friendly error message based on error type
 * @param {Error|string|Object} error - The error to process
 * @param {string} context - Context where the error occurred
 * @returns {Object} Formatted error object with message and type
 */
export const createUserFriendlyError = (error, context = '') => {
  const formattedMessage = formatErrorMessage(error, context);
  
  // Map common error patterns to user-friendly messages
  if (formattedMessage.includes('Failed to fetch') || formattedMessage.includes('NetworkError')) {
    logError(error, context, ERROR_CATEGORIES.NETWORK);
    return {
      message: 'Unable to connect to the server. Please check your internet connection and try again.',
      type: 'network',
      recoverable: true
    };
  }
  
  if (formattedMessage.includes('401') || formattedMessage.includes('Unauthorized')) {
    logError(error, context, ERROR_CATEGORIES.AUTHENTICATION);
    return {
      message: 'Your session has expired. Please refresh the page and try again.',
      type: 'auth',
      recoverable: false
    };
  }
  
  if (formattedMessage.includes('400') || formattedMessage.includes('Bad Request')) {
    logError(error, context, ERROR_CATEGORIES.VALIDATION);
    return {
      message: 'There was a problem with your request. Please check your input and try again.',
      type: 'validation',
      recoverable: true
    };
  }
  
  if (formattedMessage.includes('500') || formattedMessage.includes('Internal Server Error')) {
    logError(error, context, ERROR_CATEGORIES.SERVER);
    return {
      message: 'Our servers are experiencing issues. Please try again later.',
      type: 'server',
      recoverable: true
    };
  }
  
  // Generic error
  logError(error, context, ERROR_CATEGORIES.UNKNOWN);
  return {
    message: formattedMessage || 'Something went wrong. Please try again.',
    type: 'generic',
    recoverable: true
  };
};

/**
 * Handle API error with appropriate user feedback
 * @param {Error|string|Object} error - The error to handle
 * @param {Function} setErrorState - Function to set error state in component
 * @param {string} context - Context where the error occurred
 */
export const handleApiError = (error, setErrorState, context = '') => {
  const userError = createUserFriendlyError(error, context);
  setErrorState(userError.message);
  return userError;
};

export default {
  ERROR_CATEGORIES,
  formatErrorMessage,
  logError,
  createUserFriendlyError,
  handleApiError
};