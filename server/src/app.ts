import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import customerRouter from "./routes/customer.route";
import accountRouter from "./routes/acoount.route";
import depositoTypeRouter from "./routes/deposito-type.route";
import transactionRouter from "./routes/transaction.route";
import { generateAccessToken } from "./utils/generateToken";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/customers", customerRouter);
app.use("/accounts", accountRouter);
app.use("/deposito-types", depositoTypeRouter);
app.use("/transactions", transactionRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err, "<---errorInServer");

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.listen(port, () => {
  const payload = { customerId: "sampleCustomerId", email: "sampleEmail", role: "sampleRole" };

  generateAccessToken(payload);
  console.log(`Server is running on port ${port}!`);
});
