import { Database } from "bun:sqlite";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const configuredPath = import.meta.env.DEV
  ? import.meta.env.SQLITE_DB_PATH
  : process.env.SQLITE_DB_PATH;
if (!configuredPath) throw new Error("SQLITE_DB_PATH doit être défini dans .env.");
const dbPath = resolve(configuredPath);
if (!existsSync(dbPath)) throw new Error(`Base SQLite introuvable : ${dbPath}`);
const db = new Database(dbPath);

export function getClients() {
  return db.query(`
    SELECT
      id,
      name,
      email,
      address,
      latitude,
      longitude
    FROM clients
    ORDER BY name
  `).all();
}

export default db;