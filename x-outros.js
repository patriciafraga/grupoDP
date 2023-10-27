//detalharUsuario - serviços:
const jwt = require("jsonwebtoken");
const pool = require("../../conexao/conexao");
const infoToken = require("../../configs/infoToken");

const servObterperfil = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
  const tokenHeader = authorization.split(" ")[1];  

  try {
    //desestrutura para pegar o id do payload - gerado em login:
    const { id } = jwt.verify(tokenHeader, infoToken);
    
    const { rows, rowCount } = await pool.query(
      "select * from usuarios where id = $1",
      [id]
    );
   
    if (rowCount < 1) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }
    req.autenticado = rows[0];
    //const perfil = req.autenticado

    return res.status(200).json


  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};

module.exports = servObterperfil;

//listar usuários - serviços
const repositorioUsuario = require('../../repositorios/usuarios');

const listarUsuario = {

    async execute() {
      try {
        const usuarios = await repositorioUsuario.findAll();
  
        if (!usuarios) return Error("Não foi possível listar os usuarios!");
  
        return usuarios;

      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
  };
  module.exports = listarUsuario;

  //controlador listar usuários:
  const service = require("../../servicos/usuarios/servListarUsuario");

const controladorListarUsuario = {
    async handle(req, res) {

        try {
             const usuarios = await service.execute();

             return res.status(200).json(usuarios);
             
        } catch (error) {
            console.log(error.message);
             return res.status(500).json({error: "Erro interno do servidor"});
        }


   }
};
module.exports = controladorListarUsuario;


//repositório de usuários - metodos do repositório
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
  findAll: async function () {
    const sql = `SELECT * FROM usuarios`;

    const response = await pool.query(sql);

    return response.rows;
  },
  findByPk: async function (id) {
    const sql = `SELECT * FROM usuarios WHERE id = $1`;

    const usuario = await pool.query(sql, [id]);

    return usuario.rows[0];
  },
};

module.exports = repositorioUsuario;