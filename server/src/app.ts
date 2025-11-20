import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import customerRouter from "./routes/customer.route";
import accountRouter from "./routes/acoount.route";
import depositoTypeRouter from "./routes/deposito-type.route";
import transactionRouter from "./routes/transaction.route";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/customers", customerRouter);
app.use("/accounts", accountRouter);
app.use("/deposito-types", depositoTypeRouter);
app.use("/transactions", transactionRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err, "<---errorInServer");

  return res.status(err.status || 500).json({ message: err.message || "Internal Server Error!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
