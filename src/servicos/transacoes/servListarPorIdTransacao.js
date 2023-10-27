const repositorioTransacoes = require("../../repositorios/transacoes");

const servicolistarTransacaoPorId = {
  async execute(id, usuario_id) {
    try {
      const idTransacao = await repositorioTransacoes.findTransByPk(id, usuario_id);

      //console.log(idTransacao);

      if (!idTransacao) return Error("Transações não encontradas!");

      return idTransacao;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
};
module.exports = servicolistarTransacaoPorId;