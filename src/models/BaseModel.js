// src/models/BaseModel.js
import { query } from "../config/database.js";

export class BaseModel {
  static async findAll(tableName) {
    return await query(`SELECT * FROM ${tableName}`);
  }

  static async findById(tableName, id) {
    const rows = await query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
    return rows[0];
  }

  static async deleteById(tableName, id) {
    return await query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
  }
}
