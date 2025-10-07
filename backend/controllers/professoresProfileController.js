const db = require('../db');

exports.getProfessorProfile = async (req, res) => {
  const { id } = req.params;
  try {
    // PASSO 1: Busca os dados principais do professor da VIEW NOVA E CORRIGIDA.
    const [professorRows] = await db.query(
      'SELECT * FROM view_professor_complete WHERE professor_id = ?',
      [id]
    );

    if (professorRows.length === 0) {
      return res.status(404).json({ message: 'Perfil do professor não encontrado' });
    }
    const professorData = professorRows[0];

    // PASSO 2: Busca todas as listas de dados das tabelas separadas.
    const [
      oportunidadesRows,
      orientacoesRows,
      projetosRows,
      publicacoesRows,
      disciplinasRows,
    ] = await Promise.all([
      db.query('SELECT id, titulo, tipo, descricao, data_publicacao FROM oportunidades WHERE professor_id = ?', [id]),
      db.query('SELECT id, nome_estudante, tipo_orientacao, periodo, titulo_projeto FROM orientacoes WHERE professor_id = ?', [id]),
      db.query('SELECT id, titulo, descricao, periodo, financiamento FROM projetos_pesquisa WHERE professor_id = ?', [id]),
      db.query('SELECT id, titulo, autores, revista_ou_conferencia, ano, link_publicacao FROM publicacoes WHERE professor_id = ? ORDER BY ano DESC', [id]),
      db.query(`
        SELECT d.id, d.nome, d.codigo_disciplina 
        FROM disciplinas d
        JOIN professor_disciplina pd ON d.id = pd.disciplina_id
        WHERE pd.professor_id = ?`, 
        [id]
      ),
    ]);

    // PASSO 3: Junta tudo em um único objeto JSON.
    const resultadoFinal = {
      ...professorData, // Pega tudo da view (nome, cargo, email, lattes, etc.)
      
      // Adiciona as listas que foram buscadas
      oportunidades: oportunidadesRows[0],
      orientacoes: orientacoesRows[0],
      projetos_pesquisa: projetosRows[0],
      publicacoes: publicacoesRows[0],
      disciplinas: disciplinasRows[0],
    };

    // PASSO 4: Envia a resposta.
    res.json(resultadoFinal);

  } catch (err) {
    console.error("Erro ao buscar perfil completo do professor:", err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};



// As funções abaixo (create, update, delete) permanecem inalteradas.
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
