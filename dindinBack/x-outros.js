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

    return res.status(200).json;
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};

module.exports = servObterperfil;

//listar usuários - serviços
const repositorioUsuario = require("../../repositorios/usuarios");

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
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
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
  findTransUser: async function (id) {
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
  where transacoes.usuario_id = $1;`;

    const params = [usuario_id];

    const transacoesPK = await pool.query(sqlTransacao, params);
    return transacoesPK.rows;
  },
};

module.exports = repositorioUsuario;

//verificações de dados

const verificarBodyCadastroUsuario = (usuario) => {
  const { nome, email, senha } = usuario;

  if (!nome) return "O nome é obrigatório.";

  if (!email) return "O email é obrigatório.";

  if (!senha) return "A senha é obrigatória.";

  if (senha.length < 8) return "A senha precisa ter no mínimo 8 caracteres.";
};

const verificarBodyLogin = (usuario) => {
  const { email, senha } = usuario;

  if (!email) return "O email é obrigatório.";

  if (!senha) return "A senha é obrigatória.";

  if (senha.length < 8) return "A senha precisa ter no mínimo 8 caracteres.";
};

const verificarBodyTransacoes = (usuario) => {
  const { tipo, valor, categoria_id, descricao, data } = usuario;

  if (!valor) return "O campo valor é obrigatório.";

  if (!categoria_id) return "O campo categoria é obrigatório.";

  if (!tipo) return "O campo tipo é obrigatório.";

  if (!data) return "O campo data é obrigatório.";

  if (!descricao) return "O descricao tipo é obrigatório.";
};

module.exports = {
  verificarBodyCadastroUsuario,
  verificarBodyLogin,
  verificarBodyTransacoes,
};

const servAlterarTransacao = require("../servicos/transacoes/servAlterarTransacao");
//filtrar por usuario:
//rota.get("/transacao", controladorListarTransacoesPorUsuario.handle);

//serviço listar transações por usuário
const repositorioTransacoes = require("./src/repositorios/transacoes");

const listarTransacoesPorUsuario = {
  async execute(id) {
    try {
      const trasacoesPorId = await repositorioTransacoes.findTransUser(id);

      if (!trasacoesPorId) return Error("Transações não encontradas!");

      return trasacoesPorId;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
};
module.exports = listarTransacoesPorUsuario;

//controlador listar transações por usuário
const servicoListarTransacaoUsuario = require("./servListarTransacaoporUsuario");

const controladorListarTransacoesPorUsuario = {
  async handle(req, res) {
    try {
      const { id } = req.perfilUsuario;

      const transacoesPorId = await servicoListarTransacaoUsuario.execute(id);

      console.log(transacoesPorId);

      return res.status(200).json(transacoesPorId);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },
};
module.exports = controladorListarTransacoesPorUsuario;
