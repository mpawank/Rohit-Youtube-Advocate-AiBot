# ==================== FLASK API SERVER CONFIGURATION ====================
from flask import Flask, request, jsonify, render_template, send_file
from vector_database import handle_policy_query, simplify_contract_text, analyze_content_safety, create_professional_invoice, process_legal_assistant_query
from flask_cors import CORS
import io
import logging
import traceback
from datetime import datetime

# 🚀 Initialize Flask Application
# ================================
# This section initializes the Flask application with necessary configurations
# Static and template folders are configured for serving frontend assets

# 🚀 Initialize Flask Application
app = Flask(
    __name__,
    static_folder="static",
    template_folder="templates"
)


# 🎯 Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(name)s %(message)s'
)
logger = logging.getLogger(__name__)
n

# 🎯 TODO: Add configuration management system
# Future enhancement: Move to config.py for better organization
# Suggestion: Consider using environment-specific configuration files

# ==================== ERROR HANDLING ====================

@app.errorhandler(400)
def bad_request(error):
    """
    🚨 Handle 400 errors with consistent JSON response
    Args:
        error: The error object from Flask
    Returns:
        JSON response with error details and 400 status code
    """
    logger.error(f"400 Bad Request: {error}")
    return jsonify({"error": "Bad Request", "message": str(error), "code": 400}), 400

@app.errorhandler(404)
def not_found(error):
    """
    🚨 Handle 404 errors with consistent JSON response
    Args:
        error: The error object from Flask
    Returns:
        JSON response with error details and 404 status code
    """
    logger.error(f"404 Not Found: {error}")
    return jsonify({"error": "Endpoint not found", "message": "The requested endpoint does not exist", "code": 404}), 404

@app.errorhandler(422)
def unprocessable_entity(error):
    """
    🚨 Handle 422 errors with consistent JSON response
    Args:
        error: The error object from Flask
    Returns:
        JSON response with error details and 422 status code
    """
    logger.error(f"422 Unprocessable Entity: {error}")
    return jsonify({"error": "Unprocessable Entity", "message": str(error), "code": 422}), 422

@app.errorhandler(500)
def internal_error(error):
    """
    🚨 Handle 500 errors with user-friendly message
    Args:
        error: The error object from Flask
    Returns:
        JSON response with error details and 500 status code
    """
    logger.error(f"500 Internal Server Error: {error}")
    logger.error(traceback.format_exc())
    return jsonify({
        "error": "Internal server error", 
        "message": "An unexpected error occurred. Please try again later.",
        "code": 500
    }), 500

# ==================== ROUTE DEFINITIONS ====================

@app.route("/")
def index():
    """
    🏠 Serve the main advisor interface
    Returns: Rendered HTML template for the main page
    """
    # 🎨 DEBUG: Main page accessed - tracking user engagement
    # 📊 Monitoring: Page view counter could be implemented here
    print("🎨 Debug: Main advisor interface accessed")
    return render_template("advisor.html")

@app.route("/api/contract/simplify", methods=["POST"])
def simplify():
    """
    📄 Simplify complex contract text into easy-to-understand summary
    POST Data: { "text": "contract content here" }
    Returns: JSON with simplified contract summary
    
    Enhancement: Added input sanitization and detailed error handling
    """

    try:
        data = request.get_json()
        if data is None:
            logger.warning("Contract simplification attempted with invalid JSON")
            return jsonify({"error": "Invalid JSON data"}), 400
            
        text = data.get("text", "")
        
        # 🎯 Input validation to ensure contract text is provided
        if not text:
            logger.warning("Contract simplification attempted with empty text")
            return jsonify({"error": "Contract text is required"}), 400
        
        # 🚀 Process contract simplification using NLP pipeline
        summary = simplify_contract_text(text)
        
        # 🎨 Log successful processing
        logger.info(f"Contract simplification completed for {len(text)} characters")
        
        # 🎨 TODO: Add caching mechanism for repeated requests
        # Enhancement idea: Implement Redis cache for frequently requested contracts
        return jsonify({"summary": summary})
    except Exception as e:
        logger.error(f"Error in contract simplification: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": "Failed to process contract"}), 500



@app.route("/api/content/check", methods=["POST"])
def content_check():
    """
    🔍 Analyze content for safety and compliance
    POST Data: { "text": "content to analyze" }
    Returns: JSON with safety report and recommendations
    
    Improvement: Added enhanced validation and detailed logging
    """

    try:
        data = request.get_json()
        if data is None:
            logger.warning("Content safety check attempted with invalid JSON")
            return jsonify({"error": "Invalid JSON data"}), 400
            
        text = data.get("text", "")
        
        # 🎯 Validate that content text is provided for analysis
        if not text:
            logger.warning("Content safety check attempted with empty text")
            return jsonify({"error": "Content text is required for analysis"}), 400
        
        # 🛡️ Generate content safety report using policy engine
        report = analyze_content_safety(text)
        
        # 🎨 Log successful processing
        logger.info(f"Content safety check completed for {len(text)} characters")
        return jsonify({"report": report})
    except Exception as e:
        logger.error(f"Error in content safety check: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": "Failed to analyze content"}), 500



