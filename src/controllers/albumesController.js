// src/controllers/albumesController.js
import { Album } from "../models/Album.js";
import { query } from "../config/database.js";

export const albumesController = {
  // GET /albumes
  async listar(req, res, next) {
    try {
      const { artistaId, q } = req.query;
      const albumes = await Album.getAll({ artistaId, q });
      return res.json(albumes);
    } catch (err) {
      next(err);
    }
  },

  // GET /albumes/:id
  async obtenerPorId(req, res, next) {
    try {
      const album = await Album.getById(req.params.id);
      if (!album) {
        return res.status(404).json({ error: { code: 404, message: "Álbum no encontrado" } });
      }
      return res.json(album);
    } catch (err) {
      next(err);
    }
  },

  // GET /albumes/:id/canciones
  async obtenerCanciones(req, res, next) {
    try {
      const canciones = await Album.getCanciones(req.params.id);
      return res.json(canciones);
    } catch (err) {
      next(err);
    }
  },

  // POST /albumes
  async crear(req, res, next) {
    try {
      const { titulo, id_artista, id_discografica, imagen_portada, anio_publicacion } = req.body;

      // 1) Validación de campos obligatorios
      if (!titulo || !id_artista || !id_discografica) {
        return res.status(400).json({
          error: { code: 400, message: "Faltan datos obligatorios: título, id_artista o id_discografica" },
        });
      }

      // 2) Detección de base de datos efectiva (para descartar “DB equivocada”)
      const dbinfo = await query("SELECT DATABASE() AS db");

      // 3) Verificar existencia REAL desde la MISMA conexión de Node
      const artista = await query("SELECT id_artista FROM artista WHERE id_artista = ?", [id_artista]);
      if (artista.length === 0) {
        return res.status(422).json({
          error: {
            code: 422,
            message: "El artista indicado no existe",
            details: { id_artista, database: dbinfo?.[0]?.db || null },
          },
        });
      }

      // Verificamos discográfica y que su FK a país sea válida (JOIN pais)
      const discografica = await query(
        `SELECT d.id_discografica
           FROM discografica d
           JOIN pais p ON p.id_pais = d.id_pais
          WHERE d.id_discografica = ?`,
        [id_discografica]
      );

      if (discografica.length === 0) {
        // Si no apareció con el JOIN (quizá porque id_pais es inválido),
        // chequeamos sin JOIN para dar mejor mensaje
        const discSinJoin = await query(
          "SELECT id_discografica, id_pais FROM discografica WHERE id_discografica = ?",
          [id_discografica]
        );

        if (discSinJoin.length === 0) {
          return res.status(422).json({
            error: {
              code: 422,
              message: "La discográfica indicada no existe",
              details: { id_discografica, database: dbinfo?.[0]?.db || null },
            },
          });
        } else {
          return res.status(422).json({
            error: {
              code: 422,
              message: "La discográfica existe pero su id_pais no referencia un país válido",
              details: {
                id_discografica,
                id_pais: discSinJoin[0].id_pais,
                database: dbinfo?.[0]?.db || null,
              },
            },
          });
        }
      }

      // 4) Validar duplicado (UNIQUE artista+titulo)
      const existe = await Album.findDuplicate(id_artista, titulo);
      if (existe) {
        return res.status(409).json({
          error: { code: 409, message: "Ya existe un álbum con ese título para este artista" },
        });
      }

      // 5) Crear
      const nuevo = await Album.create({
        titulo,
        id_artista,
        id_discografica,
        imagen_portada,
        anio_publicacion,
      });

      return res.status(201).json(nuevo);
    } catch (err) {
      next(err);
    }
  },
};
