const pool = require("../conexao/conexao");

const validarCategoria = async (req, res, next) => {
  const { categoria_id: id } = req.body;

  const sql = `
        SELECT descricao FROM categorias 
        WHERE id = $1`;

  const params = [id];

  const categoriaExiste = await pool.query(sql, params);
  if (categoriaExiste.rowCount < 1)
    return res
      .status(404)
      .json({ mensagem: `Categoria inválida ou inexistente!` });

  const nomeDaCategoria = categoriaExiste.rows[0].descricao;
  console.log(nomeDaCategoria);
  req.categoria = nomeDaCategoria;
  next();
};

module.exports = { validarCategoria };
