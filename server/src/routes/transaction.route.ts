import { Router } from "express";
import Controller from "../controllers/transaction.controller";

const router: Router = Router();

router.get("/", Controller.getTransactions);
// router.get("/:id");
// router.post("/deposit");
// router.post("/withdraw");
// router.post("/calculate-interest");

export default router;
