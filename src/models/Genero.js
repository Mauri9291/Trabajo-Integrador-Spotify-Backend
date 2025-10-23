// src/models/Genero.js
import { query } from "../config/database.js";

export class Genero {
  // ==========================
  // 🎵 Listar géneros
  // ==========================
  static async getAll() {
    return await query("SELECT * FROM genero ORDER BY nombre ASC");
  }

  // ==========================
  // 🎵 Buscar género por nombre
  // ==========================
  static async findByName(nombre) {
    const rows = await query("SELECT * FROM genero WHERE nombre = ?", [nombre]);
    return rows[0];
  }

  // ==========================
  // 🎵 Crear género nuevo
  // ==========================
  static async create(nombre) {
    const result = await query("INSERT INTO genero (nombre) VALUES (?)", [nombre]);
    return { id_genero: result.insertId, nombre };
  }
}
