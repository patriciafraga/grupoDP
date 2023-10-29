const repositorioUsuario = require("../../repositorios/usuarios");

const cadastrarUsuario = {
  async execute(dados) {
    try {
      const usuarioCriado = await repositorioUsuario.create(dados);
        //console.log(usuarioCriado);

      if (!usuarioCriado) return  res.status(400).json({error: "Não foi possível cadastrar o usuário!"}); //ver código de status

      return usuarioCriado;

    } catch (error) {
      console.log(error.message);
       return res.status(500).json({error: `Erro interno do servidor!`});
      
    }
  },
};
module.exports = cadastrarUsuario;