const pool = require("../conexao/conexao");

async function buscarTransacao(req, res, next) {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ mensagem: `O id da transação é obrigatório.` });
  }

  const { id: usuario_id } = req.perfilUsuario;

  const sql = `
SELECT descricao FROM transacoes
WHERE id = $1 and usuario_id = $2`;
  const params = [id, usuario_id];

  const { rowCount } = await pool.query(sql, params);

  if (rowCount < 1)
    return res.status(400).json({ mensagem: "Transação não encontrada." });
  next();
}
module.exports = buscarTransacao;
