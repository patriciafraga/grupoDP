const repositorioTransacoes = require("../../repositorios/transacoes");

const servicolistarTransacaoPorId = {
  async execute(id, usuario_id) {
    try {
      const buscarTransacaoPorId = await repositorioTransacoes.findTransByPk(
        id,
        usuario_id
      );
      return buscarTransacaoPorId;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
};
module.exports = servicolistarTransacaoPorId;
