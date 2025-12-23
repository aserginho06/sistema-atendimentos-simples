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

function excluir(req, res) {
    const{ id } = req.params;
    const index = atendimentos.findIndex(a => a.id === Number(id));

    if (index === -1){
        return res.status(404).json({ message:"Atendimento não encontrado"});
    }
    
    atendimentos.splice(index, 1);
    return res.status(204).send();
}

function editar(req, res) {
    const{ id } = req.params;
    const {titulo, descricao } = req.body;
    
    const atendimento = atendimentos.find(a => a.id ===Number(id));
    
    if (!atendimento) {
        return res.status(404).json({ message:"Atendimento não encontrado"});
    }
    if (!titulo || !descricao) {
        return res.status(400).json({ message: "Título e descrição são obrigatórios"})
    }
    atendimento.titulo = titulo;
    atendimento.descricao = descricao;

    return res.json(atendimento);
}
module.exports = {
    listar,
    criar,
    excluir,
    editar
};