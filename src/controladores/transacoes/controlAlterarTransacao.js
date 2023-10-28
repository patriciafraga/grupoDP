const servico = require("../../servicos/transacoes/servAlterarTransacao");

const controladorAlterarTransacao = {
  async handle(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res
          .status(400)
          .json({ mensagem: `O id da transação é obrigatório.` });

      const { descricao, valor, data, categoria_id, tipo } = req.body;

      if (!descricao || !valor || !data || !categoria_id || !tipo)
        return res.status(400).json({
          mensagem: `Todos os campos obrigatórios devem ser informados.`,
        });

      if (tipo !== `entrada`) {
        if (tipo !== `saida`)
          return res.status(400).json({
            mensagem: `O campo 'tipo' deve ser 'entrada' ou 'saida'.`,
          });
      }
      const dadosAlterados = {
        descricao,
        valor,
        data,
        categoria_id,
        tipo,
      };
      const transacaoAAlterar = await servico.execute(id, dadosAlterados);

      req.transacao = transacaoAAlterar;

      return res.status(201).send();
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
module.exports = controladorAlterarTransacao;
