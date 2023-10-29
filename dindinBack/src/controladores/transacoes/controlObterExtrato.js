const servicoObterExtratoUsuario = require("../../servicos/transacoes/servObterExtato");

const controladorObterExtratoPorUsuario = {
  async handle(req, res) {
    try {
      const { id: usuario_id } = req.perfilUsuario;

      const extratoPorUsuario = await servicoObterExtratoUsuario.execute(
        usuario_id
      );

      console.log(extratoPorUsuario);

      return res.status(200).json(extratoPorUsuario);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },
};
module.exports = controladorObterExtratoPorUsuario;
