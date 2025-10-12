import express from 'express';
import cors from 'cors';
import db from './db.js';
import { 
  getOportunidadeDetalhesById 
} from './controllers/oportunidadesDetalhesController.js';

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- ROTAS ---
// Professores
app.get('/api/professors', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM professores');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Notícias
app.get('/api/noticias', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM noticias');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Oportunidades
app.get('/api/oportunidades', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM oportunidades');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Detalhes de oportunidade por ID
app.get('/api/oportunidades_detalhes/:id', getOportunidadeDetalhesById);

// --- SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
