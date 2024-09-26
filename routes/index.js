import { Router } from "express";
import authRoutes from "./auth.js";
import jobsRoutes from "./jobs.js"

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the api root!");
});

router.use("/auth", authRoutes);
router.use("/jobs", jobsRoutes)

export default router;