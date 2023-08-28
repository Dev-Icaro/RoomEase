import bodyParser from "body-parser";
import authRoute from "./auth-route";
import roomRoute from "./room-route";
import { Application } from "express";

const configureRoutes = (app: Application) => {
  app.use(bodyParser.json(), authRoute, roomRoute);
};

export default configureRoutes;
