// src/routes/index.js
import express from "express";

// 🧩 Importar todas las rutas del proyecto
import usuariosRoutes from "./usuarios.js";
import artistasRoutes from "./artistas.js";
import albumesRoutes from "./albumes.js";
import cancionesRoutes from "./canciones.js";
import generosRoutes from "./generos.js";
import playlistsRoutes from "./playlists.js";
import suscripcionesRoutes from "./suscripciones.js";
import metodosPagoRoutes from "./metodos-pago.js";
import pagosRoutes from "./pagos.js";
import vistasRoutes from "./vistas.js";

const router = express.Router();

// ==============================
// 📦 Registro de rutas principales
// ==============================
router.use("/usuarios", usuariosRoutes);
router.use("/artistas", artistasRoutes);
router.use("/albumes", albumesRoutes);
router.use("/canciones", cancionesRoutes);
router.use("/generos", generosRoutes);
router.use("/playlists", playlistsRoutes);
router.use("/suscripciones", suscripcionesRoutes);
router.use("/metodos-pago", metodosPagoRoutes);
router.use("/pagos", pagosRoutes);
router.use("/vistas", vistasRoutes);

// ==============================
// 🧱 Ruta por defecto (Express 5 compatible)
// ==============================
router.use((req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: "Recurso no encontrado en la API de Spotify",
    },
  });
});

export default router;
