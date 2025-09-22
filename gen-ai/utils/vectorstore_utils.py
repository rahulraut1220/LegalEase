from langchain_community.vectorstores import FAISS
from utils.embedder import get_embedding_model

def create_vector_store(db_faiss_path, text_chunks, ollama_model_name):
    faiss_db = FAISS.from_documents(text_chunks, get_embedding_model(ollama_model_name))
    faiss_db.save_local(db_faiss_path)
    return faiss_db
