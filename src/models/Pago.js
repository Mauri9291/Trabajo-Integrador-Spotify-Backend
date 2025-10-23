// src/models/Pago.js
import { query } from "../config/database.js";

export class Pago {
  // ==========================
  // 🧾 Registrar un nuevo pago
  // ==========================
  static async create({ id_usuario, id_suscripcion, id_metodo_pago, importe, fecha_pago }) {
    const result = await query(
      `
      INSERT INTO pago (id_usuario, id_suscripcion, id_metodo_pago, importe, fecha_pago)
      VALUES (?, ?, ?, ?, ?)
      `,
      [id_usuario, id_suscripcion, id_metodo_pago, importe, fecha_pago]
    );

    return {
      id_pago: result.insertId,
      id_usuario,
      id_suscripcion,
      id_metodo_pago,
      importe,
      fecha_pago,
    };
  }

  // ==========================
  // 💰 Listar pagos con filtros opcionales
  // ==========================
  static async getAll({ usuarioId, desde, hasta }) {
    let sql = `
      SELECT 
        p.id_pago,
        p.id_usuario,
        p.id_suscripcion,
        p.id_metodo_pago,
        p.importe,
        p.fecha_pago,
        u.email AS usuario_email,
        s.fecha_inicio AS suscripcion_inicio,
        s.fecha_renovacion AS suscripcion_renovacion,
        m.tipo_forma_pago,
        m.banco_codigo
      FROM pago p
      JOIN usuario u ON p.id_usuario = u.id_usuario
      JOIN suscripcion s ON p.id_suscripcion = s.id_suscripcion
      JOIN metodo_pago m ON p.id_metodo_pago = m.id_metodo_pago
      WHERE 1=1
    `;

    const params = [];

    if (usuarioId) {
      sql += " AND p.id_usuario = ?";
      params.push(usuarioId);
    }
    if (desde) {
      sql += " AND p.fecha_pago >= ?";
      params.push(desde);
    }
    if (hasta) {
      sql += " AND p.fecha_pago <= ?";
      params.push(hasta);
    }

    sql += " ORDER BY p.fecha_pago DESC";

    return await query(sql, params);
  }
}
