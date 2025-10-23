// src/routes/albumes.js
import express from "express";
import { albumesController } from "../controllers/albumesController.js";

const router = express.Router();

router.get("/", albumesController.listar);
router.get("/:id", albumesController.obtenerPorId);
router.get("/:id/canciones", albumesController.obtenerCanciones);
router.post("/", albumesController.crear);

export default router;
