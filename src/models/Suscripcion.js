// src/models/Suscripcion.js
import { query } from "../config/database.js";

export class Suscripcion {
  // ==========================
  // 📦 Crear suscripción
  // ==========================
  static async create({ id_usuario, tipo_usuario, fecha_inicio, fecha_renovacion }) {
    const sql = `
      INSERT INTO suscripcion (id_usuario, tipo_usuario, fecha_inicio, fecha_renovacion)
      VALUES (?, ?, ?, ?)
    `;
    const result = await query(sql, [id_usuario, tipo_usuario, fecha_inicio, fecha_renovacion]);

    return {
      id_suscripcion: result.insertId,
      id_usuario,
      tipo_usuario,
      fecha_inicio,
      fecha_renovacion,
    };
  }

  // ==========================
  // 📋 Listar suscripciones
  // ==========================
  static async getAll() {
    return await query(`
      SELECT s.*, u.email, tu.nombre AS tipo_usuario_nombre
      FROM suscripcion s
      JOIN usuario u ON s.id_usuario = u.id_usuario
      JOIN tipo_usuario tu ON s.tipo_usuario = tu.id_tipo_usuario
      ORDER BY s.fecha_inicio DESC
    `);
  }
}
