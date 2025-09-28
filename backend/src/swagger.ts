import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { PORT } from "./config/env";

const options = {
  definition: {
    openapi: "3.0.0", // version
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "API documentation for my Express app",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // adjust to your dev server
      },
    ],
  },
  // Path to the API docs
  apis: ["./routes/*.js", "./controllers/*.js"], // adjust to your files
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
