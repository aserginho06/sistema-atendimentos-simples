const atendimentos = require("../models/atendimentos");

async function listar(req, res) {
    try{
        const dados = await Atendimento.listar();
        return res.status(200).json(dados);        
    }catch (err) {
        return res.status(500).json({ message: "Erro ao listar atendimentos"});
    }
}

async function criar(req, res) {
    const {titulo, descricao } = req.body;

    if (!titulo || !descricao) {
        return res.status(400).json({message:"Título e descrição são obrigatórios"})
    }

    try {
        const novo = await Atendimento.criar ({titulo, descricao });
        return res.status(201).json(novo);
    }   catch (err) {
        return res.status(500).json({message: "Erro ao criar atendimento"});
    }
}

async function excluir(req, res) {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
        return res.status(404).json({ message:"ID inválido"});
    }
    
    try {
        const removido = await Atendimento.excluir(id);

        if (!removido) {
            return res.status(404).json({message: "Atendimento não encontrado"});
        }
        
        return res.status(204).send();
    }   catch(err) {
        return res.status(500).json({ message: "Erro ao excluir atendimento"});
    }
}

async function editar(req, res) {
    const id = Number(req.params.id);
    const {titulo, descricao } = req.body;
    
    if (isNaN(id)) {
        return res.status(404).json({ message:"ID inválido"});
    }

    if (!titulo || !descricao) {
        return res.status(400).json({ message: "Título e descrição são obrigatórios"});
    }

    try {
        const atualizado = await Atendimento.editar(id,{titulo, descricao});

        if (!atualizado) {
            return res.status(404).json({ message: "Atendimento não encontrado"});
        }

        return res.status(200).json(atualizado);
    }   catch(err) {
        return res.status(500).json({ message: "Erro aoadiantar atendimento"});
    }
}


module.exports = {
    listar,
    criar,
    excluir,
    editar
};