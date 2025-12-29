const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../../../database/database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Banco SQLite conectado com sucesso");
  }
});

db.serialize(() => {
  // 🔒 ATIVA FOREIGN KEYS
  db.run("PRAGMA foreign_keys = ON");

  // 👤 TABELA USUÁRIOS (PRIMEIRO)
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 🧹 DROP ATENDIMENTOS (SE EXISTIR)
  db.run(`DROP TABLE IF EXISTS atendimentos`);

  // 📋 TABELA ATENDIMENTOS (COM FK)
  db.run(`
    CREATE TABLE atendimentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      status TEXT NOT NULL,
      usuario_id INTEGER NOT NULL,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);
});

module.exports = db;
