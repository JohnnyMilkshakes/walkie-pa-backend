import { Router } from "express";
import authRoutes from "./auth.js";
import jobsRoutes from "./jobs.js";
import walkiesRoutes from "./walkies.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the api root!");
});

router.use("/auth", authRoutes);
router.use("/jobs", jobsRoutes);
router.use("/jobs/:jobId/walkies", walkiesRoutes);

export default router;
