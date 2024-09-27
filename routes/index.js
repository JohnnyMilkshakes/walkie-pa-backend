import { Router } from "express";
import authRoutes from "./auth.js";
import jobsRoutes from "./jobs.js";
import walkiesRoutes from "./walkies.js";
import rentalHousesRoutes from "./rental-houses.js"
import { createWalkie } from "../controllers/walkies.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the api root!");
});

router.use("/auth", authRoutes);
router.use("/jobs", jobsRoutes);
router.use("/jobs/:jobId/rental-houses", rentalHousesRoutes);
// Walkies need to be associated with a rental house
router.post("/jobs/:jobId/rental-houses/:rentalHouseId/walkies", createWalkie);
router.use("/jobs/:jobId/walkies", walkiesRoutes);

export default router;
