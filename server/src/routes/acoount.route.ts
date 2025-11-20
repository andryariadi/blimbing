import { Router } from "express";
import Controller from "../controllers/account.controller";

const router: Router = Router();

router.get("/", Controller.getAccounts);
// router.get("/:id");
// router.post("/");
// router.put("/:id");
// router.delete("/:id");

export default router;
