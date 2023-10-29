const jwt = require("jsonwebtoken");
const pool = require("../conexao/conexao");
const infoToken = require("../configs/infoToken");

const autenticacao = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
  const tokenHeader = authorization.split(" ")[1];

  try {
    //desestrutura para pegar o id do payload - gerado em login:
    const { id } = jwt.verify(tokenHeader, infoToken);

    const { rows, rowCount } = await pool.query(
      "select * from usuarios where id = $1",
      [id]
    );

    const { senha: s_, ...perfilPorToken } = rows[0];

    req.perfilUsuario = perfilPorToken;

    if (rowCount === 0) {
      return res.status(401).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
};

const obterPerfil = (req, res) => {
  console.log(req.perfilUsuario);
  return res.json(req.perfilUsuario);
};

module.exports = {
  autenticacao,
  obterPerfil,
};
