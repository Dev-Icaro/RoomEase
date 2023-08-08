import express from "express";
import { config } from "dotenv";
import configureRoutes from "./routes";
import { PostgresClient } from "./database/postgres";
import { updateDb } from "./helpers/database-helpers";

const main = async () => {
  config();

  const app = express();

  await PostgresClient.connect().then(() => updateDb());

  const port = process.env.PORT || 8080;

  app.listen(port, () => console.log(`listening on port: ${port}`));

  configureRoutes(app);
};

main();
