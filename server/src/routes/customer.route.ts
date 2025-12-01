import { Router } from "express";
import Controller from "../controllers/customer.controller";
import { autheticateToken, authorizeRoles, requireRole } from "../middleware";
import { Role } from "../generated/prisma/enums";

const router: Router = Router();

router.get("/", requireRole(Role.ADMIN), Controller.getCustomers);
router.get("/profile", autheticateToken, Controller.getProfile);
router.get("/:id", Controller.getCustomer);
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/refresh-token", Controller.refreshToken);
router.post("/logout", Controller.logout);
router.post("/logout-all", Controller.logoutAll);
router.put("/:id", Controller.updateCustomer);
router.delete("/:id", Controller.deleteCustomer);

export default router;
