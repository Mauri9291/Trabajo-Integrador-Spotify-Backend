// src/controllers/pagosController.js
import { Pago } from "../models/Pago.js";
import { query } from "../config/database.js";

export const pagosController = {
  // ==========================
  // 📋 Listar pagos
  // ==========================
  async listar(req, res, next) {
    try {
      const { id_usuario, id_suscripcion } = req.query;
      const pagos = await Pago.getAll({ id_usuario, id_suscripcion });
      return res.json(pagos);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🔍 Obtener pago por ID
  // ==========================
  async obtenerPorId(req, res, next) {
    try {
      const pago = await Pago.getById(req.params.id);
      if (!pago)
        return res.status(404).json({ error: { code: 404, message: "Pago no encontrado" } });
      return res.json(pago);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 💰 Crear nuevo pago
  // ==========================
  async crear(req, res, next) {
    try {
      const { id_usuario, id_suscripcion, id_metodo_pago, monto, fecha_pago } = req.body;

      // Validaciones básicas
      if (!id_usuario || !id_metodo_pago || !monto || !fecha_pago) {
        return res.status(400).json({
          error: { code: 400, message: "id_usuario, id_metodo_pago, monto y fecha_pago son obligatorios" },
        });
      }

      if (isNaN(monto) || Number(monto) <= 0) {
        return res
          .status(422)
          .json({ error: { code: 422, message: "El monto debe ser un número mayor que 0" } });
      }

      // Validar usuario
      const usuario = await query("SELECT id_usuario FROM usuario WHERE id_usuario = ?", [id_usuario]);
      if (usuario.length === 0)
        return res.status(422).json({ error: { code: 422, message: "El usuario indicado no existe" } });

      // Validar método de pago
      const metodo = await query("SELECT id_metodo_pago, id_usuario FROM metodo_pago WHERE id_metodo_pago = ?", [
        id_metodo_pago,
      ]);
      if (metodo.length === 0)
        return res
          .status(422)
          .json({ error: { code: 422, message: "El método de pago indicado no existe" } });

      // Validar pertenencia del método al usuario
      if (metodo[0].id_usuario !== Number(id_usuario)) {
        return res.status(403).json({
          error: { code: 403, message: "El método de pago no pertenece al usuario especificado" },
        });
      }

      // Validar suscripción (opcional)
      if (id_suscripcion) {
        const sus = await query("SELECT id_suscripcion FROM suscripcion WHERE id_suscripcion = ?", [id_suscripcion]);
        if (sus.length === 0)
          return res
            .status(422)
            .json({ error: { code: 422, message: "La suscripción indicada no existe" } });
      }

      // Crear pago
      const nuevo = await Pago.create({
        id_usuario,
        id_suscripcion,
        id_metodo_pago,
        monto,
        fecha_pago,
      });

      return res.status(201).json(nuevo);
    } catch (err) {
      next(err);
    }
  },
};
