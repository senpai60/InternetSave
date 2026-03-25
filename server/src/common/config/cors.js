import cors from "cors";
import ENV_CONFIG from "./env.config.js";

export const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:8000",
    `chrome-extension://${ENV_CONFIG.EXTENSION_ID}`,
    `moz-extension://${ENV_CONFIG.EXTENSION_ID}`,
    `edge-extension://${ENV_CONFIG.EXTENSION_ID}`,
    `opera-extension://${ENV_CONFIG.EXTENSION_ID}`,
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "withcredentials"],
};

export const corsMiddleware = cors(corsOptions);
