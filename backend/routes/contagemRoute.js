/* const express = require('express');
const router = express.Router();
const { getContagens } = require('../controllers/contagensController');

// GET /api/contagens

// http://localhost:5000/api/contagens
router.get('/', getContagens);

module.exports = router;
 */



// routes/contagens.js
import express from 'express';
import { getContagens } from '../controllers/contagensController.js';

const router = express.Router();

// GET /api/contagens
router.get('/', getContagens);

export default router;
