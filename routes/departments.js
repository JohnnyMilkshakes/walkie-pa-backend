import { Router } from "express";
import * as controllers from "../controllers/departments.js";
import verifyToken from "../middleware/verify-token.js";
import isAuthorized from "../middleware/isAuthorized.js";
const router = Router({ mergeParams: true });

// Apply `verifyToken` middleware to all routes
router.use(verifyToken);

router.post("/", isAuthorized, controllers.createDepartment);
router.get("/", isAuthorized, controllers.getAllJobDepartments);
router.get("/:departmentId", isAuthorized, controllers.getDepartment);
router.put("/:departmentId", isAuthorized, controllers.updateDepartment);
router.delete("/:departmentId", isAuthorized, controllers.deleteDepartment);

export default router;