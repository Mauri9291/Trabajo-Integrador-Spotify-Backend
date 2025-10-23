// src/controllers/suscripcionesController.js
import { Suscripcion } from "../models/Suscripcion.js";
import { query } from "../config/database.js";

export const suscripcionesController = {
  // ==========================
  // 🟢 Crear suscripción
  // ==========================
  async create(req, res, next) {
    try {
      const { id_usuario, tipo_usuario, fecha_inicio, fecha_renovacion } = req.body;

      // Validar campos requeridos
      if (!id_usuario || !tipo_usuario || !fecha_inicio || !fecha_renovacion) {
        return res.status(400).json({
          error: { code: 400, message: "Todos los campos son obligatorios" },
        });
      }

      // Validar usuario
      const usuario = await query("SELECT * FROM usuario WHERE id_usuario = ?", [id_usuario]);
      if (usuario.length === 0) {
        return res.status(422).json({
          error: { code: 422, message: "El usuario indicado no existe" },
        });
      }

      // Validar tipo_usuario
      const tipo = await query("SELECT * FROM tipo_usuario WHERE id_tipo_usuario = ?", [
        tipo_usuario,
      ]);
      if (tipo.length === 0) {
        return res.status(422).json({
          error: { code: 422, message: "El tipo de usuario indicado no existe" },
        });
      }

      // Validar fechas
      const inicio = new Date(fecha_inicio);
      const renovacion = new Date(fecha_renovacion);
      if (renovacion <= inicio) {
        return res.status(422).json({
          error: {
            code: 422,
            message: "La fecha de renovación debe ser posterior a la fecha de inicio",
          },
        });
      }

      // Crear suscripción
      const suscripcion = await Suscripcion.create({
        id_usuario,
        tipo_usuario,
        fecha_inicio: fecha_inicio.replace("T", " ").replace("Z", ""),
        fecha_renovacion: fecha_renovacion.replace("T", " ").replace("Z", ""),
      });

      res.status(201).json(suscripcion);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 📋 Listar suscripciones
  // ==========================
  async getAll(req, res, next) {
    try {
      const rows = await Suscripcion.getAll();
      res.json(rows);
    } catch (err) {
      next(err);
    }
  },
};
