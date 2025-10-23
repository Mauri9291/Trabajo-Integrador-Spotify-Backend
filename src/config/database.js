// src/config/database.js
import mysql from "mysql2/promise";
import { env } from "./index.js";

// Crear un pool de conexiones
export const db = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  port: env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Exportar una función query reutilizable
export async function query(sql, params = []) {
  try {
    const [rows] = await db.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("❌ Error ejecutando query:", error);
    throw error;
  }
}

// Test de conexión
try {
  const [rows] = await db.query("SELECT NOW() AS fecha_actual");
  console.log("✅ Conexión exitosa a MySQL:", rows[0].fecha_actual);
} catch (err) {
  console.error("❌ Error conectando a MySQL:", err);
}
