import os
from langchain_community.document_loaders import PDFPlumberLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from fastapi import UploadFile

pdfs_directory = 'pdfs/'

def upload_pdf(file: UploadFile) -> str:
    os.makedirs(pdfs_directory, exist_ok=True)
    file_path = os.path.join(pdfs_directory, file.filename)
    with open(file_path, "wb") as f:
        f.write(file.file.read())  # Use .file.read() for UploadFile
    return file_path

def load_pdf(file_path: str):
    loader = PDFPlumberLoader(file_path)
    documents = loader.load()
    return documents

def create_chunks(documents): 
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        add_start_index=True
    )
    text_chunks = text_splitter.split_documents(documents)
    return text_chunks
