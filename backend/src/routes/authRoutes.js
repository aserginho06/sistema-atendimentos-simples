console.log("AUTH ROUTES CARREGADAS");

const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

console.log("login =", login);
console.log("register =", register);

router.post("/login", login);
router.post("/register", register);



module.exports = router;
