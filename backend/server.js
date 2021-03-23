require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { log, ExpressAPILogMiddleware } = require("@rama41222/node-logger");
// const mysqlConnect = require('./db');
const routes = require("./routes");

// set up some configs for express.
const config = {
  port: 8000,
  name: "sample-express-app",
  host: "0.0.0.0",
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ label: config.name, file: false, console: true });

// specify middleware to use
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// eslint-disable-next-line new-cap
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// include routes
routes(app, logger);

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error("Internal Server Error");
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
