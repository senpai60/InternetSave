import { createServer } from "http";
import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/common/config/db.config.js";

dotenv.config();

const server = createServer(app);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
