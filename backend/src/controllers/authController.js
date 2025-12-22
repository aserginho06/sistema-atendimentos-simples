function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  if (email === "admin@email.com" && senha === "123456") {
    return res.json({
      message: "Login realizado com sucesso",
      user: {
        nome: "Administrador",
        email
      }
    });
  }

  return res.status(401).json({ message: "Credenciais inválidas" });
}

module.exports = { login };
