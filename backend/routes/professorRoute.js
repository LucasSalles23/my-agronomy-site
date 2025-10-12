/* // Arquivo: routes/professorRoutes.js
const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// A rota GET para '/' (que se tornará /api/professors)
// aciona a função que acabamos de criar no controller.
router.get('/', professorController.getAllProfessors);

module.exports = router;
 */


// backend/routes/professorRoute.js
const express = require('express');
const professorController = require('../controllers/professorController');

const router = express.Router();

// GET /api/professors
router.get('/', professorController.getAllProfessors);

module.exports = router;

