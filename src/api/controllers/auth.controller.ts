import { Router } from "express";
import { Container } from "typedi";
import AuthService from "../services/auth.service";
import { IRegisterDTO } from "../dto/user.dto";

const router = Router();
const service = Container.get(AuthService);
router.post("/register", async (req, res, next): Promise<void> => {
  try {
    const body: IRegisterDTO = req.body;
    const response = await service.register(body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const response = await service.login(req.body.email, req.body.password);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
