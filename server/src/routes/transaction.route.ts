import { Router } from "express";
import Controller from "../controllers/transaction.controller";

const router: Router = Router();

router.get("/", Controller.getTransactions);
router.get("/:id", Controller.getTransaction);
router.post("/deposit", Controller.createDeposit);
router.post("/withdraw", Controller.createWithdraw);
router.post("/calculate-interest", Controller.calculateInterest);

export default router;
