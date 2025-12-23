const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const atendimentoRoutes = require("./atendimentoRoutes");

router.use("/auth", authRoutes);
router.use("/atendimentos", atendimentoRoutes);

router.get("/", (req, res) => {
  res.json({ status: "API OK" });
});

module.exports = router;
