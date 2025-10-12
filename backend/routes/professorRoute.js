/* // Arquivo: routes/professorRoutes.js
const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// A rota GET para '/' (que se tornará /api/professors)
// aciona a função que acabamos de criar no controller.
router.get('/', professorController.getAllProfessors);

module.exports = router;
 */


// routes/professorRoutes.js
import express from 'express';
import * as professorController from '../controllers/professorController.js';

const router = express.Router();

// GET /api/professors
router.get('/', professorController.getAllProfessors);

export default router;
