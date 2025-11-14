import os
from dotenv import load_dotenv

# LangChain / model imports
from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

# ==================== ENVIRONMENT & CONFIG ====================
load_dotenv()  # load .env file if present

# --- Constants (unified names) ---
FAISS_DB_PATH = "vectorstore/db_faiss"
OLLAMA_MODEL_NAME = "deepseek-r1:1.5b"
GROQ_MODEL_NAME = "deepseek-r1-distill-llama-70b"  # alternative: "deepseek-coder:6.7b-instruct"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

MODEL_CONFIG = {
    "temperature": 0.2,
    "max_tokens": 2048,
    "timeout": 30,
}

DEBUG_MODE = True

# ==================== VECTOR DATABASE OPERATIONS ====================

def initialize_vector_database(path: str = FAISS_DB_PATH):
    """Initialize Ollama embeddings and load FAISS vectorstore from local directory.

    Returns:
        FAISS vectorstore instance
    Raises:
        Exception: If loading fails
    """
    try:
        if DEBUG_MODE:
            print("🔧 Initializing Ollama embeddings with model:", OLLAMA_MODEL_NAME)
        embedding_model = OllamaEmbeddings(model=OLLAMA_MODEL_NAME)

        if DEBUG_MODE:
            print("🔧 Loading FAISS database from:", path)

        vector_db = FAISS.load_local(
            path,
            embeddings=embedding_model,
            allow_dangerous_deserialization=True,
        )

        if DEBUG_MODE:
            print("✅ FAISS vector database loaded successfully")

        return vector_db

    except Exception as e:
        print("❌ Failed to load FAISS vector database:", str(e))
        raise


# ==================== LLM SETUP & CONFIGURATION ====================

def configure_llm_model(api_key: str = GROQ_API_KEY, model_name: str = GROQ_MODEL_NAME):
    """Configure and return the Groq LLM instance.

    Performs a basic API key check and returns a ChatGroq instance.
    """
    if not api_key:
        # don't crash silently — inform the user and continue (tests or offline dev may not have key)
        print("⚠️  GROQ_API_KEY not found in environment variables. LLM calls will likely fail.")

    if DEBUG_MODE:
        print("🔧 Configuring Groq LLM with model:", model_name)

    llm = ChatGroq(
        api_key=api_key,
        model_name=model_name,
        temperature=MODEL_CONFIG.get("temperature", 0.2),
        # additional parameters like max_tokens/timeouts can be added here if supported
    )

    return llm


# ==================== CONTEXT PROCESSING ====================

def extract_document_context(retrieved_docs):
    """Combine page content from multiple documents into a single context string."""
    if not retrieved_docs:
        return ""
    context = "\n\n".join([getattr(doc, "page_content", str(doc)) for doc in retrieved_docs])

    if DEBUG_MODE:
        print(f"📊 Retrieved {len(retrieved_docs)} documents for context")
        print(f"📝 Context length: {len(context)} characters")

    return context


# ==================== PROMPT TEMPLATE SYSTEM ====================

LEGAL_ASSISTANT_PROMPT = """
You are a specialized legal AI assistant designed to help content creators understand complex contracts by translating legal jargon into clear, plain English. Use only the information provided in the contract text. Do not make assumptions or generate legal advice beyond the given context. Always respond in a **professional, assertive tone** and ensure **complete legal clarity** while simplifying complex terms.

**Required Response Format:**
Contract Summary:
- Provide a high-level overview explaining the contract's purpose and main focus areas.

Key Legal Terms Explained:
- Break down important terms, rights, obligations, timelines, financial clauses, ownership details, or penalties.
- Highlight any sections requiring special attention (exclusivity clauses, indemnity provisions, automatic renewal terms).

Simplified Plain English Version:
- Rewrite the entire clause or section using simple, everyday language while preserving all legal meaning and intent.

---
Now process the following contract text using the same structured approach:

User Question: {question}
Retrieved Context: {context}

Assistant Response:
"""


# ==================== RAG PIPELINE EXECUTION ====================

def process_legal_query(llm_instance, vector_database, user_query: str):
    """Process a user query using a RAG pipeline and return the LLM response.

    Args:
        llm_instance: Initialized LLM (ChatGroq)
        vector_database: FAISS vectorstore instance
        user_query: The user's question about the contract

    Returns:
        Model-generated response string
    """
    # Retrieve similar documents (you can pass a k parameter if desired)
    try:
        retrieved_documents = []
        if vector_database is not None:
            retrieved_documents = vector_database.similarity_search(user_query)
        else:
            if DEBUG_MODE:
                print("⚠️  No vector database provided; proceeding without retrieved context.")

        document_context = extract_document_context(retrieved_documents)

        prompt_template = ChatPromptTemplate.from_template(LEGAL_ASSISTANT_PROMPT)
        rag_chain = prompt_template | llm_instance

        if DEBUG_MODE:
            print("🔧 Executing RAG pipeline...")
            print("📝 Query:", user_query)

        # invoke the chain
        return rag_chain.invoke({"question": user_query, "context": document_context})

    except Exception as e:
        print("❌ Error while processing legal query:", str(e))
        raise


# ==================== MAIN EXECUTION BLOCK ====================
if __name__ == "__main__":
    try:
        print("[🔧] Initializing FAISS vector database...")
        vector_db = None
        try:
            vector_db = initialize_vector_database()
        except Exception:
            print("[!] Continuing without a vector DB. You can still run local tests but RAG will be disabled.")

        print("[⚙️] Configuring Groq LLM model...")
        groq_llm = configure_llm_model()

        user_question = input("Enter your legal contract question: ")

        print("[💭] Processing your legal query...\n")
        ai_response = process_legal_query(groq_llm, vector_db, user_question)

        print("\n💡 Legal Assistant Response:\n", ai_response)

        # Additional logging for debugging purposes
        print(f"\n[📊] Query processing completed for: '{user_question[:50]}...'")

    except KeyboardInterrupt:
        print("\nExecution cancelled by user.")
    except Exception as main_e:
        print("Unexpected error in main execution:", str(main_e))
