import express from "express";
import { config } from "dotenv";
import configureRoutes from "./routes";

config();

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port: ${port}`));

configureRoutes(app);
