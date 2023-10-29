const servico = require("../../servicos/usuarios/servAtualizarUsuario");
const pool = require("../../conexao/conexao");
const { hash } = require("bcrypt");

const controladorAtualizarUsuario = {
  async handle(req, res) {
    try {
      const { id } = req.perfilUsuario;
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha)
        return res.status(400).json({
          mensagem: `Todos os campos devem ser informados(nome, email, senha).`,
        });
      console.log(id);
      const sql = `
      SELECT email FROM usuarios 
      WHERE id != $1 AND email = $2`;
      const params = [id, email];

      const { rowCount } = await pool.query(sql, params);

      if (rowCount > 0)
        return res.status(404).json({
          mensagem: `Já existe usuário cadastrado com o e-mail informado.`,
        });

      const senhaValida = await hash(senha, 10);
      const usuarioAtualizado = await servico.execute(id, {
        nome,
        email,
        senha: senhaValida,
      });

      //const { senha: _, ...atualizacao } = usuarioAtualizado;

      return res.status(201).send();
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
module.exports = controladorAtualizarUsuario;
