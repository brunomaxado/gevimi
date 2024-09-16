import express from "express";
import { getDashboardData } from "../controllers/dashController.js";

const router = express.Router();

// Endpoint para obter os dados do dashboard
router.get("/dashboard", getDashboardData);

export default router;
