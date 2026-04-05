import os
import google.generativeai as genai

# Configure Google Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

class GeminiEmbedderProxy:
    """
    A lightweight proxy class to replace 'sentence-transformers' locally.
    Uses Google's free embedding API, which completely stops the 
    Render Out-of-Memory (OOM) 512MB RAM server crashes.
    """
    def __init__(self):
        # Using the older embedding-001 model string which is guaranteed 
        # to exist in google-generativeai==0.3.2
        self.model_name = 'models/embedding-001'

    def encode(self, texts, convert_to_numpy=False):
        # Allow both single string or list of strings
        content_to_embed = texts if isinstance(texts, list) else [texts]
        
        # Batch size for Gemini API embeddings is max 100 texts at a time, we will just send it normally
        # but robust enough to handle the array.
        result = genai.embed_content(
            model=self.model_name,
            content=content_to_embed
        )
        
        # Return either a single list of floats, or a numpy-like array of lists
        class MockNumpyResult:
            def __init__(self, data):
                self.data = data
            def tolist(self):
                return self.data
                
        embeddings = result['embedding']
        # If the input was a single string, SentenceTransformers normally returns a flat array
        # Gemini returns a list of embeddings.
        if isinstance(texts, str):
            return MockNumpyResult(embeddings[0])
        else:
            return MockNumpyResult(embeddings)

def load_embedding_model():
    print("Embedding model proxy loaded (Gemini API).")

def get_embedder():
    return GeminiEmbedderProxy()
