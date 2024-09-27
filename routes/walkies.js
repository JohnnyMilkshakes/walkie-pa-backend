import { Router } from "express";
import * as controllers from "../controllers/walkies.js";
import verifyToken from "../middleware/verify-token.js";
import isAuthorized from "../middleware/isAuthorized.js";
const router = Router();

// Apply `verifyToken` middleware to all routes
router.use(verifyToken);

router.post("/", controllers.createWalkie);
router.get("/", controllers.getAllJobWalkies);

router.get("/:walkieId", isAuthorized, controllers.getWalkie);
router.put("/:walkieId", isAuthorized, controllers.updateWalkie);
router.delete("/:walkieId", isAuthorized, controllers.deleteWalkie);

export default router;