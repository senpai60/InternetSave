import { createServer } from "http";
import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

const server = createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
