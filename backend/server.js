const express = require('express');
const cors = require('cors');
// O 'db' não é mais necessário aqui, pois os controllers o utilizam.
// Mas não há problema em deixar.
const db = require('./db'); 

const app = express();
app.use(cors());
app.use(express.json());


// Rota para a lista de todos os professores

const professorRoutes = require('./routes/professorRoute'); // <-- Verifique este nome de arquivo
app.use('/api/professors', professorRoutes);


//---------------------------------------------------------------//

// ROTA PARA PERFIL DETALHADO DE UM PROFESSOR ID
const professoresProfileRoutes = require('./routes/professoresProfileRoutes');
app.use('/api/professor_profile', professoresProfileRoutes);

//---------------------------------------------------------------//

// Rota para gerenciar as oportunidades
const opportunityRoutes = require('./routes/oportunidadeRoute'); 
app.use('/api/opportunities', opportunityRoutes); // <-- Mudei de 'oportunidades' para 'opportunities'

//---------------------------------------------------------------//

// Rota para detalhe das oportuinidades
const oportunidadesDetalhesRoutes = require('./routes/oportuinidadesDetalhesRoutes');
app.use('/api/oportunidades_detalhes', oportunidadesDetalhesRoutes);

//---------------------------------------------------------------//


// Rota para os departamentos
const departamentosRoutes = require('./routes/departamentoRoute');
app.use('/api/departamentos', departamentosRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
