// routes/koordinatorRoutes.js
import express from "express";
import MessageController from "../controllers/MessageController.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";
import { koordinatorLogin } from "../controllers/koordinator/authController.js";
import {
  getKoordinatorDashboard,
  getAllKoordinators,
} from "../controllers/koordinator/koordinatorController.js";
import {
  createAtlet,
  getAllAtlet,
  getAtletById,
  updateAtlet,
  deleteAtlet,
} from "../controllers/koordinator/atletController.js";
import {
  addPencapaian,
  getPencapaianByKoordinator,
} from "../controllers/koordinator/pencapaianController.js";
import { getAnalitikPerformaAtlet } from "../controllers/koordinator/analyticsController.js";
import {
  getAllEvaluasi,
  addEvaluasi,
  updateEvaluasi,
  deleteEvaluasi,
} from "../controllers/koordinator/evaluasiController.js";
import {
  getAllKatalogLatihan,
  addKatalogLatihan,
  updateKatalogLatihan,
  deleteKatalogLatihan,
  getKatalogByJenis,
  getKatalogByCabangOlahraga,
  getKatalogById,
} from "../controllers/koordinator/katalogLatihanController.js";
import {
  getOpsiLatihan,
  addOpsiLatihan,
  updateOpsiLatihan,
  deleteOpsiLatihan,
} from "../controllers/koordinator/opsiLatihanController.js";
import { getCompletedLatihan } from "../controllers/koordinator/latihanController.js";

const router = express.Router();

// Login
router.post("/login", koordinatorLogin);

// Protected routes
router.use(authenticateToken);
router.use(authorizeRoles("koordinator", "atlet"));

// Dashboard
router.get("/dashboard", getKoordinatorDashboard);

// Atlet Management Routes
router.post("/atlet", createAtlet);
router.get("/atlet", getAllAtlet);
router.get("/atlet/:id", getAtletById);
router.put("/atlet/:id", updateAtlet);
router.delete("/atlet/:id", deleteAtlet);

// Pencapaian Routes
router.post("/pencapaian", addPencapaian);
router.get("/pencapaian", getPencapaianByKoordinator);

// Performance Analytics
router.get("/analytics/performa", getAnalitikPerformaAtlet);

// Katalog Latihan Routes
router.get("/katalog-latihan", getAllKatalogLatihan);
router.get("/katalog-latihan/:id", getKatalogById);
router.post("/katalog-latihan", addKatalogLatihan);
router.put("/katalog-latihan/:id", updateKatalogLatihan);
router.delete("/katalog-latihan/:id", deleteKatalogLatihan);
router.get("/katalog-latihan/jenis/:jenisLatihan", getKatalogByJenis);
router.get(
  "/katalog-latihan/cabang-olahraga/:cabangOlahraga",
  getKatalogByCabangOlahraga
);
router.get("/katalog-latihan/:katalogId/opsi", getOpsiLatihan);
router.post("/katalog-latihan/:katalogId/opsi", addOpsiLatihan);
router.put("/opsi-latihan/:id", updateOpsiLatihan);
router.delete("/opsi-latihan/:id", deleteOpsiLatihan);

// Evaluasi Routes
router.get("/evaluasi", getAllEvaluasi);
router.post("/evaluasi", addEvaluasi);
router.put("/evaluasi/:id", updateEvaluasi);
router.delete("/evaluasi/:id", deleteEvaluasi);

router.get("/latihan/completed", getCompletedLatihan);

router.post("/messages", MessageController.sendMessage);
router.get("/conversations", MessageController.getConversations);
router.get(
  "/conversations/:conversationId/messages",
  MessageController.getMessages
);

router.get("/list", getAllKoordinators);

export default router;
