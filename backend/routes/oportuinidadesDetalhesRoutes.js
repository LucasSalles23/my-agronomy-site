const express = require('express');
const router = express.Router();
const oportunidadesDetalhesController = require('../controllers/oportunidadesDetalhesController');

//http://localhost:5000/api/oportunidades_detalhes

// Rotas CRUD para detalhes da oportunidade
router.get('/', oportunidadesDetalhesController.getAllOportunidadesDetalhes);          // Listar todos
router.get('/:id', oportunidadesDetalhesController.getOportunidadeDetalhesById);       // Pegar por ID
router.post('/', oportunidadesDetalhesController.createOportunidadeDetalhes);          // Criar
router.put('/:id', oportunidadesDetalhesController.updateOportunidadeDetalhes);        // Atualizar
router.delete('/:id', oportunidadesDetalhesController.deleteOportunidadeDetalhes);     // Deletar

module.exports = router;
