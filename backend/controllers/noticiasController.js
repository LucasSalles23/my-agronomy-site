const noticiasDB = require('../noticias_db');

// --- LISTAR TODAS AS NOTÍCIAS ---
const getAllNoticias = async (req, res) => {
  try {
    const [rows] = await noticiasDB.query(`
      SELECT 
        n.id,
        n.titulo,
        n.resumo,
        n.conteudo,
        n.categoria,
        n.data_publicacao,
        n.ultima_atualizacao,
        n.visualizacoes,
        n.url_imagem,
        n.tags,
        a.nome AS autor_nome,
        a.curso AS autor_curso,
        a.periodo AS autor_periodo,
        a.url_avatar AS autor_url_avatar,
        a.iniciais AS autor_iniciais,
        r.nome AS revisor_nome,
        r.departamento AS revisor_departamento,
        r.iniciais AS revisor_iniciais
      FROM noticias n
      LEFT JOIN autores a ON n.autor_id = a.id
      LEFT JOIN revisores r ON n.revisor_id = r.id
      ORDER BY n.data_publicacao DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar notícias:', err);
    res.status(500).json({ error: 'Erro ao buscar notícias' });
  }
};


// Exemplo para buscar notícia individual
const getNoticiaById = async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await noticiasDB.query(`
      SELECT 
        n.*,
        a.nome AS autor_nome,
        a.curso AS autor_curso,
        a.periodo AS autor_periodo,
        a.url_avatar AS autor_url_avatar,
        a.iniciais AS autor_iniciais,
        r.nome AS revisor_nome,
        r.departamento AS revisor_departamento,
        r.iniciais AS revisor_iniciais
      FROM noticias n
      LEFT JOIN autores a ON n.autor_id = a.id
      LEFT JOIN revisores r ON n.revisor_id = r.id
      WHERE n.id = ?
    `, [id])

    if (rows.length === 0) return res.status(404).json({ error: 'Notícia não encontrada' })

    res.json(rows[0])
  } catch (err) {
    console.error('Erro ao buscar notícia:', err)
    res.status(500).json({ error: 'Erro ao buscar notícia' })
  }
}


// --- CRIAR NOTÍCIA ---
const createNoticia = async (req, res) => {
  const { titulo, resumo, conteudo, categoria, autor, revisor, data_publicacao, tags } = req.body;
  try {
    const [result] = await noticiasDB.query(
      `INSERT INTO noticias (titulo, resumo, conteudo, categoria, autor, revisor, data_publicacao, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, resumo, conteudo, categoria, autor, revisor, data_publicacao, tags]
    );
    res.status(201).json({ message: 'Notícia criada', id: result.insertId });
  } catch (err) {
    console.error('Erro ao criar notícia:', err);
    res.status(500).json({ error: 'Erro ao criar notícia' });
  }
};

// --- ATUALIZAR NOTÍCIA ---
const updateNoticia = async (req, res) => {
  const { id } = req.params;
  const { titulo, resumo, conteudo, categoria, autor, revisor, data_publicacao, tags } = req.body;
  try {
    const [result] = await noticiasDB.query(
      `UPDATE noticias 
       SET titulo = ?, resumo = ?, conteudo = ?, categoria = ?, autor = ?, revisor = ?, data_publicacao = ?, tags = ?
       WHERE id = ?`,
      [titulo, resumo, conteudo, categoria, autor, revisor, data_publicacao, tags, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Notícia não encontrada' });
    res.json({ message: 'Notícia atualizada' });
  } catch (err) {
    console.error('Erro ao atualizar notícia:', err);
    res.status(500).json({ error: 'Erro ao atualizar notícia' });
  }
};

// --- DELETAR NOTÍCIA ---
const deleteNoticia = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await noticiasDB.query('DELETE FROM noticias WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Notícia não encontrada' });
    res.json({ message: 'Notícia deletada' });
  } catch (err) {
    console.error('Erro ao deletar notícia:', err);
    res.status(500).json({ error: 'Erro ao deletar notícia' });
  }
};

module.exports = {
  getAllNoticias,
  getNoticiaById,
  createNoticia,
  updateNoticia,
  deleteNoticia
};
