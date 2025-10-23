// src/models/MetodoPago.js
import { query } from "../config/database.js";

export class MetodoPago {
  // ==========================
  // 🟢 Crear nuevo método de pago
  // ==========================
  static async create({
    id_usuario,
    tipo_forma_pago,
    cbu,
    banco_codigo,
    nro_tarjeta_masc,
    mes_caduca,
    anio_caduca,
  }) {
    const sql = `
      INSERT INTO metodo_pago 
      (id_usuario, tipo_forma_pago, cbu, banco_codigo, nro_tarjeta_masc, mes_caduca, anio_caduca)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      id_usuario,
      tipo_forma_pago,
      cbu || null,
      banco_codigo || null,
      nro_tarjeta_masc || null,
      mes_caduca || null,
      anio_caduca || null,
    ]);

    return {
      id_metodo_pago: result.insertId,
      id_usuario,
      tipo_forma_pago,
      cbu,
      banco_codigo,
      nro_tarjeta_masc,
      mes_caduca,
      anio_caduca,
    };
  }

  // ==========================
  // 📋 Listar métodos por usuario
  // ==========================
  static async getByUsuario(id_usuario) {
    return await query(
      "SELECT * FROM metodo_pago WHERE id_usuario = ? ORDER BY id_metodo_pago DESC",
      [id_usuario]
    );
  }
}
