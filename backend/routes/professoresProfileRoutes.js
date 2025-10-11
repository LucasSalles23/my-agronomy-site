const express = require("express");
const router = express.Router();
const professoresProfileController = require("../controllers/professoresProfileController");

// http://localhost:5000/api/professor_profile/1

router.get("/:id", professoresProfileController.getProfessorProfile);
router.post("/", professoresProfileController.createProfessorProfile);
router.put("/:id", professoresProfileController.updateProfessorProfile);
router.delete("/:id", professoresProfileController.deleteProfessorProfile);

module.exports = router;

