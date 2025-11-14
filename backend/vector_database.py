"""
Vector Database Module for YouTube Legal Advisor AI Bot
=====================================================

This module provides core functionality for:
- Loading and managing FAISS vector databases
- Creating prompt chains for LLM interactions
- Processing various legal queries using RAG (Retrieval Augmented Generation)
- Handling contract simplification, content safety analysis, and invoice generation

The module uses LangChain components with Groq LLM and Ollama embeddings.
"""

# ==================== IMPORT STATEMENTS ====================
# Standard library and third-party imports organized for clarity
from langchain_groq import ChatGroq
from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
from pydantic import SecretStr
import os

# ==================== ENVIRONMENT SETUP ====================
# 🎯 Load environment variables from .env file
load_dotenv()

# ==================== APPLICATION CONFIGURATION ====================
# Configuration constants for the vector database system
FAISS_VECTOR_STORE_PATH = "vectorstore/db_faiss"           # Path to FAISS vector store
OLLAMA_EMBEDDINGS_MODEL = "deepseek-r1:1.5b"               # Embedding model identifier
GROQ_LLM_MODEL_NAME = "deepseek-r1-distill-llama-70b"      # LLM model for processing

# ==================== LLM INITIALIZATION ====================
# 🚀 Initialize LLM with enhanced configuration for optimal performance
api_key = os.getenv("GROQ_API_KEY")
llm_model = ChatGroq(
    api_key=SecretStr(api_key) if api_key else None,         # 🔐 API key from environment variables
    model=GROQ_LLM_MODEL_NAME,                 # 🧠 Model selection for processing
    temperature=0.2                            # 🎯 Low temperature for consistent outputs
)

# ==================== DATABASE LOADING FUNCTION ====================
def load_faiss_database():
    """
    📦 Initialize and load FAISS vector store with embeddings
    
    This function loads the pre-built FAISS vector database from disk
    and initializes it with the appropriate embedding engine.
    
    Returns:
        FAISS: Loaded vector database instance ready for similarity searches
        
    Raises:
        Exception: If database loading fails due to file or configuration issues
    """
    # 🎯 Initialize embedding engine with specified model
    embedding_engine = OllamaEmbeddings(model=OLLAMA_EMBEDDINGS_MODEL)
    
    # 🚀 Load FAISS database from persistent storage
    return FAISS.load_local(
        FAISS_VECTOR_STORE_PATH, 
        embeddings=embedding_engine, 
        allow_dangerous_deserialization=True      # ⚠️ Required for FAISS deserialization
    )

# ==================== DATABASE CONNECTION ====================
# 🔄 Initialize database connection at module level for reuse
vector_database = load_faiss_database()

# ==================== PROMPT CHAIN UTILITY ====================
def create_prompt_chain(prompt_template):
    """
    ⚙️ Create a processing chain from template to output
    
    This utility function creates a complete processing pipeline that:
    1. Formats the prompt template
    2. Processes it through the LLM
    3. Parses the output as a string
    
    Args:
        prompt_template (str): Template string with placeholders for dynamic content
        
    Returns:
        Chain: LangChain processing chain ready for execution
    """
    # 🎯 Create prompt structure from template
    prompt_structure = ChatPromptTemplate.from_template(prompt_template)
    
    # 🔄 Return processing chain: prompt -> LLM -> string parser
    return prompt_structure | llm_model | StrOutputParser()

# ==================== CONTRACT SIMPLIFICATION SERVICE ====================
def simplify_contract_text(contract_content):
    """
    📄 Simplify legal contract text for content creators
    
    Takes complex legal language and converts it to plain, understandable terms
    specifically tailored for YouTube content creators.
    
    Args:
        contract_content (str): Raw legal contract text to be simplified
        
    Returns:
        str: Simplified explanation of the contract terms and implications
    """
    # 📝 Template for contract simplification with clear structure
    contract_template = """
    Analyze and simplify the following contract text for content creators. 
    Provide clear, accurate, and concise explanations:

    Contract Content:
    {text}

    Simplified Analysis:
    """
    
    # ⚙️ Create processing chain for contract simplification
    processing_chain = create_prompt_chain(contract_template)
    
    # 🚀 Execute processing chain with provided content
    return processing_chain.invoke({"text": contract_content})

# ==================== CONTENT SAFETY ANALYSIS ====================
def analyze_content_safety(content_text):
    """
    🔍 Analyze content for YouTube policy compliance and safety
    
    Evaluates user content against YouTube's community guidelines and policies
    to identify potential violations or areas of concern.
    
    Args:
        content_text (str): Content to be analyzed for policy compliance
        
    Returns:
        str: Safety assessment with identified risks and recommendations
    """
    # 📋 Comprehensive safety analysis template
    safety_template = """
    Evaluate the following content for potential YouTube policy violations including:
    - Hate speech or harassment
    - Misinformation or false claims
    - Copyright infringement risks
    - Inappropriate or explicit material
    - Other community guideline violations

    Content to Analyze:
    {text}

    Safety Assessment:
    """
    
    # ⚙️ Create analysis chain for content safety evaluation
    analysis_chain = create_prompt_chain(safety_template)
    
    # 🚀 Execute safety analysis with provided content
    return analysis_chain.invoke({"text": content_text})

