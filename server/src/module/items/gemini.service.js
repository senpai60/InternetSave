import ENV_CONFIG from "../../common/config/env.config.js";

import { GoogleGenAI } from "@google/genai";

async function geminiEmbeddingService(text) {
  const ai = new GoogleGenAI({ apiKey: ENV_CONFIG.GEMINI_EMBEDDING_KEY });

  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
    // Ensure Gemini returns its native massive 3072 array to match your actual Pinecone Index
  });

  // Extract the raw float array cleanly
  return response.embeddings[0].values;
}

export default geminiEmbeddingService;
