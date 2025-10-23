// server.js
import express from "express";
import { env } from "./src/config/index.js";
import { db } from "./src/config/database.js";
import app from "./src/app.js";

const PORT = env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`[OK] API Spotify corriendo en http://localhost:${PORT}`);
});
