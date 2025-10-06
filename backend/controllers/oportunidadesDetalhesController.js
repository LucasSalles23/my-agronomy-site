// ARQUIVO: backend/controllers/oportunidadesDetalhesController.js

const db = require('../db');

// --- LISTAR TODOS (AJUSTADO) ---
// Ajustado para retornar os campos que a lista principal precisa (id, titulo, etc.)
const getAllOportunidadesDetalhes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        o.id, 
        o.titulo, 
        o.descricao, 
        o.tipo,
        p.nome AS professor_nome,
        p.departamento AS professor_departamento
      FROM oportunidades o
      JOIN oportunidades_detalhes d ON o.id = d.oportunidade_id
      JOIN professores p ON d.professor_id = p.id
      ORDER BY o.data_publicacao DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a lista de oportunidades' });
  }
};

// --- PEGAR POR ID (CORRIGIDO) ---
// A correção mais importante está aqui.
const getOportunidadeDetalhesById = async (req, res) => {
  const { id } = req.params; // Este é o ID da OPORTUNIDADE, vindo da URL.
  try {
    const [rows] = await db.query(`
      SELECT 
        o.id, o.titulo, o.descricao, o.tipo, o.data_publicacao,
        d.carga_horaria, d.duracao, d.bolsa, d.requisitos, d.atividades,
        p.nome AS professor_nome,
        p.email AS professor_email,
        p.departamento AS professor_departamento
      FROM oportunidades o
      JOIN oportunidades_detalhes d ON o.id = d.oportunidade_id
      JOIN professores p ON d.professor_id = p.id
      WHERE o.id = ?`, // <<< CORRIGIDO: Buscando pelo ID da tabela 'oportunidades'
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Detalhes da oportunidade não encontrados' });
    }

    // Renomeia os campos para corresponder ao que o frontend espera, evitando confusão.
    const data = rows[0];
    const responseData = {
      ...data,
      title: data.titulo,
      description: data.descricao,
      professor: data.professor_nome,
      department: data.professor_departamento,
      email: data.professor_email,
      publishDate: data.data_publicacao,
      type: data.tipo,
      cargaHoraria: data.carga_horaria,
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar detalhes da oportunidade' });
  }
};


// --- CRIAR, ATUALIZAR, DELETAR (Mantidos como estavam) ---
const createOportunidadeDetalhes = async (req, res) => {
  const { oportunidade_id, professor_id, carga_horaria, duracao, bolsa, requisitos, atividades } = req.body;
  try {
    const [result] = await db.query(`
      INSERT INTO oportunidades_detalhes (oportunidade_id, professor_id, carga_horaria, duracao, bolsa, requisitos, atividades)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [oportunidade_id, professor_id, carga_horaria, duracao, bolsa, requisitos, atividades]);
    res.status(201).json({ message: 'Detalhes da oportunidade criados', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar detalhes da oportunidade' });
  }
};

const updateOportunidadeDetalhes = async (req, res) => {
  const { id } = req.params;
  const { oportunidade_id, professor_id, carga_horaria, duracao, bolsa, requisitos, atividades } = req.body;
  try {
    const [result] = await db.query(`
      UPDATE oportunidades_detalhes SET oportunidade_id = ?, professor_id = ?, carga_horaria = ?, duracao = ?, bolsa = ?, requisitos = ?, atividades = ? WHERE id = ?
    `, [oportunidade_id, professor_id, carga_horaria, duracao, bolsa, requisitos, atividades, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalhes da oportunidade não encontrados' });
    res.json({ message: 'Detalhes da oportunidade atualizados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar detalhes da oportunidade' });
  }
};

const deleteOportunidadeDetalhes = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(`DELETE FROM oportunidades_detalhes WHERE id = ?`, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalhes da oportunidade não encontrados' });
    res.json({ message: 'Detalhes da oportunidade deletados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar detalhes da oportunidade' });
  }
};


module.exports = {
  getAllOportunidadesDetalhes,
  getOportunidadeDetalhesById,
  createOportunidadeDetalhes,
  updateOportunidadeDetalhes,
  deleteOportunidadeDetalhes
};
