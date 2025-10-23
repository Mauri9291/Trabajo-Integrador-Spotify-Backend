// src/controllers/vistasController.js
import { Vistas } from "../models/Vistas.js";

export const cancionesPopularesPorPais = async (req, res) => {
  try {
    const data = await Vistas.cancionesPopularesPorPais(req.query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: 500, message: error.message } });
  }
};

export const ingresosPorArtistaDiscografica = async (req, res) => {
  try {
    const data = await Vistas.ingresosPorArtistaYDiscografica(req.query); // ✅ FIX
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: 500, message: error.message } });
  }
};

export const usuariosConMasPlaylists = async (req, res) => {
  try {
    const data = await Vistas.usuariosConMasPlaylists(req.query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: 500, message: error.message } });
  }
};

export const ingresosPorMes = async (req, res) => {
  try {
    const data = await Vistas.ingresosPorMes(req.query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: 500, message: error.message } });
  }
};

export const promedioDuracionPorGenero = async (req, res) => {
  try {
    const data = await Vistas.promedioDuracionPorGenero();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: 500, message: error.message } });
  }
};
