// src/controllers/cancionesController.js
import { Cancion } from "../models/Cancion.js";
import { query } from "../config/database.js";

export const cancionesController = {
  // ==========================
  // 🎵 Crear canción
  // ==========================
  async create(req, res, next) {
    try {
      const { titulo, duracion_seg, id_album } = req.body;

      if (!titulo || !duracion_seg || !id_album) {
        return res.status(400).json({
          error: { code: 400, message: "Faltan campos obligatorios" },
        });
      }

      if (!Number.isInteger(duracion_seg) || duracion_seg <= 0) {
        return res.status(422).json({
          error: { code: 422, message: "La duración debe ser un número entero mayor que 0 (en segundos)" },
        });
      }

      const album = await query("SELECT * FROM album WHERE id_album = ?", [id_album]);
      if (album.length === 0) {
        return res.status(422).json({
          error: { code: 422, message: "El álbum especificado no existe" },
        });
      }

      const cancion = await Cancion.create({ titulo, duracion_seg, id_album });
      return res.status(201).json(cancion);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🎵 Listar canciones
  // ==========================
  async getAll(req, res, next) {
    try {
      const canciones = await Cancion.getAll(req.query);
      return res.json(canciones);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🎵 Obtener por ID
  // ==========================
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const cancion = await Cancion.getById(id);

      if (!cancion) {
        return res.status(404).json({ error: { code: 404, message: "Canción no encontrada" } });
      }

      return res.json(cancion);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🎵 Asociar género
  // ==========================
  async addGenero(req, res, next) {
    try {
      const { id } = req.params;
      const { id_genero } = req.body;

      const cancion = await Cancion.getById(id);
      if (!cancion)
        return res.status(404).json({ error: { code: 404, message: "Canción no encontrada" } });

      const genero = await query("SELECT * FROM genero WHERE id_genero = ?", [id_genero]);
      if (genero.length === 0)
        return res.status(404).json({ error: { code: 404, message: "Género no encontrado" } });

      await Cancion.addGenero(id, id_genero);
      return res.status(200).json({ message: "Género asociado correctamente" });
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🎵 Desasociar género
  // ==========================
  async removeGenero(req, res, next) {
    try {
      const { id, idGenero } = req.params;
      await Cancion.removeGenero(id, idGenero);
      return res.status(200).json({ message: "Género desasociado correctamente" });
    } catch (err) {
      next(err);
    }
  },
};
