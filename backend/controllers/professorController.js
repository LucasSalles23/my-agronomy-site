/* // Arquivo: controllers/professorController.js
const db = require('../db');

// Função para buscar TODOS os professores
const getAllProfessors = async (req, res) => {
  try {
    // A mesma lógica que estava no seu server.js
    const [rows] = await db.query('SELECT * FROM professores');
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar professores:", err);
    res.status(500).json({ error: 'Erro ao buscar professores' });
  }
};

// Não se esqueça de exportar!
module.exports = {
  getAllProfessors,
};
*/



// controllers/professorController.js
const db = require('../db.js');

// Função para buscar TODOS os professores
const getAllProfessors = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM railway.professores');
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar professores:", err);
    res.status(500).json({ error: 'Erro ao buscar professores' });
  }
};

module.exports = {
  getAllProfessors
};
