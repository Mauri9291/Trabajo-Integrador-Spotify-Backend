// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import { env } from "./config/index.js";

const app = express();

// 🔹 Ruta raíz (healthcheck)
app.get("/", (req, res) => {
  res.json({ message: "🎧 Bienvenido a la API Spotify Backend" });
});

// 🔹 Middlewares base
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// 🔹 Rate limiting básico
const limiter = rateLimit({
  windowMs: Number(env.RATE_LIMIT_WINDOW_MS || 60000),
  max: Number(env.RATE_LIMIT_MAX || 100),
});
app.use(limiter);

// 🔹 Prefijo de rutas principal
app.use("/api/v1", routes);

// 🔹 Manejo de rutas inexistentes (404)
app.use((req, res) => {
  return res.status(404).json({
    error: { code: 404, message: "Recurso no encontrado" },
  });
});

// 🔹 Manejador centralizado de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || status;
  const message = err.message || "Error interno del servidor";
  const details = err.details || undefined;

  if (env.NODE_ENV !== "test") {
    console.error("[ERROR]", err);
  }

  return res.status(status).json({ error: { code, message, details } });
});

export default app;
