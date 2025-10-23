// src/models/MetodoPago.js
import { query } from "../config/database.js";

export class MetodoPago {
  static async create({ id_usuario, tipo_forma_pago, cbu, banco_codigo, nro_tarjeta, mes_caduca, anio_caduca }) {
    // Validar tipo_forma_pago válido
    const tiposValidos = ["tarjeta", "transferencia", "debito"];
    if (!tiposValidos.includes(tipo_forma_pago)) {
      const error = new Error(`El tipo_forma_pago debe ser uno de: ${tiposValidos.join(", ")}`);
      error.status = 422;
      throw error;
    }

    // Enmascarar número de tarjeta
    const nro_tarjeta_masc = nro_tarjeta
      ? `**** **** **** ${nro_tarjeta.slice(-4)}`
      : null;

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
      nro_tarjeta_masc,
      mes_caduca || null,
      anio_caduca || null,
    ]);

    return {
      id_metodo_pago: result.insertId,
      id_usuario,
      tipo_forma_pago,
      banco_codigo,
      nro_tarjeta_masc,
      mes_caduca,
      anio_caduca,
    };
  }

  static async getByUsuario(id_usuario) {
    return await query(
      `SELECT * FROM metodo_pago WHERE id_usuario = ? ORDER BY id_metodo_pago DESC`,
      [id_usuario]
    );
  }
}
