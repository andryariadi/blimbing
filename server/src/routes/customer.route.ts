import { Router } from "express";
import Controller from "../controllers/customer.controller";

const router: Router = Router();

router.get("/", Controller.getCustomers);
router.get("/:id", Controller.getCustomer);
router.post("/", Controller.createCustomer);
router.put("/:id", Controller.updateCustomer);
router.delete("/:id", Controller.deleteCustomer);

export default router;
