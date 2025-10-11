// ARQUIVO: backend/routes/departamentosRoute.js
const express = require('express');
const router = express.Router();
const departamentosController = require('../controllers/departamentoController');

//http://localhost:5000/api/departamentos

// Define a rota principal:
// Quando uma requisição GET chegar em '/api/departamentos',
// ela será gerenciada pela função 'getDepartamentosComDetalhes'.
router.get('/', departamentosController.getDepartamentosComDetalhes);

module.exports = router;
