import express from "express";
import { config } from "dotenv";
import configureRoutes from "./routes";
import { PostgresClient } from "./db";

const main = async () => {
  config();

  const app = express();

  await PostgresClient.connect();

  const port = process.env.PORT || 8080;

  app.listen(port, () => console.log(`listening on port: ${port}`));

  configureRoutes(app);
};

main();
