const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config();
const { DB_URL } = process.env;
const routes = require("./routes/index");
const app = express();

// Parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(morgan());
// Connect to MongoDB
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

app.use("/api/v1/", routes);

// Start the server
// app.listen(3000, () => {
//   console.log("Server listening on port 3000");
// });

module.exports = app;
