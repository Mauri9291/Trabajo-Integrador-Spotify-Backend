// src/routes/canciones.js
import express from "express";
import { cancionesController } from "../controllers/cancionesController.js";

const router = express.Router();

router.get("/", cancionesController.getAll);
router.get("/:id", cancionesController.getById);
router.post("/", cancionesController.create);
router.post("/:id/generos", cancionesController.addGenero);
router.delete("/:id/generos/:idGenero", cancionesController.removeGenero);

export default router;
