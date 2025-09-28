import express, { Request, Response } from "express";
import morgan from "morgan";
import { NODE_ENV, PORT } from "./config/env";
import { connectDB } from "./config/database";
import { userRouter } from "./routes/user.route";
import { errorHandler } from "./middlewares/errorHandler";
import { swaggerSpec, swaggerUi } from "./swagger";
import { authRouter } from "./routes/auth.route";
import { notFoundMiddleware } from "./middlewares/notFound";

const app = express();

const port = PORT || 3000;

// connect db
connectDB();

// json
app.use(express.json());

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// logger
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// not found middleware

app.use(notFoundMiddleware);

// Global Error Handler

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
  console.log(`Swagger docs on http://localhost:${port}/api-docs`);
});
