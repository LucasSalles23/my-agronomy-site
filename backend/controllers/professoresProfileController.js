const db = require('../db');

exports.getProfessorProfile = async (req, res) => {
  const { id } = req.params;
  try {
    // Passo 1: A consulta à sua view para pegar os dados principais do professor.
    const [rows] = await db.query(
      'SELECT * FROM view_professor_complete WHERE professor_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Perfil do professor não encontrado' });
    }

    // Passo 2: Pegamos os dados do professor da primeira linha.
    // Removemos as chaves que agora virão de tabelas separadas.
    const professorProfile = {
      professor_id: rows[0].professor_id,
      nome: rows[0].nome,
      cargo: rows[0].cargo,
      departamento: rows[0].departamento,
      email: rows[0].email,
      especializacao: rows[0].especializacao,
      telefone: rows[0].telefone,
      office: rows[0].office,
      lattes: rows[0].lattes,
      research_gate: rows[0].research_gate,
      biografia: rows[0].biografia,
      disciplinas: rows[0].disciplinas,
      // 'projetos_pesquisa' foi removido daqui para ser buscado da tabela correta.
    };

    // Passo 3: Criamos a lista de oportunidades a partir da view.
    const oportunidades = rows
      .filter(row => row.opportunity_id != null)
      .map(row => {
        return {
          id: row.opportunity_id,
          titulo: row.opportunity_title,
          tipo: row.opportunity_type,
          descricao: row.opportunity_description,
          data: row.opportunity_date
        };
      });

    // Passo 4: Buscar os estudantes orientados da tabela 'orientacoes'.
    const [orientacoesRows] = await db.query(
      'SELECT id, nome_estudante, tipo_orientacao, periodo, titulo_projeto FROM orientacoes WHERE professor_id = ?',
      [id]
    );

    // Passo 5: Buscar os projetos de pesquisa da tabela 'projetos_pesquisa'.
    const [projetosRows] = await db.query(
      'SELECT id, titulo, descricao, periodo, financiamento FROM projetos_pesquisa WHERE professor_id = ?',
      [id]
    );

    // =================================================================================
    // PASSO 6 (NOVO): Buscar as publicações da nova tabela 'publicacoes'.
    // =================================================================================
    const [publicacoesRows] = await db.query(
      'SELECT id, titulo, autores, revista_ou_conferencia, ano, link_publicacao FROM publicacoes WHERE professor_id = ? ORDER BY ano DESC',
      [id]
    );

    // Passo 7: Juntamos tudo no objeto final.
    const resultadoFinal = {
      ...professorProfile,
      oportunidades: oportunidades,
      orientacoes: orientacoesRows,
      projetos_pesquisa: projetosRows,
      publicacoes: publicacoesRows // <-- Adicionamos a nova lista de publicações aqui.
    };

    // Passo 8: Enviamos a resposta JSON completa e bem estruturada.
    res.json(resultadoFinal);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar perfil do professor' });
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
