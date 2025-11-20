import { Router } from "express";
import Controller from "../controllers/account.controller";

const router: Router = Router();

router.get("/", Controller.getAccounts);
router.get("/:id", Controller.getAccount);
router.post("/", Controller.createAccount);
router.put("/:id", Controller.updateAccount);
router.delete("/:id", Controller.deleteAccount);

export default router;
