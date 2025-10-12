/* const express = require("express");
const router = express.Router();
const opportunityController = require("../controllers/oportunidadesController");

// Rotas CRUD  -- http://localhost:5000/api/opportunities
router.get("/", opportunityController.getAllOpportunities);
router.get("/:id", opportunityController.getOpportunityById);
router.post("/", opportunityController.createOpportunity);
router.put("/:id", opportunityController.updateOpportunity);
router.delete("/:id", opportunityController.deleteOpportunity);

module.exports = router;
 */


// routes/oportunidadesRoute.js
import express from 'express';
import * as opportunityController from '../controllers/oportunidadesController.js';

const router = express.Router();

// Rotas CRUD  -- http://localhost:5000/api/opportunities
router.get('/', opportunityController.getAllOpportunities);
router.get('/:id', opportunityController.getOpportunityById);
router.post('/', opportunityController.createOpportunity);
router.put('/:id', opportunityController.updateOpportunity);
router.delete('/:id', opportunityController.deleteOpportunity);

export default router;
