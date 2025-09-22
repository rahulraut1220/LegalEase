import os
from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from utils.loader import upload_pdf, load_pdf, create_chunks
from utils.vectorstore_utils import create_vector_store
from utils.inference import get_llm, retrieve_docs, answer_query

load_dotenv()

app = FastAPI()

# Enable CORS (optional for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

FAISS_DB_PATH = "vectorstore/db_faiss"
OLLAMA_MODEL = "deepseek-r1:1.5b"
pdfs_directory = "pdfs"

@app.post("/upload-and-ask/")
async def upload_and_ask(file: UploadFile = File(...), question: str = Form(...)):
    try:
        # Upload and read PDF
        file_path = upload_pdf(file)
        documents = load_pdf(file_path)
        chunks = create_chunks(documents)

        # Create vector store and answer
        faiss_db = create_vector_store(FAISS_DB_PATH, chunks, OLLAMA_MODEL)
        llm = get_llm()
        docs = retrieve_docs(faiss_db, question)
        answer = answer_query(docs, llm, question)

        return {"question": question, "answer": answer}

    except Exception as e:
        return {"error": str(e)}
