// src/routes/generos.js
import express from "express";
import { generosController } from "../controllers/generosController.js";

const router = express.Router();

router.get("/", generosController.getAll);
router.post("/", generosController.create);

export default router;
