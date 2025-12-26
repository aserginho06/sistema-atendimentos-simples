const db = require("../database/db");

function listar() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM atendimentos", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function criar({ titulo, descricao }) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO atendimentos (titulo, descricao, status) VALUES (?, ?, ?)",
      [titulo, descricao, "aberto"],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, titulo, descricao, status: "aberto" });
      }
    );
  });
}

function excluir(id) {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM atendimentos WHERE id = ?",
      [id],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      }
    );
  });
}

function editar(id, { titulo, descricao }) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE atendimentos SET titulo = ?, descricao = ? WHERE id = ?",
      [titulo, descricao, id],
      function (err) {
        if (err) reject(err);
        else {
          if (this.changes === 0) resolve(null);
          else resolve({ id, titulo, descricao });
        }
      }
    );
  });
}

module.exports = {
  listar,
  criar,
  excluir,
  editar
};
