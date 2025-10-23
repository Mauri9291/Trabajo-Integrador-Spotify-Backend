// src/routes/pagos.js
import express from "express";
import { pagosController } from "../controllers/pagosController.js";

const router = express.Router();

router.get("/", pagosController.listar);
router.get("/:id", pagosController.obtenerPorId);
router.post("/", pagosController.crear);

export default router;
