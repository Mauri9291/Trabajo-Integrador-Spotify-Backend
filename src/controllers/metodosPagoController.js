// src/controllers/metodosPagoController.js
import { MetodoPago } from "../models/MetodoPago.js";
import { query } from "../config/database.js";

export const metodosPagoController = {
  // ==========================
  // 🟢 Crear método de pago
  // ==========================
  async create(req, res, next) {
    try {
      const {
        id_usuario,
        tipo_forma_pago,
        cbu,
        banco_codigo,
        nro_tarjeta,
        mes_caduca,
        anio_caduca,
        cvc, // ⚠️ No se debe usar
      } = req.body;

      // Validar campos básicos
      if (!id_usuario || !tipo_forma_pago) {
        return res.status(400).json({
          error: { code: 400, message: "id_usuario y tipo_forma_pago son obligatorios" },
        });
      }

      // No se permite enviar CVC
      if (cvc) {
        return res.status(422).json({
          error: { code: 422, message: "El campo CVC no debe enviarse ni almacenarse" },
        });
      }

      // Validar usuario existente
      const usuario = await query("SELECT * FROM usuario WHERE id_usuario = ?", [id_usuario]);
      if (usuario.length === 0) {
        return res.status(422).json({
          error: { code: 422, message: "El usuario indicado no existe" },
        });
      }

      // Enmascarar número de tarjeta (si viene)
      let nro_tarjeta_masc = null;
      if (nro_tarjeta) {
        const soloDigitos = nro_tarjeta.replace(/\D/g, "");
        if (soloDigitos.length < 4) {
          return res.status(422).json({
            error: { code: 422, message: "El número de tarjeta es inválido" },
          });
        }
        const ultimos4 = soloDigitos.slice(-4);
        nro_tarjeta_masc = `**** **** **** ${ultimos4}`;
      }

      // Crear método de pago
      const metodo = await MetodoPago.create({
        id_usuario,
        tipo_forma_pago,
        cbu,
        banco_codigo,
        nro_tarjeta_masc,
        mes_caduca,
        anio_caduca,
      });

      res.status(201).json(metodo);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 📋 Listar métodos de un usuario
  // ==========================
  async getByUsuario(req, res, next) {
    try {
      const { usuarioId } = req.query;
      if (!usuarioId) {
        return res.status(400).json({
          error: { code: 400, message: "Debe indicar el parámetro usuarioId" },
        });
      }

      const rows = await MetodoPago.getByUsuario(usuarioId);
      res.json(rows);
    } catch (err) {
      next(err);
    }
  },
};
