/* const db = require('../db'); // conexão com mysql2/promise

// --- 1. Buscar todas as oportunidades (JÁ ESTAVA CORRETO) ---
exports.getAllOpportunities = async (req, res) => {
  const sql = `
    SELECT 
        o.id, 
        o.titulo, 
        o.tipo, 
        o.descricao, 
        o.data_publicacao AS publishDate,
        p.nome AS professor,
        d.nome AS department
    FROM 
        oportunidades o
    LEFT JOIN 
        professores p ON o.professor_id = p.id
    LEFT JOIN 
        departamentos d ON p.departamento_id = d.id -- Junta com a tabela de departamentos
    ORDER BY 
        o.data_publicacao DESC;
  `;

  try {
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar oportunidades:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};


// --- 2. Buscar uma oportunidade pelo ID (AGORA CORRIGIDO) ---
exports.getOpportunityById = async (req, res) => {
  const { id } = req.params;
  
  // A consulta SQL agora é idêntica à de cima, mas com o 'WHERE o.id = ?'
  const sql = `
    SELECT 
        o.id, 
        o.titulo, 
        o.tipo, 
        o.descricao, 
        o.data_publicacao AS publishDate,
        p.id AS professor_id, 
        p.nome AS professor,
        -- CORREÇÃO: Busca o nome da tabela 'departamentos'
        d.nome AS department
    FROM 
        oportunidades o
    LEFT JOIN 
        professores p ON o.professor_id = p.id
    -- CORREÇÃO: Adiciona o JOIN com a tabela de departamentos
    LEFT JOIN 
        departamentos d ON p.departamento_id = d.id
    WHERE 
        o.id = ?
  `;

  try {
    const [rows] = await db.query(sql, [id]);

    if (!rows.length) {
      return res.status(404).json({ message: 'Oportunidade não encontrada' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao buscar oportunidade:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// ... (suas outras funções, se houver)


// --- 3. Criar oportunidade ---
exports.createOpportunity = async (req, res) => {
  const { titulo, tipo, descricao, data_publicacao, professor_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO oportunidades (titulo, tipo, descricao, data_publicacao, professor_id) VALUES (?, ?, ?, ?, ?)',
      [titulo, tipo, descricao, data_publicacao, professor_id]
    );
    res.status(201).json({ message: 'Oportunidade criada com sucesso', id: result.insertId });
  } catch (err) {
    console.error("Erro ao criar oportunidade:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// --- 4. Atualizar oportunidade ---
exports.updateOpportunity = async (req, res) => {
  const { id } = req.params;
  const { titulo, tipo, descricao, data_publicacao, professor_id } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE oportunidades SET titulo = ?, tipo = ?, descricao = ?, data_publicacao = ?, professor_id = ? WHERE id = ?',
      [titulo, tipo, descricao, data_publicacao, professor_id, id]
    );
    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Oportunidade não encontrada' });
    }
    res.json({ message: 'Oportunidade atualizada com sucesso' });
  } catch (err) {
    console.error("Erro ao atualizar oportunidade:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// --- 5. Deletar oportunidade ---
exports.deleteOpportunity = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM oportunidades WHERE id = ?', [id]);
    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Oportunidade não encontrada' });
    }
    res.json({ message: 'Oportunidade excluída com sucesso' });
  } catch (err) {
    console.error("Erro ao excluir oportunidade:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
 */



// controllers/oportunidadesController.js
const db = require('../db.js');

// --- 1. Buscar todas as oportunidades ---
const getAllOpportunities = async (req, res) => {
  const sql = `
    SELECT 
        o.id, 
        o.titulo, 
        o.tipo, 
        o.descricao, 
        o.data_publicacao AS publishDate,
        p.nome AS professor,
        d.nome AS department
    FROM 
        oportunidades o
    LEFT JOIN 
        professores p ON o.professor_id = p.id
    LEFT JOIN 
        departamentos d ON p.departamento_id = d.id
    ORDER BY 
        o.data_publicacao DESC;
  `;

  try {
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar oportunidades:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// --- 2. Buscar uma oportunidade pelo ID ---
const getOpportunityById = async (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT 
        o.id, 
        o.titulo, 
        o.tipo, 
        o.descricao, 
        o.data_publicacao AS publishDate,
        p.id AS professor_id, 
        p.nome AS professor,
        d.nome AS department
    FROM 
        oportunidades o
    LEFT JOIN 
        professores p ON o.professor_id = p.id
    LEFT JOIN 
        departamentos d ON p.departamento_id = d.id
    WHERE 
        o.id = ?
  `;

  try {
    const [rows] = await db.query(sql, [id]);
    if (!rows.length) return res.status(404).json({ message: 'Oportunidade não encontrada' });
    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao buscar oportunidade:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// --- 3. Criar oportunidade ---
const createOpportunity = async (req, res) => {
  const { titulo, tipo, descricao, data_publicacao, professor_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO oportunidades (titulo, tipo, descricao, data_publicacao, professor_id) VALUES (?, ?, ?, ?, ?)',
      [titulo, tipo, descricao, data_publicacao, professor_id]
    );
    res.status(201).json({ message: 'Oportunidade criada com sucesso', id: result.insertId });
  } catch (err) {
    console.error("Erro ao criar oportunidade:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// --- 4. Atualizar oportunidade ---
const updateOpportunity = async (req, res) => {
  const { id } = req.params;
  const { titulo, tipo, descricao, data_publicacao, professor_id } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE oportunidades SET titulo = ?, tipo = ?, descricao = ?, data_publicacao = ?, professor_id = ? WHERE id = ?',
      [titulo, tipo, descricao, data_publicacao, professor_id, id]
    );
    if (!result.affectedRows) return res.status(404).json({ message: 'Oportunidade não encontrada' });
    res.json({ message: 'Oportunidade atualizada com sucesso' });
  } catch (err) {
    console.error("Erro ao atualizar oportunidade:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// --- 5. Deletar oportunidade ---
const deleteOpportunity = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM oportunidades WHERE id = ?', [id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Oportunidade não encontrada' });
    res.json({ message: 'Oportunidade excluída com sucesso' });
  } catch (err) {
    console.error("Erro ao excluir oportunidade:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  getAllOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
};
