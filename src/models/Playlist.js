// src/models/Playlist.js
import { query } from "../config/database.js";

export class Playlist {
  // ==========================
  // 🎵 Listar todas las playlists
  // ==========================
  static async getAll() {
    return await query(`
      SELECT p.*, u.email AS usuario
      FROM playlist p
      JOIN usuario u ON p.id_usuario = u.id_usuario
      ORDER BY p.fecha_creacion DESC
    `);
  }

  // ==========================
  // 🎵 Obtener playlist por ID
  // ==========================
  static async getById(id) {
    const rows = await query(
      `
      SELECT p.*, u.email AS usuario
      FROM playlist p
      JOIN usuario u ON p.id_usuario = u.id_usuario
      WHERE p.id_playlist = ?
      `,
      [id]
    );
    return rows[0];
  }

  // ==========================
  // 🎵 Crear playlist
  // ==========================
  static async create({ titulo, id_usuario }) {
    const result = await query(
      `
      INSERT INTO playlist (titulo, id_usuario, estado, fecha_creacion)
      VALUES (?, ?, 'activa', NOW())
      `,
      [titulo, id_usuario]
    );

    return {
      id_playlist: result.insertId,
      titulo,
      id_usuario,
      estado: "activa",
      fecha_creacion: new Date(),
    };
  }

  // ==========================
  // 🎵 Actualizar playlist (titulo, estado)
  // ==========================
  static async update(id, { titulo, estado, fecha_eliminada }) {
    const set = [];
    const params = [];

    if (titulo) {
      set.push("titulo = ?");
      params.push(titulo);
    }

    if (estado) {
      set.push("estado = ?");
      params.push(estado);
    }

    if (fecha_eliminada) {
      set.push("fecha_eliminada = ?");
      params.push(fecha_eliminada);
    }

    if (set.length === 0) return;

    params.push(id);
    await query(`UPDATE playlist SET ${set.join(", ")} WHERE id_playlist = ?`, params);
  }

  // ==========================
  // 🎵 Agregar canción a playlist
  // ==========================
  static async addCancion(id_playlist, id_cancion, orden) {
    await query(
      `
      INSERT INTO playlist_cancion (id_playlist, id_cancion, orden, fecha_agregada)
      VALUES (?, ?, ?, NOW())
      `,
      [id_playlist, id_cancion, orden]
    );
  }

  // ==========================
  // 🎵 Quitar canción de playlist
  // ==========================
  static async removeCancion(id_playlist, id_cancion) {
    await query(
      `
      DELETE FROM playlist_cancion
      WHERE id_playlist = ? AND id_cancion = ?
      `,
      [id_playlist, id_cancion]
    );
  }

  // ==========================
  // 🎵 Obtener canciones de una playlist
  // ==========================
  static async getCanciones(id_playlist) {
    return await query(
      `
      SELECT c.id_cancion, c.titulo, c.duracion_seg, a.titulo AS album, ar.nombre AS artista
      FROM playlist_cancion pc
      JOIN cancion c ON pc.id_cancion = c.id_cancion
      JOIN album a ON c.id_album = a.id_album
      JOIN artista ar ON a.id_artista = ar.id_artista
      WHERE pc.id_playlist = ?
      ORDER BY pc.orden ASC
      `,
      [id_playlist]
    );
  }
}
