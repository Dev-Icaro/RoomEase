import express from "express";
import { PostgresUserRepository } from "../repositories/user-repository/postgres-user-repository";
import { UserService } from "../services/user-service/user-service";
import { AuthController } from "../controllers/auth-controller/auth-controller";
import { AuthService } from "../services/auth-service/auth-service";

const userRepository = new PostgresUserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

const router = express.Router();

router.post("/api/register", async (req, res) => {
  const { body, statusCode } = await authController.register({
    body: req.body,
  });

  return res.status(statusCode).json(body);
});

router.post("/api/login", async (req, res) => {
  const { body, statusCode } = await authController.login({
    body: req.body,
  });

  return res.status(statusCode).json(body);
});

export default router;
