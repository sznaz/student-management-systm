import express from "express";
import cors from "cors";
import adminController from "./api/controllers/admin.controller";
import authController from "./api/controllers/auth.controller";
import studentController from "./api/controllers/student.controller";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authController);
app.use("/api/admin", adminController);
app.use("/api/student", studentController);

app.use(errorMiddleware);

export default app;
