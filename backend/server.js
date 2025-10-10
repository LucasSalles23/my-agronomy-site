const express = require('express');
const cors = require('cors');
const db = require('./db'); // Mantém, mesmo que os controllers usem

const app = express();

app.use(cors());
app.use(express.json());

//---------------------------------------------------------------//
// Rota para a lista de todos os professores
const professorRoutes = require('./routes/professorRoute'); 
app.use('/api/professors', professorRoutes);

//---------------------------------------------------------------//
// Rota para perfil detalhado de um professor por ID
const professoresProfileRoutes = require('./routes/professoresProfileRoutes');
app.use('/api/professor_profile', professoresProfileRoutes);

//---------------------------------------------------------------//
// Rota para gerenciar as oportunidades
const opportunityRoutes = require('./routes/oportunidadeRoute'); 
app.use('/api/opportunities', opportunityRoutes);

//---------------------------------------------------------------//
// Rota para detalhe das oportunidades
const oportunidadesDetalhesRoutes = require('./routes/oportuinidadesDetalhesRoutes');
app.use('/api/oportunidades_detalhes', oportunidadesDetalhesRoutes);

//---------------------------------------------------------------//
// Rota para os departamentos
const departamentosRoutes = require('./routes/departamentoRoute');
app.use('/api/departamentos', departamentosRoutes);

//---------------------------------------------------------------//
// Nova rota: contagens (Professores, Departamentos, Oportunidades)
const contagensRoutes = require('./routes/contagemRoute');
app.use('/api/contagens', contagensRoutes);

//---------------------------------------------------------------//
// Rota para notícias
const noticiasRoutes = require('./routes/noticiasRoute');
app.use('/api/noticias', noticiasRoutes);

//---------------------------------------------------------------//

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
