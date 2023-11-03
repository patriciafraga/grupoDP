const express = require("express");
const {
  controladorListarCategorias,
  controladorAlterarTransacao,
  controlCadastrarTransacao,
  controlExcluirTransacao,
  controladorListarPorIdTransacao,
  controladorListarPorCategoriaouUsuario,
  controladorObterExtratoPorUsuario,
  controladorCriarUsuario,
  controladorAtualizarUsuario,
  validarUsuario,
} = require("../controladores/index");

const { autenticacao, obterPerfil } = require("../intermediarios/autenticacao");

const { validarCategoria } = require("../intermediarios/validarCategoria");

const buscarTransacao = require("../intermediarios/buscarTransacao");

const rota = express.Router();
rota.use(express.json());

rota.post("/usuario", controladorCriarUsuario.handle);
rota.post("/login", validarUsuario);

rota.use(autenticacao);
rota.get("/usuario", obterPerfil);
rota.put("/usuario", controladorAtualizarUsuario.handle);
rota.get("/categoria", controladorListarCategorias.handle);
rota.post("/transacao", validarCategoria, controlCadastrarTransacao.handle);
rota.get("/transacao", controladorListarPorCategoriaouUsuario.handle);
rota.get("/transacao/extrato", controladorObterExtratoPorUsuario.handle);
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
rota.delete("/transacao/:id", buscarTransacao, controlExcluirTransacao.handle);

module.exports = rota;
