const express = require("express");
const controladorCriarUsuario = require("../controladores/usuarios/controlCriarUsuario");
const validarUsuario = require("../intermediarios/login");
const {
  verificarLogin,
  obterPerfil,
} = require("../intermediarios/autenticacao");
const controladorAtualizarUsuario = require("../controladores/usuarios/controlAtualizarUsuario");
const controladorListarCategorias = require("../controladores/categorias/controlCategorias");
const controladorCadastrarTransacao = require("../controladores/transacoes/controlCadastrarTransacao");
const {validarCategoria} = require("../intermediarios/validarCategoria");
const controladorListarTransacoesPorUsuario = require("../controladores/transacoes/controlListarTransacoesporUsuario");
const controladorListarPorIdTransacao = require("../controladores/transacoes/controlListarIdTransacao");


const rota = express.Router();
rota.use(express.json());

rota.post("/usuario", controladorCriarUsuario.handle);
rota.post("/login", validarUsuario);

rota.use(verificarLogin);

rota.get("/usuario", obterPerfil);
rota.put("/usuario", controladorAtualizarUsuario.handle);
rota.get("/categoria", controladorListarCategorias.handle);
rota.post('/transacao', validarCategoria, controladorCadastrarTransacao.handle);
rota.get('/transacao', controladorListarTransacoesPorUsuario.handle);
rota.get('/transacao/:id', controladorListarPorIdTransacao.handle);

module.exports = rota;
