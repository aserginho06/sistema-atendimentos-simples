const atendimentos = require("../models/atendimentos");

function listar(req, res) {
    res.json(atendimentos);
}

function criar(req, res) {
    const {titulo, descricao } = req.body;

    if (!titulo || !descricao) {
        return res.status(400).json({message:"Título e descrição são obrigatórios"})
    }
    
    const novoAtendimento  = {
        id: atendimentos.length +1,
        titulo,
        descricao,
        status:"aberto",
        data: new Date()
    };

    atendimentos.push(novoAtendimento);

    res.status(201).json(novoAtendimento);
}

module.exports = {
    listar,
    criar
};