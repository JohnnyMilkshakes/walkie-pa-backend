import { Router } from "express";
import authRoutes from "./auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the api root!");
});

router.use("/auth", authRoutes);

export default router;