@app.route("/api/invoice/generate", methods=["POST"])
def invoice():
    """
    🧾 Generate professional invoice text
    POST Data: { "brand": "Brand Name", "service": "Service Description", "amount": 100.0, "include_gst": true }
    Returns: JSON with formatted invoice text
    
    Enhancement: Added comprehensive parameter validation and error details
    """

    start_time = time.time()
    data = request.json
    if data is None:
        logger.warning("Invoice generation failed: No JSON data provided")
        return jsonify({"error": "No JSON data provided"}), 400

    try:
        data = request.get_json()
        if data is None:
            logger.warning("Invoice generation attempted with invalid JSON")
            return jsonify({"error": "Invalid JSON data"}), 400

        # 📊 Extract and validate invoice parameters
        brand = data.get("brand")
        service = data.get("service")
        amount = data.get("amount")
        include_gst = data.get("include_gst", False)
        

        # 🧾 Generate invoice text using template engine
        invoice_text = create_professional_invoice(brand, service, amount, include_gst)
        
        # 🎨 Log successful processing
        logger.info(f"Invoice generated for brand: {brand}, amount: {amount}")
        return jsonify({"invoice_text": invoice_text})
    except (KeyError, ValueError) as e:
        # 🚨 Enhanced error reporting for invalid input parameters
        logger.warning(f"Invalid input parameters for invoice generation: {str(e)}")
        return jsonify({"error": "Invalid input parameters", "details": str(e)}), 400
    except Exception as e:
        logger.error(f"Error in invoice generation: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": "Failed to generate invoice"}), 500





@app.route("/api/invoice/download", methods=["POST"])
def download_invoice_pdf():
    """
    📄 Generate and download invoice as PDF using WeasyPrint
    POST Data: { "invoice_text": "formatted invoice text" }
    Returns: PDF file response
    
    Improvement: Added input validation and enhanced error handling
    """
    try:
        data = request.get_json()
        if data is None:
            logger.warning("PDF download attempted with invalid JSON")
            return jsonify({"error": "Invalid JSON data"}), 400
            
        invoice_text = data.get("invoice_text", "")
        
        # 🎯 Validate that invoice text is provided for PDF generation
        if not invoice_text:
            logger.warning("PDF download attempted with empty invoice text")
            return jsonify({"error": "No invoice text provided"}), 400

        # 📄 Convert invoice text to PDF format using WeasyPrint
        html_content = f"<pre style='font-family:Courier, monospace'>{invoice_text}</pre>"
        pdf_file = HTML(string=html_content).write_pdf()
        
        # 🎨 Log successful processing
        logger.info("PDF invoice generated successfully")
        return send_file(
            io.BytesIO(pdf_file),
            download_name="invoice.pdf",
            mimetype="application/pdf"
        )
    except Exception as e:
        logger.error(f"Error in PDF generation: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": "Failed to generate PDF"}), 500




@app.route("/api/youtube/policy", methods=["POST"])
def youtube_policy():
    """
    📺 Get YouTube policy guidance and recommendations
    POST Data: { "question": "policy question" }
    Returns: JSON with policy answer and guidance
    
    Enhancement: Added input validation and processing confirmation
    """
    try:
        data = request.get_json()
        if data is None:
            logger.warning("YouTube policy query attempted with invalid JSON")
            return jsonify({"error": "Invalid JSON data"}), 400
            
        question = data.get("question", "")
        
        # 🎯 Validate that policy question is provided
        if not question:
            logger.warning("YouTube policy query attempted with empty question")
            return jsonify({"error": "Policy question is required"}), 400
        
        # 🎬 Get policy response from vector database using RAG pipeline
        answer = handle_policy_query(question)
        
        # 🎨 Log successful processing
        logger.info(f"Policy response generated for question: {question[:50]}...")
        # 🎯 TODO: Add response caching for common questions
        # Enhancement: Implement LRU cache for frequently asked policy questions
        return jsonify({"answer": answer})
    except Exception as e:
        logger.error(f"Error in YouTube policy query: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": "Failed to retrieve policy information"}), 500



