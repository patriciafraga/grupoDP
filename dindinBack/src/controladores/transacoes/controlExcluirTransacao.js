const servExcluirTransacao = require("../../servicos/transacoes/servDeletarTransacao");

const controladorExcluirTransacao = {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const transacaoAExcluir = await servExcluirTransacao.execute(id);

      console.log(transacaoAExcluir);

      return res.status(200).send();
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },
};
module.exports = controladorExcluirTransacao;
