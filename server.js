import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";
dotenv.config();

import db from "./db/connection.js";
import routes from "./routes/index.js";

const server = express();
const PORT = process.env.PORT;

server.use(express.json());
server.use(cors());
server.use(logger("dev"));

server.use("/", routes);

db.on("connected", () => {
  console.clear();
  console.log(chalk.green("Connected to MongoDB!"));

  server.listen(PORT, () => {
    console.log(`Express server running on port: ${PORT}`);
  });
});
