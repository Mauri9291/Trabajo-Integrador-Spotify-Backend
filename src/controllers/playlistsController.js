// src/controllers/playlistsController.js
import { Playlist } from "../models/Playlist.js";
import { query } from "../config/database.js";

export const playlistsController = {
  // ==========================
  // 🎵 Listar todas las playlists
  // ==========================
  async getAll(req, res, next) {
    try {
      const playlists = await Playlist.getAll();
      res.json(playlists);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🎵 Obtener playlist por ID
  // ==========================
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const playlist = await Playlist.getById(id);

      if (!playlist) {
        return res
          .status(404)
          .json({ error: { code: 404, message: "Playlist no encontrada" } });
      }

      const canciones = await Playlist.getCanciones(id);
      playlist.canciones = canciones;
      playlist.cant_canciones = canciones.length;

      res.json(playlist);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🎵 Crear nueva playlist
  // ==========================
  async create(req, res, next) {
    try {
      const { titulo, id_usuario } = req.body;

      if (!titulo || !id_usuario) {
        return res.status(400).json({
          error: { code: 400, message: "El título y el usuario son obligatorios" },
        });
      }

      const usuario = await query("SELECT * FROM usuario WHERE id_usuario = ?", [id_usuario]);
      if (usuario.length === 0) {
        return res.status(422).json({
          error: { code: 422, message: "El usuario indicado no existe" },
        });
      }

      const playlist = await Playlist.create({ titulo, id_usuario });
      res.status(201).json(playlist);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🎵 Actualizar playlist
  // ==========================
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { titulo, estado, fecha_eliminada } = req.body;

      const playlist = await Playlist.getById(id);
      if (!playlist)
        return res
          .status(404)
          .json({ error: { code: 404, message: "Playlist no encontrada" } });

      if (estado === "eliminada" && !fecha_eliminada) {
        return res.status(422).json({
          error: { code: 422, message: "Las playlists eliminadas deben tener fecha_eliminada" },
        });
      }

      if (estado === "activa" && fecha_eliminada) {
        return res.status(422).json({
          error: { code: 422, message: "Las playlists activas no deben tener fecha_eliminada" },
        });
      }

      await Playlist.update(id, { titulo, estado, fecha_eliminada });
      res.json({ message: "Playlist actualizada correctamente" });
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🎵 Agregar canción (con control de duplicado)
  // ==========================
  async addCancion(req, res, next) {
    try {
      const { id } = req.params;
      const { id_cancion, orden } = req.body;

      // Validar existencia de playlist
      const playlist = await Playlist.getById(id);
      if (!playlist)
        return res
          .status(404)
          .json({ error: { code: 404, message: "Playlist no encontrada" } });

      // Validar existencia de canción
      const cancion = await query("SELECT * FROM cancion WHERE id_cancion = ?", [id_cancion]);
      if (cancion.length === 0)
        return res
          .status(422)
          .json({ error: { code: 422, message: "Canción no encontrada" } });

      // ⚠️ Verificar si ya existe en la playlist
      const existente = await query(
        "SELECT * FROM playlist_cancion WHERE id_playlist = ? AND id_cancion = ?",
        [id, id_cancion]
      );

      if (existente.length > 0) {
        return res.status(409).json({
          error: {
            code: 409,
            message: "La canción ya está en esta playlist",
            details: { id_playlist: id, id_cancion },
          },
        });
      }

      // Insertar si no está duplicada
      await Playlist.addCancion(id, id_cancion, orden || 1);
      res.json({ message: "Canción agregada correctamente" });
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🎵 Quitar canción de playlist
  // ==========================
  async removeCancion(req, res, next) {
    try {
      const { id, idCancion } = req.params;
      await Playlist.removeCancion(id, idCancion);
      res.json({ message: "Canción quitada correctamente" });
    } catch (err) {
      next(err);
    }
  },
};
