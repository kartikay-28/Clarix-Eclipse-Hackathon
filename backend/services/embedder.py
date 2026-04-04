from sentence_transformers import SentenceTransformer

# Global embedder instance
_embedding_model = None

def load_embedding_model():
    """
    Loads the sentence-transformers model ONCE at startup.
    """
    global _embedding_model
    if _embedding_model is None:
        print("Loading embedding model (all-MiniLM-L6-v2)...")
        _embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        print("Embedding model loaded.")

def get_embedder() -> SentenceTransformer:
    """Returns the loaded global embedding model, loading it first if necessary."""
    if _embedding_model is None:
        load_embedding_model()
    return _embedding_model
