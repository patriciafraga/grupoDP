const express = require("express");
const controladorCriarUsuario = require("../controladores/usuarios/controlCriarUsuario");
const validarUsuario = require("../intermediarios/login");
const { autenticacao, obterPerfil } = require("../intermediarios/autenticacao");
const controladorAtualizarUsuario = require("../controladores/usuarios/controlAtualizarUsuario");
const controladorListarCategorias = require("../controladores/categorias/controlCategorias");
const controladorCadastrarTransacao = require("../controladores/transacoes/controlCadastrarTransacao");
const { validarCategoria } = require("../intermediarios/validarCategoria");
const controladorListarTransacoesPorUsuario = require("../controladores/transacoes/controlListarTransacoesporUsuario");
const controladorListarPorIdTransacao = require("../controladores/transacoes/controlListarIdTransacao");
const buscarTransacao = require("../intermediarios/buscarTransacao");
const servAlterarTransacao = require("../servicos/transacoes/servAlterarTransacao");
const controladorAlterarTransacao = require("../controladores/transacoes/controlAlterarTransacao");
const controladorExcluirTransacao = require("../controladores/transacoes/controlExcluirTransacao");

const rota = express.Router();
rota.use(express.json());

rota.post("/usuario", controladorCriarUsuario.handle);
rota.post("/login", validarUsuario);

rota.use(autenticacao);
rota.get("/usuario", obterPerfil);
rota.put("/usuario", controladorAtualizarUsuario.handle);
rota.get("/categoria", controladorListarCategorias.handle);
rota.post("/transacao", validarCategoria, controladorCadastrarTransacao.handle);
rota.get("/transacao", controladorListarTransacoesPorUsuario.handle);
rota.get(
  "/transacao/:id",
  buscarTransacao,
  controladorListarPorIdTransacao.handle
);
rota.put(
  "/transacao/:id",
  buscarTransacao,
  validarCategoria,
  controladorAlterarTransacao.handle
);
rota.delete(
  "/transacao/:id",
  buscarTransacao,
  controladorExcluirTransacao.handle
);

module.exports = rota;