# ==================== PROFESSIONAL INVOICE GENERATION ====================
def create_professional_invoice(brand_name, service_description, amount_value, include_gst_tax):
    """
    🧾 Generate formatted invoice with optional GST calculation
    
    Creates a professional-looking invoice with standardized formatting
    and optional tax calculations for Indian Rupee transactions.
    
    Args:
        brand_name (str): Client/brand name for the invoice
        service_description (str): Description of services provided
        amount_value (float): Base amount for the services
        include_gst_tax (bool): Whether to include 18% GST in calculation
        
    Returns:
        str: Formatted invoice text ready for presentation or PDF conversion
    """
    # 🧮 Calculate GST and total amount if required
    gst_note = " (including 18% GST)" if include_gst_tax else ""
    total_amount = round(amount_value * 1.18, 2) if include_gst_tax else amount_value

    # 📄 Format invoice with professional layout
    invoice_template = f"""
    PROFESSIONAL INVOICE
    --------------------
    Client/Brand: {brand_name}
    Service Provided: {service_description}
    Total Amount: ₹{total_amount:.2f}{gst_note}
    
    Payment Terms: Due upon receipt
    Thank you for your business collaboration!
    """
    # 🎨 DEBUG: Invoice generated for {brand_name} - ₹{total_amount:.2f}
    return invoice_template

# ==================== YOUTUBE POLICY QUERY HANDLER ====================
def handle_policy_query(user_question):
    """
    📺 Process YouTube policy questions using RAG pipeline
    
    Uses Retrieval Augmented Generation to answer YouTube policy questions
    by retrieving relevant context from the vector database and generating
    accurate responses based on that context.
    
    Args:
        user_question (str): User's question about YouTube policies
        
    Returns:
        str: Expert response based on retrieved policy context
    """
    # 🔍 Retrieve relevant documents from vector database
    relevant_docs = vector_database.similarity_search(user_question)
    
    # 📚 Combine document contents for context
    context_data = "\n\n".join([doc.page_content for doc in relevant_docs])

    # 📋 Policy expert response template
    policy_template = """
    You are a YouTube policy expert. Use the provided context to answer the user's question accurately.
    Base your response strictly on the available information without speculation.

    User Question: {question}
    Policy Context:
    {context}

    Expert Response:
    """
    
    # ⚙️ Create policy response chain
    policy_chain = create_prompt_chain(policy_template)
    
    # 🚀 Generate response using retrieved context
    return policy_chain.invoke({"question": user_question, "context": context_data})

# ==================== LEGAL ASSISTANT QUERY HANDLER ====================
def process_legal_assistant_query(user_query):
    """
    💬 Handle general legal questions for content creators using RAG
    
    Processes general legal inquiries from content creators using the
    Retrieval Augmented Generation pipeline with Rohit Advocate persona.
    
    Args:
        user_query (str): Creator's legal question to be answered
        
    Returns:
        str: Personalized legal assistance response
    """
    # 🔍 Retrieve relevant legal documents from vector database
    retrieved_documents = vector_database.similarity_search(user_query)
    
    # 📚 Compile context from retrieved documents
    document_context = "\n\n".join([doc.page_content for doc in retrieved_documents])

    # 📋 Legal assistant response template with persona
    assistant_template = """
    You are Rohit Advocate, a legal AI assistant specializing in YouTube and content creator legal matters.
    Provide helpful, accurate responses based on the available legal context.

    Creator Question: {question}
    Legal Context:
    {context}

    Assistant Response:
    """
    
    # ⚙️ Create assistant response chain
    assistant_chain = create_prompt_chain(assistant_template)
    
    # 🚀 Generate personalized legal response
    return assistant_chain.invoke({"question": user_query, "context": document_context})

# ==================== MONITORING AND LOGGING UTILITIES ====================
def log_processing_status(function_name, status="completed"):
    """
    📊 Log processing status for monitoring purposes
    
    Provides lightweight logging for tracking function execution status
    during development and debugging phases.
    
    Args:
        function_name (str): Name of the function being tracked
        status (str): Execution status (default: "completed")
        
    Returns:
        bool: Always returns True for successful logging
    """
    # 🎨 Print formatted status message for monitoring
    print(f"[📊] {function_name} execution {status}")
    
    # 🎯 TODO: Replace with structured logging in production
    # Enhancement idea: Integrate with centralized logging system
    return True

# ==================== FUTURE ENHANCEMENT PLACEHOLDER ====================
def future_enhancement_placeholder():
    """
    🎯 Placeholder function for future enhancements
    
    This function is intentionally left empty for future implementation.
    Possible future uses:
    - Advanced analytics and reporting
    - Multi-language support expansion
    - Enhanced caching mechanisms
    - Performance optimization hooks
    """
    # 🎯 Reserved for future implementation
    # TODO: Implement advanced features when requirements are defined
    pass

# ==================== MODULE INITIALIZATION ====================
# 🚀 Module initialization complete with vector database loaded
# 🎯 Ready to process legal queries for YouTube content creators

# Create aliases for backward compatibility with app.py
get_policy_response = handle_policy_query
simplify_contract = simplify_contract_text
check_content_safety = analyze_content_safety
generate_invoice = create_professional_invoice
ask_rohit = process_legal_assistant_query