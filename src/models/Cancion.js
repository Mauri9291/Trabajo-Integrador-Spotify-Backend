// src/models/Cancion.js
import { query } from "../config/database.js";

export class Cancion {
  // ==========================
  // 🎵 Listar canciones con filtros
  // ==========================
  static async getAll({ genero, artistaId, albumId }) {
    let sql = `
      SELECT c.*, a.titulo AS album, ar.nombre AS artista
      FROM cancion c
      JOIN album a ON c.id_album = a.id_album
      JOIN artista ar ON a.id_artista = ar.id_artista
      LEFT JOIN cancion_genero cg ON c.id_cancion = cg.id_cancion
      LEFT JOIN genero g ON cg.id_genero = g.id_genero
    `;
    const params = [];
    const conditions = [];

    if (genero) {
      conditions.push("g.nombre = ?");
      params.push(genero);
    }
    if (artistaId) {
      conditions.push("ar.id_artista = ?");
      params.push(artistaId);
    }
    if (albumId) {
      conditions.push("a.id_album = ?");
      params.push(albumId);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY c.id_cancion ASC";
    return await query(sql, params);
  }

  // ==========================
  // 🎵 Obtener canción por ID
  // ==========================
  static async getById(id) {
    const rows = await query(
      `
      SELECT c.*, a.titulo AS album, ar.nombre AS artista
      FROM cancion c
      JOIN album a ON c.id_album = a.id_album
      JOIN artista ar ON a.id_artista = ar.id_artista
      WHERE c.id_cancion = ?
      `,
      [id]
    );
    return rows[0];
  }

  // ==========================
  // 🎵 Crear canción nueva
  // ==========================
  static async create({ titulo, duracion_seg, id_album }) {
    const result = await query(
      `
      INSERT INTO cancion (titulo, duracion_seg, id_album)
      VALUES (?, ?, ?)
      `,
      [titulo, duracion_seg, id_album]
    );
    return { id_cancion: result.insertId, titulo, duracion_seg, id_album };
  }

  // ==========================
  // 🎵 Asociar género
  // ==========================
  static async addGenero(id_cancion, id_genero) {
    await query(
      `
      INSERT IGNORE INTO cancion_genero (id_cancion, id_genero)
      VALUES (?, ?)
      `,
      [id_cancion, id_genero]
    );
  }

  // ==========================
  // 🎵 Desasociar género
  // ==========================
  static async removeGenero(id_cancion, id_genero) {
    await query(
      `
      DELETE FROM cancion_genero
      WHERE id_cancion = ? AND id_genero = ?
      `,
      [id_cancion, id_genero]
    );
  }
}
