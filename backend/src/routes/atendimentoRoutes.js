const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const controller = require("../controllers/atendimentoController");

router.use(auth); // 👈 IMPORTANTE

router.get("/", controller.listar);
router.post("/", controller.criar);
router.put("/:id", controller.editar);
router.delete("/:id", controller.excluir);

module.exports = router;
