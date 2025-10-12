// backend/routes/oportunidadesDetalhesRoutes.js
import express from 'express';
import {
  getAllOportunidadesDetalhes,
  getOportunidadeDetalhesById,
  createOportunidadeDetalhes,
  updateOportunidadeDetalhes,
  deleteOportunidadeDetalhes
} from '../controllers/oportunidadesDetalhesController.js';

const router = express.Router();

// Rotas CRUD para detalhes da oportunidade
router.get('/', getAllOportunidadesDetalhes);          // Listar todos
router.get('/:id', getOportunidadeDetalhesById);       // Pegar por ID
router.post('/', createOportunidadeDetalhes);          // Criar
router.put('/:id', updateOportunidadeDetalhes);        // Atualizar
router.delete('/:id', deleteOportunidadeDetalhes);     // Deletar

export default router;
