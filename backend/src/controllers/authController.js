const db = require("../database/db"); // ajusta o caminho se precisar
const bcrypt = require("bcrypt");
//REGISTER
function register(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  const sql = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES (?, ?, ?)
  `;

  const senhaHash = bcrypt.hashSync(senha, 10);

  db.run(sql, [nome, email, senhaHash], function (err) {
    if (err) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  });
}
//LOGIN 
function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha obrigatórios" });
  }

  const sql = `
    SELECT * FROM usuarios
    WHERE email = ?
  `;

  db.get(sql, [email], (err, usuario) => {
    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    return res.json({
      message: "Login ok",
      usuario_id: usuario.id
    });
  });
}

function listar(req, res) {
  const usuario_id = req.usuario_id;

  const sql = `
    SELECT * FROM atendimentos
    WHERE usuario_id = ?
    ORDER BY criado_em DESC
  `;

  db.all(sql, [usuario_id], (err, rows) => {
    if (err) return res.status(500).json({ message: "Erro ao buscar" });
    res.json(rows);
  });
}

function criar(req, res) {
  const { titulo, descricao } = req.body;
  const usuario_id = req.usuario_id;

  if (!titulo || !descricao) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  const sql = `
    INSERT INTO atendimentos (titulo, descricao, status, usuario_id)
    VALUES (?, ?, 'aberto', ?)
  `;

  db.run(sql, [titulo, descricao, usuario_id], function (err) {
    if (err) return res.status(500).json({ message: "Erro ao criar" });
    res.status(201).json({ id: this.lastID });
  });
}

function excluir(req, res) {
  const { id } = req.params;
  const usuario_id = req.usuario_id;

  const sql = `
    DELETE FROM atendimentos
    WHERE id = ? AND usuario_id = ?
  `;

  db.run(sql, [id, usuario_id], function (err) {
    if (err) return res.status(500).json({ message: "Erro ao excluir" });
    if (this.changes === 0) {
      return res.status(403).json({ message: "Sem permissão" });
    }
    res.status(204).send();
  });
}

module.exports = { register, login };
