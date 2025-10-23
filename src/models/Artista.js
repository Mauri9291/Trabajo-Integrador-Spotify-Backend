// src/models/Artista.js
import { query } from "../config/database.js";

export class Artista {
  // ==========================
  // 📘 Obtener todos los artistas
  // ==========================
  static async getAll() {
    const rows = await query("SELECT * FROM artista ORDER BY nombre ASC");
    return rows;
  }

  // ==========================
  // 📘 Obtener artista por ID
  // ==========================
  static async getById(id) {
    const rows = await query("SELECT * FROM artista WHERE id_artista = ?", [id]);
    return rows[0];
  }

  // ==========================
  // 🔍 Buscar por nombre (para validar duplicados)
  // ==========================
  static async getByName(nombre) {
    const rows = await query("SELECT * FROM artista WHERE nombre = ?", [nombre]);
    return rows[0];
  }

  // ==========================
  // 🟢 Crear nuevo artista
  // ==========================
  static async create({ nombre, imagen_url }) {
    const result = await query(
      "INSERT INTO artista (nombre, imagen_url) VALUES (?, ?)",
      [nombre, imagen_url || null]
    );
    return { id_artista: result.insertId, nombre, imagen_url: imagen_url || null };
  }
}
