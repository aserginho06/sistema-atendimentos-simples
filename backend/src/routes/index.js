const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
  res.json({ status: "API OK" });
});

module.exports = router;
