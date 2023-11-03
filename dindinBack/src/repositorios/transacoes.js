const pool = require("../conexao/conexao");

const repositorioTransacoes = {
  create: async function (dadosTransacao) {
    const { tipo, descricao, valor, data, categoria_id, usuario_id } =
      dadosTransacao;

    const sqlTransacao = `
          INSERT INTO transacoes 
          (tipo, descricao, valor, data, categoria_id, usuario_id)
          values
          ($1, $2, $3, $4, $5, $6)
          RETURNING *`;

    const paramsTransacao = [
      tipo,
      descricao,
      valor,
      data,
      categoria_id,
      usuario_id,
    ];

    const response = await pool.query(sqlTransacao, paramsTransacao);

    return response;
  },
  findTransPorCategoria: async function (id, filtro) {
    const usuario_id = id;

    let sqlTransacao = `SELECT
      t.id,
      t.tipo,
      t.descricao,
      t.valor,
      t.data,
      t.usuario_id,
      t.categoria_id,
      c.descricao AS categoria_nome
      FROM transacoes t
      INNER JOIN categorias c
      ON t.categoria_id = c.id
      WHERE t.usuario_id = $1`;

    let params = [usuario_id];
    let descricao = filtro;

    if (descricao) {
      const arrayfiltros = descricao.map((item) => `%${item}%`);
      params.push(arrayfiltros);
      sqlTransacao += ` AND c.descricao ilike ANY($2::text[])`;
    }
    //console.log(sqlTransacao);

    const transacoesPorCategoriaouUsuario = await pool.query(
      sqlTransacao,
      params
    );
    return transacoesPorCategoriaouUsuario.rows;
  },

  findStatements: async function (usuario_id) {
    const sqlTransacao = `
    SELECT
  SUM(CASE WHEN transacoes.tipo = 'entrada' 
      THEN valor ELSE 0 END) AS entradas,
  SUM(CASE WHEN tipo = 'saida' 
      THEN valor ELSE 0 END) AS saidas,
  SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END) - SUM(CASE WHEN   tipo = 'saida' THEN valor ELSE 0 END) AS saldo
FROM transacoes
WHERE transacoes.usuario_id = $1;`;
    const params = [usuario_id];

    const transacaoEncontrada = await pool.query(sqlTransacao, params);
    console.log(transacaoEncontrada);
    return transacaoEncontrada.rows;
  },
  findTransByPk: async function (id) {
    const usuario_id = id;
    const sqlTransacao = `select transacoes.id, 
transacoes.tipo,
transacoes.descricao,
transacoes.valor,
transacoes.data,
transacoes.usuario_id,
transacoes.categoria_id,
categorias.descricao as categoria_nome
from transacoes
inner join categorias
on transacoes.categoria_id = categorias.id
where transacoes.id = $1;`;

    const params = [usuario_id];
    const transacoesPK = await pool.query(sqlTransacao, params);
    return transacoesPK.rows;
  },

  update: async function (id, transacaoAlterada) {
    const { descricao, valor, data, categoria_id, tipo } = transacaoAlterada;

    const sqlTransacao = `UPDATE transacoes SET   descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6 RETURNING *`;

    const values = [descricao, valor, data, categoria_id, tipo, id];

    const response = await pool.query(sqlTransacao, values);

    return response.rows[0];
  },

  delete: async function (id) {
    const sqlTransacao = `DELETE FROM transacoes WHERE id = $1 RETURNING *`;

    const response = await pool.query(sqlTransacao, [id]);

    return response.rows[0];
  },
};

module.exports = repositorioTransacoes;
