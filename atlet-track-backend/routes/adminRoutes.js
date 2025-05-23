import express from "express";
import { adminLogin } from "../controllers/admin/authController.js";
import {
  getAllKoordinator,
  addKoordinator,
  updateKoordinator,
  deleteKoordinator,
  resetKoordinatorPassword,
} from "../controllers/admin/koordinatorController.js";
import { getActivityLogs } from "../controllers/admin/activityController.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Login
router.post("/login", adminLogin);

// Protected routes
router.use(authenticateToken);
router.use(authorizeRoles("admin"));

// Manajemen Koordinator
router.get("/koordinator", getAllKoordinator);
router.post("/koordinator", addKoordinator);
router.put("/koordinator/:id", updateKoordinator);
router.delete("/koordinator/:id", deleteKoordinator);
router.post("/koordinator/:id/reset-password", resetKoordinatorPassword);

// Activity Logs
router.get("/activity-logs", getActivityLogs);

export default router;
