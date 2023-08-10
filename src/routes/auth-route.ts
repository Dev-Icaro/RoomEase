import express from "express";
import { PostgresUserRepository } from "../repositories/user-repository/postgres-user-repository";
import { UserController } from "../controllers/user-controller/user-controller";
import { UserService } from "../services/user-service/user-service";

const userRepository = new PostgresUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const router = express.Router();

router.get("/api/users", async (req, res) => {
  const { body, statusCode } = await userController.getAll();

  res.status(statusCode).send(body);
});

router.get("/api/users/:id", async (req, res) => {
  const { body, statusCode } = await userController.getById({
    params: req.params,
  });

  return res.status(statusCode).json(body);
});

router.post("/api/users", async (req, res) => {
  const { body, statusCode } = await userController.create({
    body: req.body,
  });

  return res.status(statusCode).json(body);
});

router.patch("/api/users/:id", async (req, res) => {
  const { body, statusCode } = await userController.update({
    body: req.body,
    params: req.params,
  });

  return res.status(statusCode).json(body);
});

export default router;
