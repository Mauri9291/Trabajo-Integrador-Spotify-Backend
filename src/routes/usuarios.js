// src/routes/usuarios.js
import express from "express";
import { usuariosController } from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/", usuariosController.listar);
router.get("/password-vencidas", usuariosController.passwordVencidas);
router.get("/:id", usuariosController.obtenerPorId);
router.post("/", usuariosController.crear);
router.put("/:id", usuariosController.actualizar);

export default router;
