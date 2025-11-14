/**
 * Theme Context Provider
 * =====================
 * 
 * This module provides theme management functionality for the application:
 * - Manages light/dark theme state
 * - Persists theme preference in localStorage
 * - Applies theme classes to document body
 * - Provides context for theme consumption throughout the app
 * 
 * Features:
 * - Automatic theme persistence using localStorage
 * - Dynamic theme class application to document body
 * - Custom hook for easy theme context consumption
 * - Development debugging utilities
 * 
 * @file Theme management context provider
 * @author YouTube Legal Advisor Team
 * @version 1.0.0
 */

import React, { createContext, useState, useEffect } from 'react';

/**
 * Theme Context Instance
 * Creates a context object for theme management
 * @type {React.Context}
 */
export const ThemeContext = createContext();

/**
 * Theme Provider Component
 * =======================
 * 
 * Manages application theme state and provides it to child components.
 * Handles theme persistence and DOM updates.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @example
 * return (
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 * )
 */
export const ThemeProvider = ({ children }) => {
  /**
   * Theme State Management
   * Initializes theme state from localStorage or defaults to 'light'
   * @type {[string, function]}
   */
  const [currentTheme, setCurrentTheme] = useState(() => {
    // 🎨 DEBUG: Initializing theme from localStorage
    const savedTheme = localStorage.getItem('app-theme');
    // 🎨 DEBUG: Theme initialized as {savedTheme || 'light'}
    return savedTheme || 'light';
  });

  /**
   * Theme Effect Hook
   * Handles theme changes, DOM updates, and persistence
   * Applies theme classes to document body and saves to localStorage
   */
  useEffect(() => {
    // 🎯 Apply theme class to document body element for CSS styling
    document.body.className = '';
    document.body.classList.add(currentTheme);
    
    // 📦 Store theme preference in localStorage for persistence across sessions
    localStorage.setItem('app-theme', currentTheme);
    
    // 🎨 DEBUG: Theme updated to: ${currentTheme}
    // Development logging (removed in production builds)
    console.log(`🎨 Theme updated to: ${currentTheme}`);
  }, [currentTheme]); // 🔄 Re-run effect when theme changes

  /**
   * Theme Toggle Function
   * Switches between light and dark themes
   * @returns {void}
   */
  const switchTheme = () => {
    // 🎯 Toggle between light and dark themes
    setCurrentTheme((previousTheme) => {
      const newTheme = previousTheme === 'light' ? 'dark' : 'light';
      // 🎨 DEBUG: Switching theme from ${previousTheme} to ${newTheme}
      return newTheme;
    });
  };

  /**
   * Context Value Object
   * Contains theme state and toggle function for provider value
   * @type {Object}
   */
  const contextValue = {
    theme: currentTheme,           // Current theme state
    toggleTheme: switchTheme       // Function to toggle themes
  };

  // 🎯 TODO: Add support for system preference detection
  // 🎯 TODO: Implement theme transition animations
  // 🎯 TODO: Add more theme variants (high contrast, etc.)

  // Render the provider with context value
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom Theme Hook
 * =================
 * 
 * Provides easy access to theme context values.
 * Throws error if used outside ThemeProvider.
 * 
 * @returns {Object} Theme context value containing theme and toggle function
 * @throws {Error} If used outside ThemeProvider
 */
export const useTheme = () => {
  // 🎯 Access theme context
  const context = React.useContext(ThemeContext);
  
  // 🚨 Validate hook usage within provider
  if (context === undefined) {
    throw new Error('❌ useTheme must be used within a ThemeProvider');
  }
  
  // 🎨 DEBUG: Theme context accessed successfully
  return context;
};

// 🎯 Placeholder for future theme extensions
/**
 * Theme Utilities Object
 * Reserved for additional theme utilities and extensions
 * @namespace ThemeUtils
 */
export const ThemeUtils = {
  /**
   * Theme utilities version
   * @type {string}
   */
  version: '1.0.0',
  
  /**
   * Future enhancement placeholder function
   * @todo Implement advanced theme features
   */
  futureEnhancement: () => {
    // Reserved for future implementation
  }
};