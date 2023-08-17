import express from "express";
import { config } from "dotenv";
import configureRoutes from "./routes";
import db from "./db";

config();

const app = express();

const port = process.env.PORT || 8080;

db.createPool();

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
  configureRoutes(app);
});
