import { Pinecone } from "@pinecone-database/pinecone";
import ENV_CONFIG from "../../common/config/env.config.js";

const PineConeService = new Pinecone({ apiKey: ENV_CONFIG.PINECONE_API_KEY });

try {
  await PineConeService.createIndex({
    name: "gemini-dense-3072-js",
    vectorType: "dense",
    dimension: 3072, // Gemini-embedding-001 strictly uses 3072 dimensions
    metric: "cosine",
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-east-1",
      },
    },
    deletionProtection: "disabled",
    tags: { environment: "development" },
  });
  console.log("Pinecone index 'gemini-dense-3072-js' successfully created!");
} catch (error) {
  // Ignore ALREADY_EXISTS errors so the server doesn't crash on restart.
  if (!error.message || !error.message.includes("ALREADY_EXISTS")) {
    console.error("Error creating Pinecone index:", error);
  } else {
    console.log("Pinecone index 'gemini-dense-3072-js' already exists.");
  }
}

export default PineConeService;
