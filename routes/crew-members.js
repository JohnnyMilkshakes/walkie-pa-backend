import { Router } from "express";
import * as controllers from "../controllers/crew-members.js";
import verifyToken from "../middleware/verify-token.js";
import isAuthorized from "../middleware/isAuthorized.js";
const router = Router({ mergeParams: true });

// Apply `verifyToken` middleware to all routes
router.use(verifyToken);

router.get("/", isAuthorized, controllers.getAllJobCrewMembers);
router.get("/:crewMemberId", isAuthorized, controllers.getCrewMember);
router.put("/:crewMemberId", isAuthorized, controllers.updateCrewMember);
router.delete("/:crewMemberId", isAuthorized, controllers.deleteCrewMember);

export default router;