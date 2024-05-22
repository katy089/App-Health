const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const { errorResponse } = require("./lib/response");
const router = require("./routes/index.routes");
const swaggerSpec = require("./swagger");

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

// routes
server.use("/", router);

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// error handler - endware
server.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || "";

  errorResponse(res, status, message);
});

module.exports = server;
