// backend/routes/oportunidadesDetalhesRoutes.js
const express = require('express');
const oportunidadesDetalhesController = require('../controllers/oportunidadesDetalhesController');

const router = express.Router();

// Rotas CRUD para detalhes da oportunidade
router.get('/', oportunidadesDetalhesController.getAllOportunidadesDetalhes);          // Listar todos
router.get('/:id', oportunidadesDetalhesController.getOportunidadeDetalhesById);       // Pegar por ID
router.post('/', oportunidadesDetalhesController.createOportunidadeDetalhes);          // Criar
router.put('/:id', oportunidadesDetalhesController.updateOportunidadeDetalhes);        // Atualizar
router.delete('/:id', oportunidadesDetalhesController.deleteOportunidadeDetalhes);     // Deletar

module.exports = router;
