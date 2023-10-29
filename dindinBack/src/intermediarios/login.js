const jwt = require("jsonwebtoken");
const { compare, hash } = require("bcrypt");
const pool = require("../conexao/conexao");
const infoToken = require("../configs/infoToken");

const validarUsuario = async (req, res) => {
  let { email, senha } = req.body;
  if (!email || !senha)
    return res
      .status(400)
      .json({ mensagem: `O email e a senha devem ser informados!` });

  try {
    const sql = `
      SELECT * FROM usuarios 
      WHERE email = $1`;

    const params = [email];

    const usuarioPorEmail = await pool.query(sql, params);

    if (usuarioPorEmail.rowCount < 1)
      return res.status(404).json({ mensagem: `Email ou senha inválidos` });

    //primeiro arg senha body, segundo arg senha BD
    const senhaValidada = await compare(senha, usuarioPorEmail.rows[0].senha); //boolean

    if (!senhaValidada)
      return res.status(404).json({ mensagem: `Email ou senha inválidos` });

    const id = usuarioPorEmail.rows[0].id;

    const token = jwt.sign({ id }, infoToken, {
      expiresIn: "24h",
    }); //ver
    console.log(token);
    const { senha: s, ...usuario } = usuarioPorEmail.rows[0];

    return res.status(200).json({ usuario, token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: `Erro interno do servidor!` });
  }
};

module.exports = validarUsuario;
