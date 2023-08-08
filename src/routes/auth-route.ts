import express, { Request, Response } from "express";
import { PostgresUserRepository } from "../repositories/user-repository/postgres-user-repository";
import { AuthController } from "../controllers/auth-controller/auth-controller";

const router = express.Router();

router.get("/api/users", async (req: Request, res: Response) => {
  const userRepository = new PostgresUserRepository();

  const authController = new AuthController(userRepository);

  const { body, statusCode } = await authController.signin();

  return res.status(statusCode).send(body);
});

export default router;
