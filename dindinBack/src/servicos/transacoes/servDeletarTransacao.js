const repositorioTransacoes = require("../../repositorios/transacoes");

const servExcluirTransacao = {
  async execute(id) {
    try {
      const excluirTransacao = await repositorioTransacoes.delete(id);

      if (!excluirTransacao) return Error("Transação não encontrada!");

      return excluirTransacao;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
};
module.exports = servExcluirTransacao;
