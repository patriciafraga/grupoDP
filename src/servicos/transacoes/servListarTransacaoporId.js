const repositorioTransacoes = require("../../repositorios/transacoes");

const listarTransacoesPorId = {
  async execute(id) {
    try {
      const trasacoesPorId = await repositorioTransacoes.findByPk(id);

      console.log(trasacoesPorId);

      if (!trasacoesPorId) return Error("Transações não encontradas!");

      return trasacoesPorId;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
};
module.exports = listarTransacoesPorId;