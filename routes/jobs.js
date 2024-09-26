import { Router } from "express";
import * as controllers from "../controllers/jobs.js";
import verifyToken from "../middleware/verify-token.js";
import isAuthorized from "../middleware/isAuthorized.js";
const router = Router();

// Apply `verifyToken` middleware to all routes
router.use(verifyToken);

router.post("/", controllers.createJob);
router.get("/", controllers.getAllJobs);

router.use(isAuthorized);
router.get("/:jobId", controllers.getJob);
router.put("/:jobId", controllers.updateJob);
router.delete("/:jobId", controllers.deleteJob);

export default router;