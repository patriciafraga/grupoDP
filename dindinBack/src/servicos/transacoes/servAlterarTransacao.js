const repositorioTransacoes = require("../../repositorios/transacoes");

const servAlterarTransacao = {
  async execute(id, transacaoAAlterar) {
    try {
      const transacaoAlterada = await repositorioTransacoes.update(
        id,
        transacaoAAlterar
      );

      if (!transacaoAlterada)
        return res
          .status(400)
          .json({
            mensagem:
              "Não foi possível cadastrar a transação! Verificar dados informados",
          }); //ver código de status

      return transacaoAlterada;
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ mensagem: `Erro interno do servidor!` });
    }
  },
};
module.exports = servAlterarTransacao;
