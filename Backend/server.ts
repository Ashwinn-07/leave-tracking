import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import app from "./src/app";
import connectDB from "./src/config/db";
import "./config/di-container";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server up!`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();
