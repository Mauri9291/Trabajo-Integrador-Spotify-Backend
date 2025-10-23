// src/config/index.js
import dotenv from "dotenv";

// Cargar las variables desde el archivo .env
dotenv.config();

// Exportar las variables de entorno que usaremos en toda la app
export const env = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: process.env.DB_NAME || "spotify",
  DB_PORT: process.env.DB_PORT || 3306,
  SERVER_PORT: process.env.SERVER_PORT || 3000,
};
