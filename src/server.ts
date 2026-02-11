import "reflect-metadata";

import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
