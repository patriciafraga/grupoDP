const pool = require("../conexao/conexao");

const repositorioUsuario = {
  create: async function (dados) {
    const { nome, email, senha } = dados;

    const sql = `
          INSERT INTO usuarios 
          (nome, email, senha)
          values
          ($1, $2, $3)
          RETURNING *`;

    const params = [nome, email, senha];

    const response = await pool.query(sql, params);

    return response.rows[0];
  },
  update: async function (id, dados) {
    const { nome, email, senha } = dados;

    const sql = `UPDATE usuarios 
    SET   nome = $1, email = $2, senha = $3
    WHERE id = $4 RETURNING *`;

    const values = [nome, email, senha, id];

    const response = await pool.query(sql, values);

    return response.rows[0];
  },
};

module.exports = repositorioUsuario;
