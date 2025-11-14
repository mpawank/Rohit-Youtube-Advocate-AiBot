import React from 'react';
import '../styles/CommonStyles.css';

const Contributing = () => {
  return (
    <div className="section-container">
      <div className="content-wrapper">
        <h3>Contributing to Rohit-YouTube-Advocate-AiBot</h3>
        <p>🙏 First off, thanks for taking the time to contribute!<br />
        We welcome all contributors, especially during <strong>GSSoC'25</strong>. Whether you're fixing a bug, adding a feature, improving documentation, or helping others — you are amazing. 💙</p>
        
        <h4>📋 How to Get Started</h4>
        <ol>
          <li><strong>Fork</strong> this repository</li>
          <li><strong>Clone</strong> your forked repo
            <pre><code>git clone https://github.com/YOUR_USERNAME/Rohit-Youtube-Advocate-AiBot.git</code></pre>
          </li>
          <li><strong>Create a branch</strong>
            <pre><code>git checkout -b feature/your-feature-name</code></pre>
          </li>
          <li><strong>Install dependencies</strong>
            <pre><code>pip install -r requirements.txt</code></pre>
          </li>
          <li><strong>Make your changes, test, and commit</strong>
            <pre><code>git commit -m "Add: [your meaningful message]"</code></pre>
          </li>
          <li><strong>Push to your fork and open a Pull Request</strong>
            <pre><code>git push origin feature/your-feature-name</code></pre>
          </li>
        </ol>
        
        <h4>🏷️ PR Guidelines</h4>
        <ul>
          <li>PR title should be meaningful: <code>Fix: UI bug on home</code>, <code>Add: YouTube API wrapper</code></li>
          <li>Link the issue number using: <code>Fixes #&lt;issue-number&gt;</code></li>
          <li>Mention if it's a GSSoC'25 contribution in the PR body</li>
          <li>Attach screenshots/gifs for UI changes</li>
          <li>Ensure code is clean and readable</li>
        </ul>
        
        <h4>🐞 How to Report a Bug</h4>
        <p>Check if the issue already exists</p>
        <p>Open a new issue with:</p>
        <ul>
          <li>Clear title</li>
          <li>Steps to reproduce</li>
          <li>Screenshots (if applicable)</li>
          <li>Expected vs actual behavior</li>
        </ul>
        
        <h4>🌟 Good First Issues</h4>
        <p>Check the issues labeled good first issue.<br />
        We welcome beginner-friendly contributions!</p>
        
        <h4>👩‍💻 Development Guidelines</h4>
        <ul>
          <li>Follow consistent coding style (Prettier/ESLint if set)</li>
          <li>Keep components modular</li>
          <li>Reuse utility functions and maintain folder structure</li>
          <li>Write meaningful commit messages</li>
        </ul>
        
        <h4>🤝 Community & Communication</h4>
        <ul>
          <li>Join discussions on the GSSoC Discord or GitHub Discussions</li>
          <li>Respect each other and follow the Code of Conduct</li>
          <li>If in doubt, open an issue or ask before making large changes</li>
        </ul>
        
        <h4>📫 Need Help?</h4>
        <p>Open an issue or contact:</p>
        <p>Project Admin: M Pawan Kumar</p>
        <p>📧 <strong>Email</strong>: mpawankumar356@gmail.com</p>
        <p>🔗 <strong>GitHub</strong>: <a href="https://github.com/mpawank">@mpawank</a></p>
        <p>Happy Contributing 🚀<br />
        Made with ❤️ for GSSoC'25</p>
      </div>
    </div>
  );
};

export default Contributing;