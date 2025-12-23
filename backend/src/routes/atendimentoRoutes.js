const express = require("express");
const router = express.Router();
const { listar, criar } = require("../controllers/atendimentoController");

router.get("/", listar);
router.post("/", criar);

module.exports = router;
