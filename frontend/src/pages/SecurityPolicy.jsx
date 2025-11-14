import React from 'react';
import '../styles/CommonStyles.css';

const SecurityPolicy = () => {
  return (
    <div className="section-container">
      <div className="content-wrapper">
        <h3>🛡️ Security Policy</h3>
        
        <h4>📌 Supported Versions</h4>
        <p>We aim to keep <code>Rohit-youtube-Advocate-AiBot</code> up to date and secure. Please see below for the versions we currently support with security updates.</p>
        
        <table>
          <thead>
            <tr>
              <th>Version</th>
              <th>Supported</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Latest</td>
              <td>✅ Yes</td>
            </tr>
            <tr>
              <td>Older</td>
              <td>❌ No</td>
            </tr>
          </tbody>
        </table>
        
        <h4>📬 Reporting a Vulnerability</h4>
        <p>If you discover a security vulnerability, <strong>please do not open an issue</strong> on GitHub.</p>
        <p>Instead, follow these steps:</p>
        <ol>
          <li><strong>Email the maintainer directly</strong></li>
          <li>Include the following details:
            <ul>
              <li>Description of the vulnerability</li>
              <li>Steps to reproduce (if possible)</li>
              <li>Potential impact</li>
              <li>Any mitigation or workaround suggestions</li>
            </ul>
          </li>
        </ol>
        <p>⌛ We aim to respond to security reports <strong>within 72 hours</strong>.</p>
        
        <h4>🚫 Responsible Disclosure Guidelines</h4>
        <p>We ask that you:</p>
        <ul>
          <li>Do not publicly disclose the issue until it has been resolved.</li>
          <li>Avoid testing vulnerabilities in a way that could disrupt services.</li>
          <li>Act in good faith and with respect for user data and privacy.</li>
        </ul>
        
        <h4>📃 Disclosure Policy</h4>
        <p>We follow a <strong>coordinated disclosure</strong> approach.</p>
        <p>We appreciate responsible reporting and will publicly disclose the issue only <strong>after a fix has been released</strong>.</p>
        
        <h4>✅ Security Best Practices</h4>
        <p>While using this project, we recommend you:</p>
        <ul>
          <li>Always run software in a secure and isolated environment.</li>
          <li>Keep your dependencies up to date.</li>
          <li>Avoid sharing sensitive API keys or credentials in <code>.env</code> or other public files.</li>
        </ul>
        
        <h4>🙏 Acknowledgments</h4>
        <p>We value the contributions from the community and encourage responsible disclosure to help keep <code>Rohit-youtube-Advocate-AiBot</code> safe and secure for all users.</p>
        
        <h4>🔒 Resources</h4>
        <ul>
          <li><a href="https://docs.github.com/en/code-security/security-advisories">GitHub Security Advisories</a></li>
          <li><a href="https://bestpractices.dev/">OpenSSF Best Practices</a></li>
          <li><a href="https://owasp.org/www-project-top-ten/">OWASP Top 10</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SecurityPolicy;