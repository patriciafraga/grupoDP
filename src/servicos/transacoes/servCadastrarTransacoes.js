const repositorioTransacoes = require("../../repositorios/transacoes");

const cadastrarTransacao = {
  async execute(dados) {
    try {
      const transacaoCadastrada = await repositorioTransacoes.create(dados);

      if (!transacaoCadastrada) return  res.status(400).json({mensagem: "Não foi possível cadastrar o usuário!"}); //ver código de status

      return transacaoCadastrada;

    } catch (error) {
      console.log(error.message);
       return res.status(500).json({mensagem: `Erro interno do servidor!`});
      
    }
  },
};
module.exports = cadastrarTransacao;