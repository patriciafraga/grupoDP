const servicoListarTransacaoId = require("../../servicos/transacoes/servListarTransacaoporId");

const controladorListarTransacoesPorId = {
  async handle(req, res) {
    try {
        const {id} = req.perfilUsuario;
   
      const transacoesPorId = await servicoListarTransacaoId.execute(id);
      const transacoesCadastradas = {
          ...transacoesPorId,
        };
        
        console.log(transacoesCadastradas);

      return res.status(200).json(transacoesCadastradas);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },
};
module.exports = controladorListarTransacoesPorId;
