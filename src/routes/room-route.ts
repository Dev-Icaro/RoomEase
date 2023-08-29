import express from "express";
import { PostgresRoomRepository } from "../repositories/room-repository/postgres-room-repository";
import { RoomService } from "../services/room-service/room-service";
import { RoomController } from "../controllers/room-controller/room-controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const roomRepository = new PostgresRoomRepository();
const roomService = new RoomService(roomRepository);
const roomController = new RoomController(roomService);

const router = express.Router();

router.use(authMiddleware);

router
  .route("/api/rooms")
  .get(async (req, res) => {
    const { body, statusCode } = await roomController.getAll();

    return res.status(statusCode).json(body);
  })
  .post(async (req, res) => {
    const { body, statusCode } = await roomController.create({
      body: req.body,
    });

    return res.status(statusCode).json(body);
  });

router
  .route("/api/rooms/:id")
  .get(async (req, res) => {
    const { body, statusCode } = await roomController.getById({
      params: req.params,
    });

    return res.status(statusCode).json(body);
  })
  .delete(async (req, res) => {
    const { body, statusCode } = await roomController.delete({
      params: req.params,
    });

    return res.status(statusCode).json(body);
  })
  .patch(async (req, res) => {
    const { body, statusCode } = await roomController.update({
      body: req.body,
      params: req.params,
    });

    return res.status(statusCode).json(body);
  });

export default router;
