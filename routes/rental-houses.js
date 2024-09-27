import { Router } from "express";
import * as controllers from "../controllers/rental-houses.js";
import verifyToken from "../middleware/verify-token.js";
import isAuthorized from "../middleware/isAuthorized.js";
const router = Router({ mergeParams: true });

// Apply `verifyToken` middleware to all routes
router.use(verifyToken);

router.post("/", isAuthorized, controllers.createRentalHouse);
router.get("/", isAuthorized, controllers.getAllJobRentalHouses);
router.get("/:rentalHouseId", isAuthorized, controllers.getRentalHouse);
router.put("/:rentalHouseId", isAuthorized, controllers.updateRentalHouse);
router.delete("/:rentalHouseId", isAuthorized, controllers.deleteRentalHouse);

export default router;
