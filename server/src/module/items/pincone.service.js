import { Pinecone } from "@pinecone-database/pinecone";
import ENV_CONFIG from "../../common/config/env.config.js";

const PineConeService = new Pinecone({ apiKey: ENV_CONFIG.PINECONE_API_KEY });

await PineConeService.createIndex({
  name: "standard-dense-js",
  vectorType: "dense",
  dimension: 1536,
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

export default PineConeService;
