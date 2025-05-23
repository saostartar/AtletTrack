import express from "express";
import dotenv from "dotenv";
import db from "./models/index.js";
import adminRoutes from "./routes/adminRoutes.js";
import koordinatorRoutes from "./routes/koordinatorRoutes.js";
import atletRoutes from "./routes/atletRoutes.js";
import { scheduleReminderJobs } from "./services/reminderService.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Untuk ESM, perlu menentukan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable credentials (cookies, authorization headers, etc)
  })
);

// Middleware
app.use(express.json());

// Menyajikan file statis dari 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/koordinator", koordinatorRoutes);
app.use("/api/atlet", atletRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Athlete Monitoring Backend");
});

(async () => {
  try {
    // Use force: true to drop and recreate tables
    // WARNING: This will delete all existing data
    // await db.sequelize.sync({ force: true });

    // Or use alter: true to modify existing tables without dropping
    await db.sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Database synchronized successfully");
      scheduleReminderJobs();
    });
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
})();
