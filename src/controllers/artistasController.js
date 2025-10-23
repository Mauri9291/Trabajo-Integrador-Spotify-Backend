// src/controllers/artistasController.js
import { Artista } from "../models/Artista.js";

export const artistasController = {
  // ==========================
  // 📘 GET /artistas → listar todos
  // ==========================
  async listar(req, res, next) {
    try {
      const artistas = await Artista.getAll();
      return res.json(artistas);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 📘 GET /artistas/:id → detalle
  // ==========================
  async obtenerPorId(req, res, next) {
    try {
      const { id } = req.params;
      const artista = await Artista.getById(id);

      if (!artista) {
        return res.status(404).json({
          error: { code: 404, message: "Artista no encontrado" },
        });
      }

      return res.json(artista);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🟢 POST /artistas → crear
  // ==========================
  async crear(req, res, next) {
    try {
      const { nombre, imagen_url } = req.body;

      // Validar nombre obligatorio
      if (!nombre) {
        return res.status(400).json({
          error: { code: 400, message: "El nombre del artista es obligatorio" },
        });
      }

      // Validar nombre único
      const existente = await Artista.getByName(nombre);
      if (existente) {
        return res.status(409).json({
          error: { code: 409, message: "Ya existe un artista con ese nombre" },
        });
      }

      // Crear artista
      const nuevo = await Artista.create({ nombre, imagen_url });
      return res.status(201).json(nuevo);
    } catch (err) {
      next(err);
    }
  },
};
