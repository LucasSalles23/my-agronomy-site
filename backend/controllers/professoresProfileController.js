const db = require('../db');

exports.getProfessorProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM view_professor_complete WHERE professor_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Perfil do professor não encontrado' });
    }

    res.json(rows[0]); // Retorna o primeiro resultado
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar perfil do professor' });
  }
};


exports.createProfessorProfile = async (req, res) => {
  const { professor_id, bio, academic_info, contact_info } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO professor_profile (professor_id, bio, academic_info, contact_info) VALUES (?, ?, ?, ?)',
      [professor_id, bio, academic_info, contact_info]
    );
    res.status(201).json({ message: 'Perfil do professor criado com sucesso', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar perfil do professor' });
  }
};


exports.updateProfessorProfile = async (req, res) => {
  const { id } = req.params;
  const { bio, academic_info, contact_info } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE professor_profile SET bio = ?, academic_info = ?, contact_info = ? WHERE professor_id = ?',
      [bio, academic_info, contact_info, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Perfil do professor não encontrado' });
    }
    res.json({ message: 'Perfil do professor atualizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar perfil do professor' });
  }
};


exports.deleteProfessorProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM professor_profile WHERE professor_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Perfil do professor não encontrado' });
    }
    res.json({ message: 'Perfil do professor excluído com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir perfil do professor' });
  }
};

