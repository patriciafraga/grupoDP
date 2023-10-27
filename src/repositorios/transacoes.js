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

  //   findAll: async function () {

  //     const sqlTransacao = `SELECT * FROM transacoes`;

  //     const response = await pool.query(sqlTransacao);

  //     return response.rows;
  //   },

  findTransUser: async function (id) {
    const usuario_id = id;
    const sqlTransacao = `SELECT * FROM transacoes WHERE usuario_id = $1`;
    const params = [usuario_id];

    const transacoesPK = await pool.query(sqlTransacao, params);

    return transacoesPK.rows;
  },
  findTransByPk: async function (id, usuario_id) {
    const sqlTransacao = `SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2`;
    const params = [id, usuario_id];

    const transacaoPK = await pool.query(sqlTransacao, params);

    return transacaoPK.rows;
  },

  //   update: async function (id_poke, pokeData) {
  //     const { usuario_id, nome, habilidades, imagem, apelido } = pokeData;

  //     const sqlTransacao = `UPDATE transacoes SET   usuario_id = $1, nome = $2, habilidades = $3, imagem = $4, apelido = $5 WHERE id_poke = $6 RETURNING *`;

  //     const values = [usuario_id, nome, habilidades, imagem, apelido, id_poke];

  //     const response = await pool.query(sqlTransacao, values);

  //     return response.rows[0];
  //   },

  //   delete: async function (id_poke) {
  //     const sqlTransacao = `DELETE FROM transacoes WHERE id_poke = $1 RETURNING *`;

  //     const response = await pool.query(sqlTransacao, [id_poke]);

  //     return response.rows[0];
  //   },
};

module.exports = repositorioTransacoes;
