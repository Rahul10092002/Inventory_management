import { Router } from "express";
import { getDashboardMatrix } from "../controllers/dashboardController";

const router = Router();

// routes
router.get("/", getDashboardMatrix);

export default router;
