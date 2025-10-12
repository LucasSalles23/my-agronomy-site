/* 
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Mantém, mesmo que os controllers usem

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const professorRoutes = require('./routes/professorRoute'); 
app.use('/api/professors', professorRoutes);

const professoresProfileRoutes = require('./routes/professoresProfileRoutes');
app.use('/api/professor_profile', professoresProfileRoutes);

const opportunityRoutes = require('./routes/oportunidadeRoute'); 
app.use('/api/opportunities', opportunityRoutes);

const oportunidadesDetalhesRoutes = require('./routes/oportuinidadesDetalhesRoutes');
app.use('/api/oportunidades_detalhes', oportunidadesDetalhesRoutes);

const departamentosRoutes = require('./routes/departamentoRoute');
app.use('/api/departamentos', departamentosRoutes);

const contagensRoutes = require('./routes/contagemRoute');
app.use('/api/contagens', contagensRoutes);

const noticiasRoutes = require('./routes/noticiasRoute');
app.use('/api/noticias', noticiasRoutes);

// Porta
const PORT = process.env.PORT || 5000; // 🔹 melhor usar process.env.PORT no Railway
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

*/


const express = require('express');
const cors = require('cors');
const db = require('./db'); // Mantém a conexão, usada pelos controllers

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ---------------------- ROTAS ---------------------- //

// Professores
const professorRoutes = require('./routes/professorRoute'); 
app.use('/api/professors', professorRoutes);

// Perfil detalhado de professor
const professoresProfileRoutes = require('./routes/professoresProfileRoutes');
app.use('/api/professor_profile', professoresProfileRoutes);

// Oportunidades
const opportunityRoutes = require('./routes/oportunidadeRoute'); 
app.use('/api/opportunities', opportunityRoutes);

// Detalhes das oportunidades
const oportunidadesDetalhesRoutes = require('./routes/oportuinidadesDetalhesRoutes');
app.use('/api/oportunidades_detalhes', oportunidadesDetalhesRoutes);

// Departamentos
const departamentosRoutes = require('./routes/departamentoRoute');
app.use('/api/departamentos', departamentosRoutes);

// Contagens (Professores, Departamentos, Oportunidades)
const contagensRoutes = require('./routes/contagemRoute');
app.use('/api/contagens', contagensRoutes);

// Notícias
const noticiasRoutes = require('./routes/noticiasRoute');
app.use('/api/noticias', noticiasRoutes);


// rota padrao 
app.get('/', (req, res) => {
  res.send('API rodando! Use as rotas /api/... para acessar os dados.');
});

// ---------------------- SERVIDOR ---------------------- //
const PORT = process.env.PORT || 5000; // fallback local
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
