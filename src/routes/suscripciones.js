import express from "express";
import { suscripcionesController } from "../controllers/suscripcionesController.js";

const router = express.Router();

router.post("/", suscripcionesController.create);
router.get("/", suscripcionesController.getAll);

export default router;
