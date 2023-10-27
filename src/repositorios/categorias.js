const pool = require("../conexao/conexao");

const repositorioCategorias = {
  findAll: async function () {
    const sql = `SELECT * FROM categorias`;

    const response = await pool.query(sql);

    return response.rows;
  },
};

module.exports = repositorioCategorias;
