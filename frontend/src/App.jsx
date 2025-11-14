import React, { useContext, useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { ErrorProvider } from './context/ErrorContext';
import LegalContractAnalyzer from "./components/ContractExplainer";
import ContentSafetyAnalyzer from "./components/ContentSafetyChecker";
import InvoiceGenerator from "./components/InvoiceGenerator";
import YouTubeAdvisorAMA from "./components/AMA";
import YouTubePolicyQA from "./components/YouTubePolicyQA";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import CodeOfConduct from "./pages/CodeOfConduct";
import SecurityPolicy from "./pages/SecurityPolicy";
import Contributing from "./pages/Contributing";
import Learn from "./pages/Learn";
import "./styles/Navbar.css";
import "./styles/LandingPage.css";
import "./styles/Footer.css";
import "./styles/CommonStyles.css";
import "./styles/theme.css";

// 🎯 MAIN APPLICATION COMPONENT
// ==============================
const App = () => {
  return (
    <ThemeProvider>
      <ErrorProvider>
        <Router>
          <AppContent />
        </Router>
      </ErrorProvider>
    </ThemeProvider>
  );
};

// 🎯 APPLICATION CONTENT COMPONENT
// ================================
// Handles theme context and mobile navigation state
const AppContent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const skipLinkRef = useRef(null);

  // 🎯 MOBILE NAVIGATION HANDLERS
  // ==============================
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Handle keyboard navigation for mobile menu
  useEffect(() => {
    const handleKeyDown = (event) => {
      // ESC key to close menu
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        // Focus hamburger button after closing
        const hamburgerButton = document.querySelector('.hamburger');
        if (hamburgerButton) hamburgerButton.focus();
      }
      
      // Tab key handling for focus trap
      if (menuOpen && event.key === 'Tab') {
        const focusableElements = navRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // 🎨 DEBUG: Mobile menu state management initialized
  const handleNavLinkClick = () => {
    setMenuOpen(false);
    // Return focus to main content after navigation
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
    }
  };

  // Focus main content when skip link is clicked
  const handleSkipLinkClick = (e) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      mainContent.removeAttribute('tabindex');
    }
  };

  return (
    <div className="app-wrapper">
      {/* ========== SKIP TO CONTENT LINK ========== */}
      <a 
        href="#main-content" 
        className="skip-link"
        onClick={handleSkipLinkClick}
        ref={skipLinkRef}
      >
        Skip to main content
      </a>

      {/* ========== NAVIGATION COMPONENT ========== */}
      <nav 
        className="navbar" 
        role="navigation" 
        aria-label="Main navigation"
        ref={navRef}
      >
        {/* 🎯 BRAND LOGO */}
        <div className="logo">YouTube Advisor</div>

        {/* 🎯 MOBILE HAMBURGER MENU BUTTON */}
        <button 
          className="hamburger" 
          onClick={toggleMenu} 
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-nav-menu"
          aria-expanded={menuOpen}
          aria-haspopup="true"
        >
          <span aria-hidden="true">{menuOpen ? '✖' : '☰'}</span>
        </button>

        {/* 🎯 NAVIGATION LINKS */}
        <ul 
          id="mobile-nav-menu" 
          className={`nav-links ${menuOpen ? 'active' : ''}`} 
          role="menubar"
          ref={menuRef}
        >
          <li role="none">
            <NavLink 
              to="/" 
              onClick={handleNavLinkClick} 
              role="menuitem"
              aria-current={window.location.pathname === '/' ? 'page' : undefined}
            >
              Home
            </NavLink>
          </li>
          <li role="none">
            <NavLink 
              to="/content-safety" 
              onClick={handleNavLinkClick} 
              role="menuitem"
              aria-current={window.location.pathname === '/content-safety' ? 'page' : undefined}
            >
              Content Safety
            </NavLink>
          </li>
          <li role="none">
            <NavLink 
              to="/contract-explainer" 
              onClick={handleNavLinkClick} 
              role="menuitem"
              aria-current={window.location.pathname === '/contract-explainer' ? 'page' : undefined}
            >
              Contract Explainer
            </NavLink>
          </li>
          <li role="none">
            <NavLink 
              to="/invoice-generator" 
              onClick={handleNavLinkClick} 
              role="menuitem"
              aria-current={window.location.pathname === '/invoice-generator' ? 'page' : undefined}
            >
              Invoice Generator
            </NavLink>
          </li>
          <li role="none">
            <NavLink 
              to="/ama" 
              onClick={handleNavLinkClick} 
              role="menuitem"
              aria-current={window.location.pathname === '/ama' ? 'page' : undefined}
            >
              Ask Me Anything
            </NavLink>
          </li>
          <li role="none">
            <NavLink 
              to="/policy-qa" 
              onClick={handleNavLinkClick} 
              role="menuitem"
              aria-current={window.location.pathname === '/policy-qa' ? 'page' : undefined}
            >
              Policy Q&A
            </NavLink>
          </li>
          
          {/* 🎯 THEME TOGGLE BUTTON */}
          <li role="none">
            <button 
              className="theme-toggle-nav" 
              onClick={() => { toggleTheme(); setMenuOpen(false); }} 
              title="Toggle theme"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* ========== MAIN CONTENT AREA ========== */}
      <main id="main-content" className="main-content" role="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/content-safety" element={<ContentSafetyAnalyzer />} />
          <Route path="/contract-explainer" element={<LegalContractAnalyzer />} />
          <Route path="/invoice-generator" element={<InvoiceGenerator />} />
          <Route path="/ama" element={<YouTubeAdvisorAMA />} />
          <Route path="/policy-qa" element={<YouTubePolicyQA />} />
          <Route path="/code-of-conduct" element={<CodeOfConduct />} />
          <Route path="/security" element={<SecurityPolicy />} />
          <Route path="/contributing" element={<Contributing />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </main>

      {/* ========== FOOTER COMPONENT ========== */}
      <Footer />
    </div>
  );
};

export default App;