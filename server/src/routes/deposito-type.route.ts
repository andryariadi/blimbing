import { Router } from "express";
import Controller from "../controllers/deposito-type.controller";

const router: Router = Router();

router.get("/", Controller.getDepositTypes);
router.get("/:id", Controller.getDepositType);
router.post("/", Controller.createDepositType);
router.put("/:id", Controller.updateDepositType);
router.delete("/:id", Controller.deleteDepositType);

export default router;
