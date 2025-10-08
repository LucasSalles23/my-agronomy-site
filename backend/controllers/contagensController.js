// controllers/contagensController.js
const db = require('../db');

// Função para retornar as contagens
const getContagens = async (req, res) => {
  try {
    const [professores] = await db.query('SELECT COUNT(*) AS total FROM professores');
    const [departamentos] = await db.query('SELECT COUNT(*) AS total FROM departamentos');
    const [oportunidades] = await db.query('SELECT COUNT(*) AS total FROM oportunidades');

    res.json({
      professores: professores[0].total,
      departamentos: departamentos[0].total,
      oportunidades: oportunidades[0].total,
    });
  } catch (err) {
    console.error("Erro ao buscar contagens:", err);
    res.status(500).json({ error: 'Erro ao buscar contagens' });
  }
};

module.exports = {
  getContagens,
};
