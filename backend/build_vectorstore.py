# build_vectorstore.py
import fitz  # PyMuPDF
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings
import os

PDF_PATH = "YouTube-Community-Guidelines-August-2018.pdf"
VECTORSTORE_PATH = "vectorstore/db_faiss"
EMBED_MODEL = "nomic-embed-text"

# Step 1: Read text from PDF
print("📄 Reading PDF using PyMuPDF...")
doc = fitz.open(PDF_PATH)
full_text = "\n".join([page.get_text() for page in doc])

# Step 2: Split text into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", ".", " ", ""]
)
chunks = text_splitter.create_documents([full_text])
print(f"🧠 Total text chunks created: {len(chunks)}")

# Step 3: Generate embeddings and store in FAISS
embeddings = OllamaEmbeddings(model=EMBED_MODEL)
faiss_index = FAISS.from_documents(chunks, embeddings)
faiss_index.save_local(VECTORSTORE_PATH)
print(f"✅ FAISS vectorstore saved to: {VECTORSTORE_PATH}")
