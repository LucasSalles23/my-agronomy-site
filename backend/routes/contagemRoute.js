/* const express = require('express');
const router = express.Router();
const { getContagens } = require('../controllers/contagensController');

// GET /api/contagens

// http://localhost:5000/api/contagens
router.get('/', getContagens);

module.exports = router;

*/



// routes/contagens.js
const express = require('express');
const { getContagens } = require('../controllers/contagensController');
const router = express.Router();

// GET /api/contagens
router.get('/', getContagens);

module.exports = router;

