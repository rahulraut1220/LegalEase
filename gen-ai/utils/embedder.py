from langchain_ollama import OllamaEmbeddings

def get_embedding_model(model_name):
    embeddings = OllamaEmbeddings(model=model_name)
    return embeddings
