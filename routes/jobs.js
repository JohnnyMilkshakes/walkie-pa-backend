import { Router } from "express";
import * as controllers from "../controllers/jobs.js";
import verifyToken from "../middleware/verify-token.js";
import isAuthorized from "../middleware/isAuthorized.js";
const router = Router();

// Apply `verifyToken` middleware to all routes
router.use(verifyToken);

router.post("/", controllers.createJob);
router.get("/", controllers.getAllUserJobs);

router.get("/:jobId", isAuthorized, controllers.getJob);
router.put("/:jobId", isAuthorized, controllers.updateJob);
router.delete("/:jobId", isAuthorized, controllers.deleteJob);

export default router;