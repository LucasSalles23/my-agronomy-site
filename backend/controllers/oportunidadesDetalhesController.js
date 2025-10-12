// controllers/oportunidadesDetalhesController.js
const db = require('../db.js');

// --- LISTAR TODOS ---
const getAllOportunidadesDetalhes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        o.id, 
        o.titulo, 
        o.descricao, 
        o.tipo,
        p.nome AS professor_nome,
        dep.nome AS professor_departamento
      FROM oportunidades o
      JOIN professores p ON o.professor_id = p.id
      JOIN departamentos dep ON p.departamento_id = dep.id
      ORDER BY o.data_publicacao DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a lista de oportunidades' });
  }
};

// --- PEGAR POR ID ---
const getOportunidadeDetalhesById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
  SELECT 
    o.id, 
    o.titulo, 
    o.descricao, 
    o.tipo, 
    o.data_publicacao,
    d.carga_horaria, 
    d.duracao, 
    d.bolsa, 
    d.requisitos, 
    d.atividades,
    p.nome AS professor_nome,
    p.email AS professor_email,
    dep.nome AS professor_departamento
  FROM oportunidades o
  JOIN oportunidades_detalhes d ON o.id = d.oportunidade_id
  JOIN professores p ON o.professor_id = p.id
  JOIN departamentos dep ON p.departamento_id = dep.id
  WHERE o.id = ?
`, [id]);


    if (rows.length === 0) {
      return res.status(404).json({ message: 'Detalhes da oportunidade não encontrados' });
    }

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

// --- CRIAR ---
const createOportunidadeDetalhes = async (req, res) => {
  const { oportunidade_id, professor_id, carga_horaria, duracao, bolsa, requisitos, atividades } = req.body;
  try {
    const [result] = await db.query(`
      INSERT INTO oportunidades_detalhes 
      (oportunidade_id, professor_id, carga_horaria, duracao, bolsa, requisitos, atividades)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [oportunidade_id, professor_id, carga_horaria, duracao, bolsa, requisitos, atividades]);
    res.status(201).json({ message: 'Detalhes da oportunidade criados', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar detalhes da oportunidade' });
  }
};

// --- ATUALIZAR ---
const updateOportunidadeDetalhes = async (req, res) => {
  const { id } = req.params;
  const { oportunidade_id, professor_id, carga_horaria, duracao, bolsa, requisitos, atividades } = req.body;
  try {
    const [result] = await db.query(`
      UPDATE oportunidades_detalhes 
      SET oportunidade_id = ?, professor_id = ?, carga_horaria = ?, duracao = ?, bolsa = ?, requisitos = ?, atividades = ? 
      WHERE id = ?
    `, [oportunidade_id, professor_id, carga_horaria, duracao, bolsa, requisitos, atividades, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalhes da oportunidade não encontrados' });
    res.json({ message: 'Detalhes da oportunidade atualizados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar detalhes da oportunidade' });
  }
};

// --- DELETAR ---
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
