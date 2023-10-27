const servico = require("../../servicos/categorias/servListarCategorias");

const controladorListarCategorias = {
  async handle(req, res) {
    try {
      const categorias = await servico.execute();

      return res.status(200).json(categorias);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
module.exports = controladorListarCategorias;
