const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const { db } = require("./db/db");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(port, () => {
    console.log("Running on port: ", port);
  });
};

server();
