import { Router } from "express";
import Controller from "../controllers/customer.controller";

const router: Router = Router();

router.get("/", Controller.getCustomers);
router.get("/:id", Controller.getCustomer);
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/refresh-token", Controller.refreshToken);
router.post("/logout", Controller.logout);
router.post("/logout-all", Controller.logoutAll);
router.put("/:id", Controller.updateCustomer);
router.delete("/:id", Controller.deleteCustomer);

export default router;
