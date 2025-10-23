// src/controllers/generosController.js
import { Genero } from "../models/Genero.js";

export const generosController = {
  // ==========================
  // 🎵 Listar géneros
  // ==========================
  async getAll(req, res, next) {
    try {
      const generos = await Genero.getAll();
      return res.json(generos);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🎵 Crear género
  // ==========================
  async create(req, res, next) {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({
          error: { code: 400, message: "El nombre del género es obligatorio" },
        });
      }

      // Verificar duplicado
      const existente = await Genero.findByName(nombre);
      if (existente) {
        return res.status(409).json({
          error: { code: 409, message: "El género ya existe" },
        });
      }

      const genero = await Genero.create(nombre);
      return res.status(201).json(genero);
    } catch (err) {
      next(err);
    }
  },
};
