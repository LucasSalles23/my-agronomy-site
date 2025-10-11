const express = require('express');
const router = express.Router();
const { getContagens } = require('../controllers/contagensController');

// GET /api/contagens

// http://localhost:5000/api/contagens
router.get('/', getContagens);

module.exports = router;
