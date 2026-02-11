import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import adminController from "./api/controllers/admin.controller";
import authController from "./api/controllers/auth.controller";
import studentController from "./api/controllers/student.controller";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(limiter);
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.use("/api/auth", authController);
app.use("/api/admin", adminController);
app.use("/api/student", studentController);

app.use(errorMiddleware);

export default app;
