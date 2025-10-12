/* // ARQUIVO: backend/controllers/departamentosController.js
const db = require('../db');

exports.getDepartamentosComDetalhes = async (req, res) => {
    try {
        // Busca todos os departamentos com os novos campos
        const [departamentos] = await db.query(`
            SELECT id, nome, descricao, email, telefone, chefe_de_departamento 
            FROM departamentos 
            ORDER BY nome ASC
        `);

        const departamentosComDetalhes = await Promise.all(
            departamentos.map(async (departamento) => {

                const [professoresDoDepto] = await db.query(
                    'SELECT id, nome FROM professores WHERE departamento_id = ?',
                    [departamento.id]
                );

                const [disciplinas] = await db.query(`
                    SELECT id, nome, codigo_disciplina 
                    FROM disciplinas 
                    WHERE id IN (SELECT disciplina_id FROM departamento_disciplina WHERE departamento_id = ?)
                    ORDER BY nome ASC
                `, [departamento.id]);

                // Para cada disciplina, buscar seus professores
                const disciplinasComProfessores = await Promise.all(
                    disciplinas.map(async (disciplina) => {
                        const [professoresDaDisciplina] = await db.query(`
                            SELECT p.id, p.nome, p.especializacao 
                            FROM professores p
                            JOIN professor_disciplina pd ON p.id = pd.professor_id
                            WHERE pd.disciplina_id = ?
                        `, [disciplina.id]);

                        return {
                            ...disciplina,
                            professores: professoresDaDisciplina,
                        };
                    })
                );

                return {
                    id: departamento.id,
                    nome: departamento.nome,
                    descricao: departamento.descricao,
                    email: departamento.email || null,
                    telefone: departamento.telefone || null,
                    chefe_de_departamento: departamento.chefe_de_departamento || null,
                    quantidade_professores: professoresDoDepto.length,
                    disciplinas: disciplinasComProfessores,
                };
            })
        );

        res.json(departamentosComDetalhes);

    } catch (err) {
        console.error("Erro ao buscar departamentos com detalhes:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};


// =================================================================================
// READ (Single by ID) - Função para buscar um único departamento
// =================================================================================
exports.getDepartamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM departamentos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Departamento não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(`Erro ao buscar departamento ${id}:`, err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// =================================================================================
// CREATE - Função para criar um novo departamento
// =================================================================================
exports.createDepartamento = async (req, res) => {
    // Pega 'nome' e 'descricao' do corpo da requisição (ex: de um formulário)
    const { nome, descricao } = req.body;

    // Validação simples para garantir que os campos não estão vazios
    if (!nome || !descricao) {
        return res.status(400).json({ message: 'Nome e descrição são obrigatórios.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO departamentos (nome, descricao) VALUES (?, ?)',
            [nome, descricao]
        );
        // Retorna uma mensagem de sucesso e o ID do novo departamento criado
        res.status(201).json({ message: 'Departamento criado com sucesso', id: result.insertId });
    } catch (err) {
        console.error("Erro ao criar departamento:", err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// =================================================================================
// UPDATE - Função para atualizar um departamento existente
// =================================================================================
exports.updateDepartamento = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
        return res.status(400).json({ message: 'Nome e descrição são obrigatórios.' });
    }

    try {
        const [result] = await db.query(
            'UPDATE departamentos SET nome = ?, descricao = ? WHERE id = ?',
            [nome, descricao, id]
        );

        // Verifica se alguma linha foi realmente afetada. Se não, o ID não existia.
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Departamento não encontrado para atualizar' });
        }

        res.json({ message: 'Departamento atualizado com sucesso' });
    } catch (err) {
        console.error(`Erro ao atualizar departamento ${id}:`, err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// =================================================================================
// DELETE - Função para deletar um departamento
// =================================================================================
exports.deleteDepartamento = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM departamentos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Departamento não encontrado para deletar' });
        }

        res.json({ message: 'Departamento deletado com sucesso' });
    } catch (err) {
        // Captura um erro comum de chave estrangeira
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ message: 'Não é possível deletar este departamento, pois ele está sendo usado por professores ou disciplinas.' });
        }
        console.error(`Erro ao deletar departamento ${id}:`, err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 */



// controllers/departamentosController.js
import db from '../db.js';

// --- LISTAR TODOS COM DETALHES ---
export const getDepartamentosComDetalhes = async (req, res) => {
    try {
        const [departamentos] = await db.query(`
            SELECT id, nome, descricao, email, telefone, chefe_de_departamento 
            FROM departamentos 
            ORDER BY nome ASC
        `);

        const departamentosComDetalhes = await Promise.all(
            departamentos.map(async (departamento) => {
                const [professoresDoDepto] = await db.query(
                    'SELECT id, nome FROM professores WHERE departamento_id = ?',
                    [departamento.id]
                );

                const [disciplinas] = await db.query(`
                    SELECT id, nome, codigo_disciplina 
                    FROM disciplinas 
                    WHERE id IN (SELECT disciplina_id FROM departamento_disciplina WHERE departamento_id = ?)
                    ORDER BY nome ASC
                `, [departamento.id]);

                const disciplinasComProfessores = await Promise.all(
                    disciplinas.map(async (disciplina) => {
                        const [professoresDaDisciplina] = await db.query(`
                            SELECT p.id, p.nome, p.especializacao 
                            FROM professores p
                            JOIN professor_disciplina pd ON p.id = pd.professor_id
                            WHERE pd.disciplina_id = ?
                        `, [disciplina.id]);

                        return {
                            ...disciplina,
                            professores: professoresDaDisciplina,
                        };
                    })
                );

                return {
                    ...departamento,
                    quantidade_professores: professoresDoDepto.length,
                    disciplinas: disciplinasComProfessores,
                };
            })
        );

        res.json(departamentosComDetalhes);

    } catch (err) {
        console.error("Erro ao buscar departamentos com detalhes:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

// --- READ: Buscar por ID ---
export const getDepartamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM departamentos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Departamento não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(`Erro ao buscar departamento ${id}:`, err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// --- CREATE ---
export const createDepartamento = async (req, res) => {
    const { nome, descricao } = req.body;
    if (!nome || !descricao) {
        return res.status(400).json({ message: 'Nome e descrição são obrigatórios.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO departamentos (nome, descricao) VALUES (?, ?)',
            [nome, descricao]
        );
        res.status(201).json({ message: 'Departamento criado com sucesso', id: result.insertId });
    } catch (err) {
        console.error("Erro ao criar departamento:", err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// --- UPDATE ---
export const updateDepartamento = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
        return res.status(400).json({ message: 'Nome e descrição são obrigatórios.' });
    }

    try {
        const [result] = await db.query(
            'UPDATE departamentos SET nome = ?, descricao = ? WHERE id = ?',
            [nome, descricao, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Departamento não encontrado para atualizar' });
        }

        res.json({ message: 'Departamento atualizado com sucesso' });
    } catch (err) {
        console.error(`Erro ao atualizar departamento ${id}:`, err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// --- DELETE ---
export const deleteDepartamento = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM departamentos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Departamento não encontrado para deletar' });
        }

        res.json({ message: 'Departamento deletado com sucesso' });
    } catch (err) {
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ message: 'Não é possível deletar este departamento, pois ele está sendo usado por professores ou disciplinas.' });
        }
        console.error(`Erro ao deletar departamento ${id}:`, err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
