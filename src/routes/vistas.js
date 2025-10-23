// src/routes/vistas.js
import express from "express";
import {
  cancionesPopularesPorPais,
  ingresosPorArtistaDiscografica,
} from "../controllers/vistasController.js";

const router = express.Router();

// 🎵 Canciones populares por país
router.get("/canciones-populares-por-pais", cancionesPopularesPorPais);

// 💰 Ingresos por artista y discográfica
router.get("/ingresos-por-artista-discografica", ingresosPorArtistaDiscografica);

export default router;
