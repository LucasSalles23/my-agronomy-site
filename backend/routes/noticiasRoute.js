const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticiasController');

// http://localhost:5000/api/noticias

//http://localhost:5000/api/noticias/1

// Rotas CRUD para notícias
router.get('/', noticiasController.getAllNoticias);          // Listar todas as notícias
router.get('/:id', noticiasController.getNoticiaById);       // Pegar notícia por ID
// Se quiser criar, atualizar e deletar notícias, pode adicionar:
// router.post('/', noticiasController.createNoticia);       // Criar notícia
// router.put('/:id', noticiasController.updateNoticia);     // Atualizar notícia
// router.delete('/:id', noticiasController.deleteNoticia);  // Deletar notícia

module.exports = router;
