import bodyParser from "body-parser";
import authRoute from "./auth-route";
import { Application } from "express";

const configureRoutes = (app: Application) => {
  app.use(bodyParser.json(), authRoute);
};

export default configureRoutes;
