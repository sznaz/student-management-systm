import { Router } from "express";
import { Container } from "typedi";
import { authenticate } from "../../middlewares/auth.middleware";
import StudentService from "../services/student.service";

const router = Router();
const service = Container.get(StudentService);

router.get("/tasks", authenticate, async (req, res, next) => {
  try {
    const response = await service.getTasks((req as any).user.id);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

router.put("/tasks/:id", authenticate, async (req, res, next) => {
  try {
    const response = await service.markCompleted(req.params.id as string);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
