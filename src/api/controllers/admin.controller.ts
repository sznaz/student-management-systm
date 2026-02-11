import { Router } from "express";
import { Container } from "typedi";
import AdminService from "../services/admin.service";
import { authorizeAdmin } from "../../middlewares/role.middleware";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();
const service = Container.get(AdminService);

router.post("/students", authenticate, authorizeAdmin, async (req, res, next) => {
  try {
    const response = await service.addStudent(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/users", authenticate, authorizeAdmin, async (req, res, next) => {
  try {
    const response = await service.getAllUsers();
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/tasks", authenticate, authorizeAdmin, async (req, res, next) => {
  try {
    const response = await service.assignTask(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
