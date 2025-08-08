import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContractExplainer from "./components/ContractExplainer";
import ContentSafetyChecker from "./components/ContentSafetyChecker";
import InvoiceGenerator from "./components/InvoiceGenerator";
import AMA from "./components/AMA";
import YouTubePolicyQA from "./components/YouTubePolicyQA";
import LandingPage from "./components/LandingPage";
import "./styles/Navbar.css";
import "./styles/LandingPage.css";

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <nav className="navbar">
          <div className="logo">YouTube Advisor</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>

            <li><Link to="/content-safety">Content Safety</Link></li>
            <li><Link to="/contract-explainer">Contract Explainer</Link></li>
            <li><Link to="/invoice-generator">Invoice Generator</Link></li>
            <li><Link to="/ama">Ask Me Anything</Link></li>
            <li><Link to="/policy-qa">Policy Q&A</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/content-safety" element={<ContentSafetyChecker />} />
            <Route path="/contract-explainer" element={<ContractExplainer />} />
            <Route path="/invoice-generator" element={<InvoiceGenerator />} />
            <Route path="/ama" element={<AMA />} />
            <Route path="/policy-qa" element={<YouTubePolicyQA />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
