const pool = require("../../conexao/conexao");
const servico = require("../../servicos/transacoes/servCadastrarTransacoes");

const controladorCadastrarTransacao = {
  async handle(req, res) {
    try {
      const { tipo, descricao, valor, data, categoria_id } = req.body;

      if (!tipo || !descricao || !valor || !data || !categoria_id)
        return res.status(400).json({
          mensagem: `Todos os campos obrigatórios devem ser informados.`,
        });

      if (tipo !== `entrada`) {
        if (tipo !== `saida`)
          return res.status(400).json({
            mensagem: `O campo 'tipo' deve ser 'entrada' ou 'saida'.`,
          });
      }
      const { id } = req.perfilUsuario;

      const transacao = await servico.execute({
        tipo,
        descricao,
        valor,
        data,
        usuario_id: id,
        categoria_id,
      });

      const params = [categoria_id];
      
      const sql = `
      SELECT descricao FROM categorias WHERE id = $1`;
      const { rows } = await pool.query(sql, params);

      const transacaoCadastrada = {
        ...transacao.rows[0],
        categoria_nome: rows[0].descricao,
      };

      req.transacao = transacaoCadastrada;

      return res.status(201).json(transacaoCadastrada);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
module.exports = controladorCadastrarTransacao;
