import { Router } from "express";
import { healthCheck } from "../controllers";

const router = Router();

router.get("/health-check", healthCheck);

export default router;
