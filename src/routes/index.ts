import bodyParser from "body-parser";
import { Application } from "express";

const configureRoutes = (app: Application) => {
  app.use(bodyParser.json());
};

export default configureRoutes;
