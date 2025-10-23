// src/routes/playlists.js
import express from "express";
import { playlistsController } from "../controllers/playlistsController.js";

const router = express.Router();

router.get("/", playlistsController.getAll);
router.get("/:id", playlistsController.getById);
router.post("/", playlistsController.create);
router.put("/:id", playlistsController.update);
router.post("/:id/canciones", playlistsController.addCancion);
router.delete("/:id/canciones/:idCancion", playlistsController.removeCancion);

export default router;
