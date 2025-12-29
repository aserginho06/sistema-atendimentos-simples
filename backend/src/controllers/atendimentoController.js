const Atendimento = require("../models/atendimentos");


async function listar(req, res) {
  try {
    console.log("LISTANDO PARA USER:", req.userId);

    const dados = await Atendimento.listar(req.userId);
    return res.status(200).json(dados);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao listar atendimentos" });
  }
}



async function criar(req, res) {
    const { titulo, descricao } = req.body;
    const usuario_id = req.userId; // 👈 VEM DO MIDDLEWARE auth

    if (!titulo || !descricao) {
        return res.status(400).json({ message: "Título e descrição são obrigatórios" });
    }

    try {
        const novo = await Atendimento.criar({
            titulo,
            descricao,
            usuario_id
        });

        return res.status(201).json(novo);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao criar atendimento" });
    }
}


async function excluir(req, res) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const removido = await Atendimento.excluir(id, req.userId);

    if (!removido) {
      return res.status(403).json({ message: "Sem permissão ou não encontrado" });
    }

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao excluir atendimento" });
  }
}


async function editar(req, res) {
  const id = Number(req.params.id);
  const { titulo, descricao } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  if (!titulo || !descricao) {
    return res.status(400).json({ message: "Título e descrição são obrigatórios" });
  }

  try {
    const atualizado = await Atendimento.editar(
      id,
      { titulo, descricao },
      req.userId // 👈 USUÁRIO VEM DO MIDDLEWARE
    );

    if (!atualizado) {
      return res.status(403).json({ message: "Sem permissão ou não encontrado" });
    }

    return res.status(200).json(atualizado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao editar atendimento" });
  }
}



module.exports = {
    listar,
    criar,
    excluir,
    editar
};