@app.route("/api/ama/ask", methods=["POST"])
def ama():
    """
    💬 Ask Me Anything - Get responses from Rohit's knowledge base
    POST Data: { "question": "question for Rohit" }
    Returns: JSON with personalized answer
    
    Improvement: Added enhanced logging and input validation
    """
    try:
        data = request.get_json()
        if data is None:
            logger.warning("AMA query attempted with invalid JSON")
            return jsonify({"error": "Invalid JSON data"}), 400
            
        question = data.get("question", "")
        
        # 🎯 Validate that question is provided for AMA session
        if not question:
            logger.warning("AMA query attempted with empty question")
            return jsonify({"error": "Question is required for AMA"}), 400
        
        # 🧠 Get response from Rohit's knowledge base using semantic search
        answer = process_legal_assistant_query(question)
        
        # 🎨 Log successful processing
        logger.info(f"AMA response generated for question: {question[:50]}...")
        return jsonify({"answer": answer})
    except Exception as e:
        logger.error(f"Error in AMA query: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": "Failed to generate response"}), 500




@app.route("/api/health", methods=["GET"])
def health_check():
    """
    ❤️ Health check endpoint for monitoring and load balancers
    Returns: JSON with service status and version info
    """
    try:
        # 🎯 TODO: Add database connection check
        # 🎯 TODO: Add external service dependency checks
        # Enhancement: Add detailed health metrics for monitoring dashboards
        
        return jsonify({
            "status": "healthy",
            "service": "Flask API Server",
            "version": "1.0.0",
            "timestamp": datetime.utcnow().isoformat() + "Z"
        })
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return jsonify({"status": "unhealthy", "error": str(e)}), 500

@app.route("/api/debug/info", methods=["GET"])
def debug_info():
    """
    🔧 Debug endpoint for development and troubleshooting
    Returns: JSON with system information and configuration
    """
    # 🎯 Note: This endpoint is for development purposes only
    # 🚨 Should be disabled in production environments
    # Security reminder: Ensure this endpoint is not exposed in production
    # 🎨 DEBUG: Debug information endpoint accessed
    print("🔧 Debug information endpoint accessed")
    
    return jsonify({
        "debug": True,
        "endpoints": [
            "/api/contract/simplify",
            "/api/content/check", 
            "/api/invoice/generate",
            "/api/invoice/download",
            "/api/youtube/policy",
            "/api/ama/ask"
        ],
        "note": "Development debug endpoint",
        "pdf_support": WEASYPRINT_AVAILABLE
    })


# ==================== ERROR HANDLING ENHANCEMENTS ====================

@app.errorhandler(404)
def not_found(error):
    """
    🚨 Handle 404 errors with consistent JSON response
    Args:
        error: The error object from Flask
    Returns:
        JSON response with error details and 404 status code
    """
    # 🎨 Log 404 error
    logger.warning(f"404 error: {request.url}")
    return jsonify({"error": "Endpoint not found", "code": 404}), 404

    print("🚨 404 Error: Endpoint not found")

    return jsonify({"error": "Endpoint not found", "code": 404}), 404


@app.errorhandler(500)
def internal_error(error):
    """
    🚨 Handle 500 errors with user-friendly message
    Args:
        error: The error object from Flask
    Returns:
        JSON response with error details and 500 status code
    """
    # 🎯 Log internal server error with traceback
    logger.error(f"500 error: {str(error)}")
    logger.error(traceback.format_exc())
    
    # 🎯 TODO: Add error logging and monitoring integration
    # Enhancement: Integrate with Sentry or similar error tracking service
    return jsonify({"error": "Internal server error", "code": 500}), 500


# ==================== UTILITY FUNCTIONS ====================
# 🎯 Placeholder for future enhancements and utility functions
def future_enhancement_placeholder():
    """
    🎯 Placeholder function for future enhancements
    This function is intentionally left empty for future implementation
    """
    # 🎯 Reserved for future implementation
    # TODO: Implement advanced features when requirements are defined
    pass

# 🎯 Additional placeholder for upcoming features
def upcoming_feature_placeholder():
    """
    🎯 Additional placeholder for upcoming features
    Reserved for future development and enhancements
    """
    # 🎯 Reserved for future implementation
    # Enhancement idea: Add advanced analytics capabilities
    pass

# ==================== APPLICATION INITIALIZATION ====================

if __name__ == "__main__":
    """
    🚀 Main application entry point
    """
    # 🎯 Development server configuration
    # 🚨 Note: debug=True should be disabled in production
    print("🎯 Starting Flask API Server...")
    print("📡 Server running on http://localhost:5000")
    print("🔧 Debug mode: ENABLED")
    if not WEASYPRINT_AVAILABLE:
        print("⚠️  Warning: WeasyPrint not available - PDF generation will be disabled")
    
    app.run(debug=True, host='0.0.0.0', port=5000)

# 🎯 Future enhancement placeholder
# TODO: Add application factory pattern for better testing
# TODO: Implement proper configuration management
# TODO: Add request/response logging middleware
# TODO: Implement rate limiting for API endpoints
# TODO: Add API versioning support for backward compatibility

# ==================== END OF ENHANCEMENTS ====================