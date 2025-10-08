const express = require('express');
const router = express.Router();
const { getContagens } = require('../controllers/contagensController');

// GET /api/contagens
router.get('/', getContagens);

module.exports = router;
