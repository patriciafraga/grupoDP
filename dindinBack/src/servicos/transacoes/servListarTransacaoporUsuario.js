const repositorioTransacoes = require("../../repositorios/transacoes");

const listarTransacoesPorUsuario = {
  async execute(id) {
    try {
      const trasacoesPorId = await repositorioTransacoes.findTransUser(id);

      if (!trasacoesPorId) return Error("Transações não encontradas!");

      return trasacoesPorId;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
};
module.exports = listarTransacoesPorUsuario;
