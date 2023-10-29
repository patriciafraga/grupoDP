const servicoListarTransacaoUsuario = require("../../servicos/transacoes/servListarTransacaoporUsuario");

const controladorListarTransacoesPorUsuario = {
  async handle(req, res) {
    try {
      const { id } = req.perfilUsuario;
      
      const transacoesPorId = await servicoListarTransacaoUsuario.execute(id);

      console.log(transacoesPorId);

      return res.status(200).json(transacoesPorId);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },
};
module.exports = controladorListarTransacoesPorUsuario;
