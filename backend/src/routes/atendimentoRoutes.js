const express = require("express");
const router = express.Router();
const { listar, criar, excluir,editar } = require("../controllers/atendimentoController");

router.get("/", listar);
router.post("/", criar);
router.delete("/:id",excluir);
router.put("/:id", editar);

module.exports = router;
