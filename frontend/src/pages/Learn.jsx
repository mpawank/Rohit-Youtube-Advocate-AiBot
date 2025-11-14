import React from 'react';
import '../styles/CommonStyles.css';

const Learn = () => {
  return (
    <div className="section-container">
      <div className="content-wrapper">
        <h3>📘 LEARN.md - YouTube Legal Advisor Learning Hub</h3>
        <p>Welcome to the comprehensive learning and documentation center for the YouTube Legal Advisor project!</p>
        
        <h4>📚 Learning Notes & Knowledge Base</h4>
        <p>Document your learning journey and technical discoveries:</p>
        
        <h5>🔍 Key Concepts Documented</h5>
        <ul>
          <li><strong>Vector Database Operations</strong> - FAISS implementation for legal document search</li>
          <li><strong>RAG Pipeline Architecture</strong> - Retrieval-Augmented Generation for legal Q&A</li>
          <li><strong>API Integration Patterns</strong> - Flask/FastAPI backend with React frontend</li>
          <li><strong>Content Safety Analysis</strong> - Automated policy compliance checking</li>
        </ul>
        
        <h5>⚠️ Common Gotchas & Solutions</h5>
        <ul>
          <li>Vector embedding dimension mismatches</li>
          <li>CORS configuration for local development</li>
          <li>PDF text extraction encoding issues</li>
          <li>API rate limiting and error handling</li>
        </ul>
        
        <h5>📖 Learning Resources</h5>
        <ul>
          <li><a href="https://github.com/facebookresearch/faiss">FAISS Official Documentation</a></li>
          <li><a href="https://vitejs.dev/guide/">React + Vite Best Practices</a></li>
          <li><a href="https://flask.palletsprojects.com/">Flask API Development Guide</a></li>
        </ul>
        
        <h4>📝 Project Architecture Documentation</h4>
        <h5>🏗️ System Architecture Overview</h5>
        <p>The YouTube Legal Advisor is built with a modern, scalable architecture:</p>
        <ul>
          <li><strong>Frontend</strong>: React with Vite for fast development</li>
          <li><strong>Backend</strong>: Flask API server with Python</li>
          <li><strong>AI Components</strong>: Langchain with Groq for LLM integration</li>
          <li><strong>Vector Store</strong>: FAISS for efficient similarity search</li>
          <li><strong>Data Processing</strong>: PDF parsing and text extraction</li>
        </ul>
        
        <h5>🧩 Key Modules</h5>
        <ul>
          <li><strong>Contract Explainer</strong>: Simplifies complex legal documents</li>
          <li><strong>Content Safety Checker</strong>: Analyzes content for policy compliance</li>
          <li><strong>Invoice Generator</strong>: Creates professional invoices</li>
          <li><strong>Ask Me Anything</strong>: General Q&A with Rohit's knowledge base</li>
          <li><strong>Policy Q&A</strong>: YouTube policy-specific guidance</li>
        </ul>
        
        <h5>🔄 Data Flow</h5>
        <ol>
          <li>User submits request through React frontend</li>
          <li>Flask backend processes request</li>
          <li>Relevant documents retrieved from FAISS vector store</li>
          <li>Langchain orchestrates RAG pipeline</li>
          <li>Groq LLM generates response</li>
          <li>Response sent back to frontend</li>
        </ol>
      </div>
    </div>
  );
};

export default Learn;