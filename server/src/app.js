import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./common/middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
