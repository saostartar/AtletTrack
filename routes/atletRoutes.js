// routes/atletRoutes.js
import express from "express";
import { atletLogin } from "../controllers/atlet/authController.js";
import { getAtletDashboard } from "../controllers/atlet/dashboardController.js";
import { getAtletEvaluasi } from "../controllers/atlet/evaluationController.js";
import { getPencapaianAtlet } from "../controllers/atlet/achievementController.js";
import {
  getAtletProfile,
  updateAtletProfile,
} from "../controllers/atlet/profileController.js";
import MessageController from "../controllers/MessageController.js";
import {
  getAvailableCatalogs,
  getCatalogById,
  getCatalogsByType,
  getCatalogsByDifficulty,
} from "../controllers/atlet/catalogController.js";

import {
  startLatihan,
  updateProgress,
  completeLatihan,
  getLatihanHistory,
  getOngoingLatihan,
  startOpsiLatihan,
} from "../controllers/atlet/latihanController.js";

import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Login
router.post("/login", atletLogin);

// Protected routes
router.use(authenticateToken);
router.use(authorizeRoles("atlet"));

// Dashboard
router.get("/dashboard", getAtletDashboard);

// Catalog Routes
router.get("/catalogs", getAvailableCatalogs);
router.get("/catalogs/:id", getCatalogById);
router.get("/catalogs/type/:jenisLatihan", getCatalogsByType);
router.get("/catalogs/difficulty/:tingkatKesulitan", getCatalogsByDifficulty);

// Training execution routes
router.post("/latihan/:katalogId/start", startLatihan);
router.put("/latihan/:latihanId/progress", updateProgress);
router.put("/latihan/:latihanId/complete", completeLatihan);
router.get("/latihan/history", getLatihanHistory);
router.get("/latihan/ongoing", getOngoingLatihan);
router.post("/latihan/:latihanId/opsi/start", startOpsiLatihan);

// Evaluasi & Performa
router.get("/evaluasi", getAtletEvaluasi);

// Pencapaian Atlet
router.get("/pencapaian", getPencapaianAtlet);

// Messaging routes
router.post("/messages", MessageController.sendMessage);
router.get("/conversations", MessageController.getConversations);
router.get(
  "/conversations/:conversationId/messages",
  MessageController.getMessages
);

// Get & Update Profile
router.get("/profile", getAtletProfile);
router.put("/profile", updateAtletProfile);

export default router;
