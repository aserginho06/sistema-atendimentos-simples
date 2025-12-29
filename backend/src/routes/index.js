const express = require("express");
const router = express.Router();

const atendimentoRoutes = require("./atendimentoRoutes");
const authRoutes = require("./authRoutes");

router.use("/atendimentos", atendimentoRoutes);
router.use("/auth", authRoutes);

module.exports = router;

