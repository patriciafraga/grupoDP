const repositorioTransacoes = require("../../repositorios/transacoes");

const servicoObterExtratoUsuario = {
  async execute(usuario_id) {
    try {
      const extratoPorId = await repositorioTransacoes.findStatements(usuario_id);

      if (!extratoPorId) return Error("Transações não encontradas!");

      return extratoPorId;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
};
module.exports = servicoObterExtratoUsuario;