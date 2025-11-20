import { Router } from "express";
import Controller from "../controllers/customer.controller";

const router: Router = Router();

router.get("/", Controller.getCustomers);
// router.get("/:id");
// router.post("/");
// router.put("/:id");
// router.delete("/:id");

export default router;
