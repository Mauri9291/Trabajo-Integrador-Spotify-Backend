// src/routes/metodos-pago.js
import express from "express";
import { metodosPagoController } from "../controllers/metodosPagoController.js";

const router = express.Router();

router.post("/", metodosPagoController.create);
router.get("/", metodosPagoController.getByUsuario);

export default router;
