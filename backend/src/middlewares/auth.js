// middlewares/auth.js
function auth(req, res, next) {
  const userId = req.headers["x-user-id"];

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  req.userId = Number(userId);
  next();
}

module.exports = auth;



