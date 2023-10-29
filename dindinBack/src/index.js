const express = require('express');
const app = express();
const porta = 3000;
const rota = require('./rotas/rota');
app.use(rota);
app.use(express.json());

app.listen(porta, () => console.log(`Rodando em http://localhost:${porta}`));