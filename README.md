# YouTube Advocate AI Bot - Enhanced Error Handling

This repository contains an enhanced version of the YouTube Advocate AI Bot with improved error handling and user feedback mechanisms.

## Changes Made

### Backend Improvements

1. **Enhanced Error Handling in Flask API**:
   - Added custom `APIError` exception class for consistent error responses
   - Implemented comprehensive error handling for all API endpoints
   - Added proper validation for request payloads
   - Improved error messages with specific details
   - Added graceful degradation when optional dependencies are missing
   - Enhanced logging for debugging purposes

2. **API Endpoint Improvements**:
   - All endpoints now return consistent error responses
   - Better validation of input parameters
   - Improved error messages with actionable information
   - Added health check endpoint with service status information

### Frontend Improvements

1. **Enhanced POST Data Utility**:
   - Improved error handling in the `postData` utility function
   - Better parsing of error responses from the backend
   - Network error detection and handling
   - More informative error messages

2. **Component Error Handling**:
   - Updated `YouTubePolicyQA` component with comprehensive error handling
   - Updated `ContentSafetyChecker` component with consistent error handling
   - Updated `ContractExplainer` component with improved error feedback
   - Added visual error indicators and user-friendly error messages
   - Added helpful suggestions for common error scenarios

3. **Styling Improvements**:
   - Added consistent error message styling in `CommonStyles.css`
   - Created reusable CSS classes for error display
   - Added loading indicators with animations
   - Improved responsive design for error messages

## Key Features

### Backend Features
- **Consistent Error Responses**: All API endpoints return structured error responses
- **Input Validation**: Comprehensive validation of request payloads
- **Graceful Degradation**: Services continue to work even when optional dependencies are missing
- **Enhanced Logging**: Better error tracking and debugging capabilities
- **Health Monitoring**: Health check endpoint to monitor service status

### Frontend Features
- **User-Friendly Error Messages**: Clear, actionable error messages for users
- **Visual Error Indicators**: Distinct styling for error messages
- **Helpful Suggestions**: Contextual tips for resolving common issues
- **Loading States**: Visual feedback during API requests
- **Consistent UI**: Uniform error handling across all components
### Repository Structure

