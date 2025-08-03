import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Load environment variables from .env
load_dotenv()

# Constants
FAISS_DB_PATH = "vectorstore/db_faiss"
OLLAMA_MODEL_NAME = "nomic-embed-text"
GROQ_MODEL = "deepseek-r1-distill-llama-70b"

# ✅ Setup Groq LLM with high max tokens to avoid incomplete output
llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model_name=GROQ_MODEL,
    temperature=0.2,
    max_tokens=4096  # allow longer answers
)

# ✅ Load FAISS vector DB with Ollama embeddings
def load_faiss():
    embeddings = OllamaEmbeddings(model=OLLAMA_MODEL_NAME)
    return FAISS.load_local(
        FAISS_DB_PATH,
        embeddings=embeddings,
        allow_dangerous_deserialization=True
    )

db = load_faiss()

# ✅ Helper: Build prompt chain with parsing
def get_chain(template: str):
    prompt = ChatPromptTemplate.from_template(template)
    return prompt | llm | StrOutputParser()

# ✅ Helper: Concatenate context up to max char limit
def get_context(docs, max_chars=2800):  # leaves space for LLM response
    combined = "\n\n".join([doc.page_content for doc in docs])
    return combined[:max_chars].strip()

# ✅ Function: Simplify contract
def simplify_contract(text: str) -> str:
    template = """
    You are a legal assistant. Simplify this contract in plain English, highlighting responsibilities and rights.

    Contract:
    {text}

    Simplified Summary:
    """
    return get_chain(template).invoke({"text": text})

# ✅ Function: Content safety moderation
def check_content_safety(text: str) -> str:
    template = """
    Review the following text and identify any content violations for YouTube such as hate speech, harassment, nudity, violence, or copyright issues.

    Content:
    {text}

    Safety Report:
    """
    return get_chain(template).invoke({"text": text})

# ✅ Function: Invoice Generator
def generate_invoice(brand, service, amount, include_gst):
    gst_note = " (includes 18% GST)" if include_gst else ""
    total_amount = round(amount * 1.18, 2) if include_gst else amount

    return f"""
    INVOICE
    -----------------------
    Brand/Sponsor: {brand}
    Service Provided: {service}
    Total Amount: ₹{total_amount:.2f}{gst_note}
    -----------------------
    Thank you for your collaboration!
    """

# ✅ RAG Function: YouTube Policy Q&A
def get_policy_response(question: str) -> str:
    docs = db.similarity_search(question, k=5)
    context = get_context(docs)

    if not context:
        return "⚠️ No relevant context found. Try rephrasing your question."

    template = """
    You are a legal AI assistant trained on YouTube's community guidelines.
    Use the following context to answer the user's question precisely and clearly.
    Do NOT make up laws or hallucinate. Focus only on what's in the context.

    Question: {question}
    Context:
    {context}

    Answer:
    """
    return get_chain(template).invoke({"question": question, "context": context})

# ✅ RAG Function: Ask Rohit Anything
def ask_rohit(question: str) -> str:
    docs = db.similarity_search(question, k=4)
    context = get_context(docs)

    if not context:
        return "⚠️ No context available to answer this. Please reword the question."

    template = """
    You're Rohit, an expert AI on YouTube legal policy.
    Answer the user's question clearly using only the provided context.

    Question: {question}
    Context:
    {context}

    Answer:
    """
    return get_chain(template).invoke({"question": question, "context": context})
