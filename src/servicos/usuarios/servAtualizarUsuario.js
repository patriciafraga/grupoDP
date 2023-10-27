const repositorioUsuario = require("../../repositorios/usuarios");

const atualizarUsuario = {
  async execute(id, dados) {
    try {
      const usuarioCriado = await repositorioUsuario.update(id, dados);

      console.log(usuarioCriado);

      if (!usuarioCriado) return Error("Não foi possível atualizar o usuario!");

      return usuarioCriado;
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({mensagem: `Erro interno do servidor!`})
    }
  },
};
module.exports = atualizarUsuario;
