const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
const path = require("path");

// metadata info about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Health Link API", version: "1.0.0" },
  },
  apis: [`${path.join(__dirname, "./routes/*")}`],
};

// docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
