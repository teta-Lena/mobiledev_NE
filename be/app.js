const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const logger = require("morgan");

const routeHandler = require("./src/routes");
const swaggerFile = require("./swagger_output.json");
const { mongodbOptions } = require("./src/config");

const app = express();

const { PORT, HOST, MONGODB_URI, ENV_MODE } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI, mongodbOptions)
  .then(() => console.log("DB Connection successfull"))
  .catch((e) => console.log("Could not connect to the DB", e));

app.use(logger("dev"));
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api", routeHandler);

app.use((req, res) => res.status(404).json({ error: "Not found!" }));

app.listen(4000, () => {
  const SERVER_URL = ENV_MODE === "dev" ? `${HOST}:${PORT}` : `${HOST}`;
  console.log(`APP RUNNING ON ${SERVER_URL}`);
});
