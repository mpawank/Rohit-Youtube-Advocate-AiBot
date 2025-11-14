import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/Footer.css';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would connect to a backend service
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`footer ${theme}`} role="contentinfo">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>YouTube Advisor AiBot</h3>
            <p>Your AI-powered guide for YouTube content creation, monetization, and policy compliance.</p>
            <div className="newsletter-section">
              <h4>Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="subscribe-button">
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <p className="subscription-success">Thank you for subscribing!</p>
              )}
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="https://www.youtube.com/yt/about/policies/" target="_blank" rel="noopener noreferrer">YouTube Policies</a></li>
              <li><a href="https://creatoracademy.youtube.com/" target="_blank" rel="noopener noreferrer">Creator Academy</a></li>
              <li><a href="https://github.com/rohit-youtube-advocate" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="mailto:contact@youtube-advisor.com" aria-label="Send email to contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Tools</h4>
            <ul>
              <li><a href="/content-safety">Content Safety Checker</a></li>
              <li><a href="/contract-explainer">Contract Explainer</a></li>
              <li><a href="/invoice-generator">Invoice Generator</a></li>
              <li><a href="/ama">Ask Me Anything</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="/code-of-conduct">Code of Conduct</a></li>
              <li><a href="/security">Security Policy</a></li>
              <li><a href="/contributing">Contributing</a></li>
              <li><a href="/learn">Learn</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://twitter.com/rohit_youtube" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
              <a href="https://linkedin.com/in/rohit-youtube-advocate" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
              <a href="https://youtube.com/@rohit-advocate" target="_blank" rel="noopener noreferrer" aria-label="YouTube">📺</a>
              <a href="https://github.com/rohit-youtube-advocate" target="_blank" rel="noopener noreferrer" aria-label="GitHub">💻</a>
            </div>
          </div>
          
          {/* Newsletter Subscription Section */}
          <div className="footer-section">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest YouTube policy updates and tips.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form" aria-label="Newsletter subscription form">
              <label htmlFor="email-input" className="sr-only">Email address</label>
              <input
                type="email"
                id="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                aria-required="true"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button" aria-label="Subscribe to newsletter">
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            {isSubscribed && (
              <p className="subscription-success" role="alert">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} YouTube Advisor AiBot. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <button onClick={scrollToTop} className="back-to-top">
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;