import dotenv from "dotenv";
dotenv.config();

const ENV_CONFIG = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  EXTENSION_ID: process.env.EXTENSION_ID,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
};

export default ENV_CONFIG;
