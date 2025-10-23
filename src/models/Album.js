// src/models/Album.js
import { query } from "../config/database.js";

export class Album {
  // ==========================
  // 📘 Listar álbumes (con filtros)
  // ==========================
  static async getAll({ artistaId, q }) {
    let sql = `
      SELECT a.*, ar.nombre AS nombre_artista, d.nombre AS nombre_discografica
      FROM album a
      JOIN artista ar ON a.id_artista = ar.id_artista
      JOIN discografica d ON a.id_discografica = d.id_discografica
    `;
    const params = [];

    // Filtro por artista o texto parcial en título
    const conditions = [];
    if (artistaId) {
      conditions.push("a.id_artista = ?");
      params.push(artistaId);
    }
    if (q) {
      conditions.push("a.titulo LIKE ?");
      params.push(`%${q}%`);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY a.anio_publicacion DESC";

    return await query(sql, params);
  }

  // ==========================
  // 📘 Obtener un álbum por ID
  // ==========================
  static async getById(id) {
    const rows = await query(
      `
      SELECT a.*, ar.nombre AS nombre_artista, d.nombre AS nombre_discografica
      FROM album a
      JOIN artista ar ON a.id_artista = ar.id_artista
      JOIN discografica d ON a.id_discografica = d.id_discografica
      WHERE a.id_album = ?
      `,
      [id]
    );
    return rows[0];
  }

  // ==========================
  // 📘 Obtener canciones de un álbum
  // ==========================
  static async getCanciones(id_album) {
    const rows = await query(
      `
      SELECT c.id_cancion, c.titulo, c.duracion_seg, c.reproducciones, c.likes
      FROM cancion c
      WHERE c.id_album = ?
      ORDER BY c.id_cancion ASC
      `,
      [id_album]
    );
    return rows;
  }

  // ==========================
  // 🔍 Buscar si existe álbum duplicado (artista + título)
  // ==========================
  static async findDuplicate(id_artista, titulo) {
    const rows = await query(
      "SELECT * FROM album WHERE id_artista = ? AND titulo = ?",
      [id_artista, titulo]
    );
    return rows[0];
  }

  // ==========================
  // 🟢 Crear nuevo álbum
  // ==========================
  static async create({ titulo, id_artista, id_discografica, imagen_portada, anio_publicacion }) {
    const result = await query(
      `
      INSERT INTO album (titulo, id_artista, id_discografica, imagen_portada, anio_publicacion)
      VALUES (?, ?, ?, ?, ?)
      `,
      [titulo, id_artista, id_discografica, imagen_portada || null, anio_publicacion || null]
    );

    return {
      id_album: result.insertId,
      titulo,
      id_artista,
      id_discografica,
      imagen_portada: imagen_portada || null,
      anio_publicacion,
    };
  }
}
