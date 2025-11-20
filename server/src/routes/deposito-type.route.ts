import { Router } from "express";
import Controller from "../controllers/deposito-type.controller";

const router: Router = Router();

router.get("/", Controller.getDepositTypes);
// router.get("/:id");
// router.post("/");
// router.put("/:id");
// router.delete("/:id");

export default router;
