/* const express = require("express");
const router = express.Router();
const professoresProfileController = require("../controllers/professoresProfileController");

// http://localhost:5000/api/professor_profile/1

router.get("/:id", professoresProfileController.getProfessorProfile);
router.post("/", professoresProfileController.createProfessorProfile);
router.put("/:id", professoresProfileController.updateProfessorProfile);
router.delete("/:id", professoresProfileController.deleteProfessorProfile);

module.exports = router;

 */



// routes/professoresProfileRoute.js
import express from 'express';
import * as professoresProfileController from '../controllers/professoresProfileController.js';

const router = express.Router();

// http://localhost:5000/api/professor_profile/1
router.get('/:id', professoresProfileController.getProfessorProfile);
router.post('/', professoresProfileController.createProfessorProfile);
router.put('/:id', professoresProfileController.updateProfessorProfile);
router.delete('/:id', professoresProfileController.deleteProfessorProfile);

export default router;
