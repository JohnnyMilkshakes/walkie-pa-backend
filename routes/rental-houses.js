import { Router } from "express";
import * as controllers from "../controllers/rental-houses.js";
import verifyToken from "../middleware/verify-token.js";
import isAuthorized from "../middleware/isAuthorized.js";
const router = Router();

// Apply `verifyToken` middleware to all routes
router.use(verifyToken);

router.post("/", controllers.createRentalHouse);
router.get("/", controllers.getAllJobRentalHouses);

router.get("/:walkieId", isAuthorized, controllers.getRentalHouse);
router.put("/:walkieId", isAuthorized, controllers.updateRentalHouse);
router.delete("/:walkieId", isAuthorized, controllers.deleteRentalHouse);

export default router;