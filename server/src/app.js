import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./common/middleware/errorHandler.js";
import { corsMiddleware } from "./common/config/cors.js";

const app = express();

app.use(corsMiddleware);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
