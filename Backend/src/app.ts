import express from "express";
import cors from "cors";
import routes from "./routes";
const app = express();
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

export default app;
