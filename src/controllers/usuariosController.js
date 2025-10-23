// src/controllers/usuariosController.js
import { Usuario } from "../models/Usuario.js";
import { query } from "../config/database.js";

export const usuariosController = {
  // ==========================
  // 📘 GET /usuarios → listar todos
  // ==========================
  async listar(req, res, next) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const usuarios = await Usuario.getAll({ page, limit });
      return res.json(usuarios);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 📘 GET /usuarios/:id → obtener usuario por ID
  // ==========================
  async obtenerPorId(req, res, next) {
    try {
      const usuario = await Usuario.getById(req.params.id);
      if (!usuario) {
        return res.status(404).json({
          error: { code: 404, message: "Usuario no encontrado" },
        });
      }
      return res.json(usuario);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🟢 POST /usuarios → crear usuario
  // ==========================
  async crear(req, res, next) {
    try {
      const { email, password } = req.body;

      // 🔹 Validar campos obligatorios
      if (!email || !password) {
        return res.status(400).json({
          error: { code: 400, message: "El email y la contraseña son obligatorios" },
        });
      }

      // 🔹 Verificar si ya existe el email
      const existentes = await query("SELECT * FROM usuario WHERE email = ?", [email]);
      if (existentes.length > 0) {
        return res.status(409).json({
          error: { code: 409, message: "El email ya está registrado" },
        });
      }

      // 🔹 Crear usuario
      const nuevoUsuario = await Usuario.create(req.body);
      return res.status(201).json(nuevoUsuario);
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🟡 PUT /usuarios/:id → actualizar contraseña
  // ==========================
  async actualizar(req, res, next) {
    try {
      const { password } = req.body;
      const { id } = req.params;

      // 🔹 Validar que haya una nueva contraseña
      if (!password) {
        return res.status(400).json({
          error: { code: 400, message: "Debe indicar una nueva contraseña" },
        });
      }

      // 🔹 Verificar existencia del usuario
      const usuario = await Usuario.getById(id);
      if (!usuario) {
        return res.status(404).json({
          error: { code: 404, message: "Usuario no encontrado" },
        });
      }

      // 🔹 Actualizar password + fecha
      await Usuario.updatePassword(id, password);
      return res.json({ message: "Contraseña actualizada correctamente" });
    } catch (err) {
      next(err);
    }
  },

  // ==========================
  // 🧭 GET /usuarios/password-vencidas
  // ==========================
  async passwordVencidas(req, res, next) {
    try {
      const lista = await Usuario.findPasswordExpired();
      return res.json(lista);
    } catch (err) {
      next(err);
    }
  },
};
