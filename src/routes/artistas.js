// src/routes/artistas.js
import express from "express";
import { artistasController } from "../controllers/artistasController.js";

const router = express.Router();

router.get("/", artistasController.listar);
router.get("/:id", artistasController.obtenerPorId);
router.post("/", artistasController.crear);

export default router;
