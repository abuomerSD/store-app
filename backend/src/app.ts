import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN, NODE_ENV, PORT } from "./config/env";
import { connectDB } from "./config/database";
import { userRouter } from "./routes/user.route";
import { errorHandler } from "./middlewares/errorHandler";
import { swaggerSpec, swaggerUi } from "./swagger";
import { authRouter } from "./routes/auth.route";
import { notFoundMiddleware } from "./middlewares/notFound";
import { categoryRouter } from "./routes/category.route";
import { productRouter } from "./routes/product.route";
import { operationRouter } from "./routes/operation.route";
import { stockMovementRouter } from "./routes/stockMovement.route";
import { unitDefinitionRouter } from "./routes/unitDefinition.route";
import { dashboardRouter } from "./routes/dashboard.route";
import { limiter } from "./utils/rateLimiter";
import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean";
import hpp from "hpp";
import { invoiceRouter } from "./routes/invoice.route";

const app = express();

const port = PORT || 3000;

// connect db
connectDB();

// json
app.use(express.json());

// cookie parser
app.use(cookieParser());

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// logger
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// cors

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

// rate limiter
app.use(limiter);

// security
app.use(helmet());
// app.use(mongoSanitize());
// app.use(xss());
app.use(hpp());

// routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/operations", operationRouter);
app.use("/api/stock-movements", stockMovementRouter);
app.use("/api/units", unitDefinitionRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/invoices", invoiceRouter);

// not found middleware

app.use(notFoundMiddleware);

// Global Error Handler

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
  console.log(`Swagger docs on http://localhost:${port}/api-docs`);
});
