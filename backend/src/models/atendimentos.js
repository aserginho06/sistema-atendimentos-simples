const db = require("../database/db");

function listar(usuario_id) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM atendimentos WHERE usuario_id = ?",
      [usuario_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

function criar({ titulo, descricao, usuario_id }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO atendimentos (titulo, descricao, status, usuario_id)
       VALUES (?, ?, ?, ?)`,
      [titulo, descricao, "aberto", usuario_id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          console.log("CRIADO PARA USER:", usuario_id);
          resolve({
            id: this.lastID,
            titulo,
            descricao,
            status: "aberto"
          });
        }
      }
    );
  });
}


function excluir(id, usuario_id) {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM atendimentos WHERE id = ? AND usuario_id = ?",
      [id, usuario_id],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      }
    );
  });
}


function editar(id, { titulo, descricao }, usuario_id) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE atendimentos
       SET titulo = ?, descricao = ?
       WHERE id = ? AND usuario_id = ?`,
      [titulo, descricao, id, usuario_id],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0 ? { id, titulo, descricao } : null);
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