```
📁 bharat-bhakti-yatra/
├── 📁 .github/
│   ├── 📁 CODEOWNERS/
│   │   └── 📄 codeowners.md
│   ├── 📁 DEPENDABOTS/
│   │   └── 📄 dependabot.yml
│   ├── 📁 FUNDING/
│   │   └── 📄 FUNDING.yml
│   ├── 📁 ISSUE_TEMPLATE/
│   │   ├── 📄 bug_report.md
│   │   ├── 📄 config.yml
│   │   ├── 📄 documentation.md
│   │   ├── 📄 feature_request.md
│   │   ├── 📄 question.md
│   │   └── 📄 security_vulnerability.yml
│   ├── 📁 SUPPORT/
│   │   └── 📄 support.yml
│   └── 📁 workflows/
│       ├── 📄 autoComment-PrMerge.yml
│       ├── 📄 autoGithub-IssuePrTags.yml
│       ├── 📄 ContributorLeaderboard.yml
│       ├── 📄 issueReminder.yml
│       ├── 📄 PrReminder.yml
│       ├── 📄 SecurityCheck.yml
│       └── 📄 welcome.yml
├── 📁 Backend/
│   ├── 📁 config/
│   │   └── 📄 cors.js
│   ├── 📁 controllers/
│   │   └── 📄 auth.controller.js
│   ├── 📁 database/
│   │   └── 📄 connectDB.js
│   ├── 📁 meta/
│   │   ├── 📄 LayoutMetaData.jsx
│   │   └── 📄 metadata.json
│   ├── 📁 middlewares/
│   │   ├── 📄 asyncHandler.js
│   │   ├── 📄 email.config.js
│   │   ├── 📄 email.js
│   │   ├── 📄 emailTemplates.js
│   │   ├── 📄 globalErrorHandler.js
│   │   └── 📄 verifyToken.js
│   ├── 📁 models/
│   │   └── 📄 user.model.js
│   ├── 📁 routers/
│   │   └── 📄 auth.route.js
│   └── 📁 utils/
│       ├── 📄 ApiError.js
│       ├── 📄 ApiResponse.js
│       └── 📄 generateTokenAndSetCookie.js
│   ├── 📄 .env.sample
│   ├── 📄 .gitignore
│   ├── 📄 index.js
│   ├── 📄 package.json
│   └── 📄 pnpm-lock.yaml
├── 📁 Frontend/
│   ├── 📁 public/
│   │   ├── 📁 assets/
│   │   │   ├── 📁 authIcons/
│   │   │   │   ├── 📄 github.png
│   │   │   │   └── 📄 google.png
│   │   │   ├── 📁 hinduism/
│   │   │   │   ├── 📁 PrivacyPolicy/
│   │   │   │   │   └── 📄 image.png
│   │   │   │   ├── 📁 TermsAndCondition/
│   │   │   │   │   └── 📄 image2.jpg
│   │   │   │   ├── 📁 home/
│   │   │   │   │   ├── 📄 aarti.jpg
│   │   │   │   │   ├── 📄 festival.jpg
│   │   │   │   │   ├── 📄 image_temple_bg.jpg
│   │   │   │   │   └── 📄 prayer.jpg
│   │   │   │   └── 📄 OM.jpg
│   │   │   └── 📄 favicon.png
│   │   └── 📄 vite.svg
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 blog/
│   │   │   │   └── 📄 BlogWrapper.jsx
│   │   │   ├── 📁 common/
│   │   │   │   ├── 📄 Footer.jsx
│   │   │   │   ├── 📄 Header.jsx
│   │   │   │   └── 📄 Layout.jsx
│   │   │   ├── 📁 firebase/
│   │   │   │   └── 📄 firebaseConfig.jsx
│   │   │   ├── 📁 home/
│   │   │   │   ├── 📁 sections/
│   │   │   │   │   ├── 📄 CommunitySection.jsx
│   │   │   │   │   ├── 📄 FeatureCards.jsx
│   │   │   │   │   ├── 📄 HeroSection.jsx
│   │   │   │   │   ├── 📄 SacredRitualsSection.jsx
│   │   │   │   │   └── 📄 SacredVideosSection.jsx
│   │   │   │   └── 📄 HomeWrapper.jsx
│   │   │   ├── 📁 meta/
│   │   │   │   ├── 📄 LayoutMetaData.jsx
│   │   │   │   └── 📄 metadata.json
│   │   │   ├── 📁 ui/
│   │   │   │   ├── 📄 button.jsx
│   │   │   │   ├── 📄 card.jsx
│   │   │   │   ├── 📄 input.jsx
│   │   │   │   └── 📄 label.jsx
│   │   │   ├── 📁 users/
│   │   │   │   └── 📄 userProfile.jsx
│   │   │   ├── 📁 utils/
│   │   │   │   ├── 📄 date.js
│   │   │   │   ├── 📄 LoadingSpinner.jsx
│   │   │   │   └── 📄 PasswordStrengthMeter.jsx
│   │   │   ├── 📄 PrivacyPolicy.jsx
│   │   │   ├── 📄 Pujas.jsx
│   │   │   └── 📄 TermsAndConditions.jsx
│   │   ├── 📁 lib/
│   │   │   └── 📄 utils.js
│   │   ├── 📁 pages/
│   │   │   ├── 📁 auth/
│   │   │   │   ├── 📄 EmailVerificationPage.jsx
│   │   │   │   ├── 📄 ForgotPasswordPage.jsx
│   │   │   │   ├── 📄 Login.jsx
│   │   │   │   ├── 📄 ResetPasswordPage.jsx
│   │   │   │   └── 📄 Signup.jsx
│   │   │   └── 📄 Home.jsx
│   │   ├── 📁 store/
│   │   │   └── 📄 authStore.js
│   │   ├── 📁 styles/
│   │   │   ├── 📄 _mixins.scss
│   │   │   ├── 📄 _variables.scss
│   │   │   └── 📄 App.scss
│   │   ├── 📄 App.jsx
│   │   ├── 📄 index.css
│   │   └── 📄 main.jsx
│   ├── 📄 .gitignore
│   ├── 📄 components.json
│   ├── 📄 eslint.config.js
│   ├── 📄 index.html
│   ├── 📄 jsconfig.json
│   ├── 📄 package.json
│   ├── 📄 pnpm-lock.yaml
│   ├── 📄 postcss.config.mjs
│   ├── 📄 tailwind.config.js
│   ├── 📄 vercel.json
│   └── 📄 vite.config.js
├── 📄 .gitattributes
├── 📄 .gitignore
├── 📄 .prettierrc
├── 📄 CODE_OF_CONDUCT.md
├── 📄 CONTRIBUTING.md
├── 📄 LICENSE
├── 📄 README.md
└── 📄 SECURITY.md

## Installation

1. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. **Start the Backend**:
   ```bash
   cd backend
   python app.py
   ```

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

## API Endpoints

- `POST /api/contract/simplify` - Simplify legal contracts
- `POST /api/content/check` - Check content for policy compliance
- `POST /api/invoice/generate` - Generate professional invoices
- `POST /api/invoice/download` - Download invoices as PDF
- `POST /api/youtube/policy` - Get YouTube policy guidance
- `POST /api/ama/ask` - Ask questions to the AI assistant
- `GET /api/health` - Health check endpoint

## Error Handling

The application now provides detailed error messages for various scenarios:

- **Network Errors**: When the backend is unreachable
- **Validation Errors**: When input data is invalid
- **Service Unavailable**: When backend services are down
- **Processing Errors**: When there are issues processing requests

Each error message includes:
- A clear description of what went wrong
- An appropriate emoji indicator
- Contextual suggestions for resolving the issue

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
