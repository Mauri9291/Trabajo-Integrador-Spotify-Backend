// src/models/Usuario.js
import { query } from "../config/database.js";
import bcrypt from "bcrypt";

export class Usuario {
  // ==========================
  // 📘 Obtener todos los usuarios (con paginación)
  // ==========================
  static async getAll({ page = 1, limit = 20 }) {
    // Convertir a número y validar
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const safePage = Number.isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;
    const safeLimit = Number.isNaN(limitNum) || limitNum < 1 ? 20 : limitNum;

    const offset = (safePage - 1) * safeLimit;

    // ✅ Construcción segura del query (sin placeholders en LIMIT/OFFSET)
    const sql = `SELECT * FROM usuario LIMIT ${safeLimit} OFFSET ${offset}`;
    const rows = await query(sql);
    return rows;
  }

  // ==========================
  // 📘 Obtener un usuario por ID
  // ==========================
  static async getById(id) {
    const rows = await query("SELECT * FROM usuario WHERE id_usuario = ?", [id]);
    return rows[0];
  }

  // ==========================
  // 🟢 Crear usuario nuevo
  // ==========================
  static async create(data) {
    const { email, password, fecha_nac, sexo, cp, id_pais, tipo_usuario_actual } = data;

    // Hash seguro de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      `INSERT INTO usuario (
        email, password_hash, fecha_nac, sexo, cp, id_pais, tipo_usuario_actual, fecha_ult_mod_password
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        email,
        hashedPassword,
        fecha_nac || null,
        sexo || null,
        cp || null,
        id_pais || null,
        tipo_usuario_actual || null,
      ]
    );

    return { id_usuario: result.insertId, email };
  }

  // ==========================
  // 🟡 Actualizar contraseña (con hash y fecha)
  // ==========================
  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await query(
      `UPDATE usuario
       SET password_hash = ?, fecha_ult_mod_password = NOW()
       WHERE id_usuario = ?`,
      [hashedPassword, id]
    );
    return { message: "Contraseña actualizada correctamente" };
  }

  // ==========================
  // 🧭 Usuarios con contraseña vencida (+90 días)
  // ==========================
  static async findPasswordExpired() {
    const rows = await query(`
      SELECT id_usuario, email, fecha_ult_mod_password
      FROM usuario
      WHERE DATEDIFF(NOW(), fecha_ult_mod_password) > 90
    `);
    return rows;
  }
}
