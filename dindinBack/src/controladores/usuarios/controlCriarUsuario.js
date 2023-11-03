const pool = require("../../conexao/conexao");
const servico = require("../../servicos/usuarios/servCriarUsuario");
const { hash } = require("bcrypt");
const { randomInt } = require("node:crypto");

const controladorCriarUsuario = {
  async handle(req, res) {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha)
        return res.status(400).json({
          mensagem: `O nome, o email e a senha devem ser informados!`,
        });

      const sqlValidar = `
        SELECT * FROM usuarios 
       WHERE email = $1`;

      const params = [email];

      const { rowCount } = await pool.query(sqlValidar, params);

      if (rowCount === 1)
        return res.status(404).json({
          mensagem: `Já existe usuário cadastrado com o e-mail informado.`,
        });

      const salt = randomInt(7, 10);

      const senhaValida = await hash(senha, salt);
      const usuarioCriado = await servico.execute({
        nome,
        email,
        senha: senhaValida,
      });

      const { senha: s, ...respostaUsuario } = usuarioCriado;
      return res.status(201).json(respostaUsuario);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
module.exports = controladorCriarUsuario;
