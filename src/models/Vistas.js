// src/models/Vistas.js
import { query } from "../config/database.js";

export class Vistas {
  // ===============================
  // 🎵 1️⃣ Canciones Populares por País
  // ===============================
  static async cancionesPopularesPorPais({ pais, limit }) {
    let sql = `
      SELECT 
        c.titulo AS nombre_cancion,
        ar.nombre AS nombre_artista,
        al.titulo AS nombre_album,
        p.nombre_pais,
        SUM(c.reproducciones) AS total_reproducciones,
        COUNT(DISTINCT pc.id_playlist) AS apariciones_en_playlists
      FROM cancion c
      JOIN album al ON c.id_album = al.id_album
      JOIN artista ar ON al.id_artista = ar.id_artista
      JOIN playlist_cancion pc ON c.id_cancion = pc.id_cancion
      JOIN playlist pl ON pc.id_playlist = pl.id_playlist
      JOIN usuario u ON pl.id_usuario = u.id_usuario
      JOIN pais p ON u.id_pais = p.id_pais
      WHERE pl.estado = 'activa'
    `;

    const params = [];

    // Filtro por país
    if (pais) {
      sql += " AND p.nombre_pais = ?";
      params.push(pais);
    }

    sql += `
      GROUP BY c.id_cancion, p.id_pais
      ORDER BY p.nombre_pais ASC, total_reproducciones DESC
    `;

    // Limit seguro
    if (limit && !isNaN(limit) && Number(limit) > 0) {
      const safeLimit = parseInt(limit);
      sql += ` LIMIT ${safeLimit}`;
    }

    return await query(sql, params);
  }

  // ===============================
  // 💿 2️⃣ Ingresos por Artista y Discográfica (✅ versión final)
  // ===============================
  static async ingresosPorArtistaYDiscografica({ desde, hasta }) {
    let sql = `
      SELECT 
        ar.nombre AS nombre_artista,
        d.nombre AS nombre_discografica,
        p2.nombre_pais AS nombre_pais_discografica,
        SUM(p.importe) AS total_ingresos,
        COUNT(DISTINCT s.id_suscripcion) AS cantidad_suscripciones_activas,
        COUNT(DISTINCT c.id_cancion) AS total_canciones,
        ROUND(AVG(c.reproducciones), 2) AS promedio_reproducciones
      FROM pago p
      JOIN suscripcion s ON p.id_suscripcion = s.id_suscripcion
      JOIN album al ON 1=1
      JOIN artista ar ON al.id_artista = ar.id_artista
      JOIN discografica d ON al.id_discografica = d.id_discografica
      JOIN pais p2 ON d.id_pais = p2.id_pais
      JOIN cancion c ON c.id_album = al.id_album
      WHERE 1=1
    `;

    const params = [];

    // Filtros de fechas
    if (desde) {
      sql += " AND p.fecha_pago >= ?";
      params.push(desde);
    }
    if (hasta) {
      sql += " AND p.fecha_pago <= ?";
      params.push(hasta);
    }

    sql += `
      GROUP BY ar.id_artista, d.id_discografica, p2.id_pais
      ORDER BY total_ingresos DESC
    `;

    return await query(sql, params);
  }

  // ===============================
  // 🧍‍♂️ 3️⃣ Usuarios con más Playlists activas
  // ===============================
  static async usuariosConMasPlaylists({ limit }) {
    let sql = `
      SELECT 
        u.id_usuario,
        u.nombre_usuario,
        COUNT(pl.id_playlist) AS cantidad_playlists
      FROM usuario u
      JOIN playlist pl ON u.id_usuario = pl.id_usuario
      WHERE pl.estado = 'activa'
      GROUP BY u.id_usuario
      ORDER BY cantidad_playlists DESC
    `;

    if (limit && !isNaN(limit) && Number(limit) > 0) {
      const safeLimit = parseInt(limit);
      sql += ` LIMIT ${safeLimit}`;
    }

    return await query(sql);
  }

  // ===============================
  // 💰 4️⃣ Total de ingresos por mes
  // ===============================
  static async ingresosPorMes({ anio }) {
    let sql = `
      SELECT 
        YEAR(fecha_pago) AS anio,
        MONTH(fecha_pago) AS mes,
        SUM(importe) AS total_ingresos
      FROM pago
      WHERE 1=1
    `;

    const params = [];

    if (anio) {
      sql += " AND YEAR(fecha_pago) = ?";
      params.push(anio);
    }

    sql += `
      GROUP BY YEAR(fecha_pago), MONTH(fecha_pago)
      ORDER BY anio DESC, mes DESC
    `;

    return await query(sql, params);
  }

  // ===============================
  // 🧾 5️⃣ Promedio de duración por género
  // ===============================
  static async promedioDuracionPorGenero() {
    const sql = `
      SELECT 
        g.nombre AS genero,
        ROUND(AVG(c.duracion_seg), 2) AS duracion_promedio_seg
      FROM cancion c
      JOIN genero g ON c.id_genero = g.id_genero
      GROUP BY g.id_genero
      ORDER BY duracion_promedio_seg DESC
    `;
    return await query(sql);
  }
}
