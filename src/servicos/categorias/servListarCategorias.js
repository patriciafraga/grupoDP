const repositorioCategorias = require("../../repositorios/categorias");

const listarCategorias = {
  async execute() {
    try {
      const categorias = await repositorioCategorias.findAll();

      if (!categorias)
        return res
          .status(400)
          .json({ mensagem: "Não foi possível listar as categorias!" });

      return categorias;
    } catch (error) {
      return res.status(500).json({ mensagem: `Erro interno do servidor!` });
    }
  },
};
module.exports = listarCategorias;
