# 🎧 Spotify Backend — Trabajo Integrador (Diplomatura en Programación Backend)

Proyecto backend inspirado en **Spotify**, desarrollado en **Node.js + Express + MySQL**.  
Cumple con los requerimientos del trabajo integrador de la Diplomatura, incluyendo manejo de usuarios, artistas, álbumes, canciones, playlists, pagos, suscripciones y vistas analíticas avanzadas.

---

## 🚀 Descripción del Proyecto

Este backend simula las operaciones básicas de una plataforma musical tipo Spotify:

- Registro, actualización y consulta de **usuarios**.
- Gestión de **artistas**, **álbumes**, **canciones** y **géneros**.
- Creación y manejo de **playlists** (con soft delete y control de duplicados).
- Control de **suscripciones**, **métodos de pago** y **pagos**.
- Generación de **vistas analíticas SQL avanzadas** (canciones más populares, ingresos por discográfica, etc.).

El sistema está desarrollado con una arquitectura modular y buenas prácticas:
- Control centralizado de errores.
- Validaciones en cada endpoint.
- Seguridad con `helmet`, `cors` y `express-rate-limit`.
- Logs HTTP con `morgan`.
- Variables de entorno con `dotenv`.

---

## 🧩 Tecnologías Utilizadas

| Componente | Tecnología |
|-------------|-------------|
| Lenguaje | Node.js (v22.x) |
| Framework | Express.js |
| Base de Datos | MySQL (InnoDB) |
| ORM / Query Layer | mysql2/promise |
| Variables de entorno | dotenv |
| Seguridad | helmet, cors, express-rate-limit |
| Logs | morgan |
| Ejecución | nodemon (dev) |

---

## ⚙️ Requisitos Previos

Asegurate de tener instalado:

- **Node.js v18 o superior**
- **MySQL Server** (con usuario y base de datos creados)
- **npm** (v8 o superior)

---

## 🏗️ Estructura del Proyecto

```
Trabajo-Integrador-Spotify-Backend/
│
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── index.js
│   │
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Artista.js
│   │   ├── Album.js
│   │   ├── Cancion.js
│   │   ├── Genero.js
│   │   ├── Playlist.js
│   │   ├── Suscripcion.js
│   │   ├── MetodoPago.js
│   │   ├── Pago.js
│   │   └── Vistas.js
│   │
│   ├── controllers/
│   │   ├── usuariosController.js
│   │   ├── artistasController.js
│   │   ├── albumesController.js
│   │   ├── cancionesController.js
│   │   ├── generosController.js
│   │   ├── playlistsController.js
│   │   ├── suscripcionesController.js
│   │   ├── metodosPagoController.js
│   │   ├── pagosController.js
│   │   └── vistasController.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── usuarios.js
│   │   ├── artistas.js
│   │   ├── albumes.js
│   │   ├── canciones.js
│   │   ├── generos.js
│   │   ├── playlists.js
│   │   ├── suscripciones.js
│   │   ├── metodos-pago.js
│   │   ├── pagos.js
│   │   └── vistas.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── package.json
├── api.http
└── README.md
```

---

## 🔧 Instalación y Configuración

1️⃣ **Cloná o descargá el proyecto**

```bash
git clone https://github.com/usuario/spotify-backend.git
cd Trabajo-Integrador-Spotify-Backend
```

2️⃣ **Instalá las dependencias**

```bash
npm install
```

3️⃣ **Configurá el archivo `.env`**

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=spotify
PORT=3000
NODE_ENV=development
```

4️⃣ **Inicializá la base de datos MySQL**

```bash
mysql -u root -p
CREATE DATABASE spotify;
USE spotify;
SOURCE ./scripts/spotify.sql;
```

5️⃣ **Ejecutá el servidor**

```bash
npm run dev
```

---

## 🧪 Pruebas con `api.http`

Contiene ejemplos para **todas las operaciones**: usuarios, artistas, álbumes, canciones, playlists, pagos, suscripciones y vistas.

Ejemplo:
```
POST http://localhost:3000/api/v1/usuarios
Content-Type: application/json

{
  "email": "ana.garcia@example.com",
  "password": "Secr3t0!",
  "fecha_nac": "1995-05-20",
  "sexo": "F",
  "cp": "4600",
  "id_pais": 1,
  "tipo_usuario_actual": 1
}
```

---

## 🧾 Autor

**Mauricio Nicolás Felippetti**  

