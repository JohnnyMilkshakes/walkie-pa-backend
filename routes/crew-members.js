import { Router } from "express";
import * as controllers from "../controllers/crew-members.js";
import verifyToken from "../middleware/verify-token.js";
import isAuthorized from "../middleware/isAuthorized.js";
const router = Router({ mergeParams: true });

// Apply `verifyToken` middleware to all routes
router.use(verifyToken);

router.post("/", isAuthorized, controllers.createCrewMember);
router.get("/", isAuthorized, controllers.getAllJobCrewMembers);
router.get("/:departmentId", isAuthorized, controllers.getCrewMember);
router.put("/:departmentId", isAuthorized, controllers.updateCrewMember);
router.delete("/:departmentId", isAuthorized, controllers.deleteCrewMember);

export default router;