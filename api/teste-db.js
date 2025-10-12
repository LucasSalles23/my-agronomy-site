import { query } from '../backend/lib/db';

export default async function handler(req, res) {
  try {
    const testData = await query({
      query: 'SELECT id, nome FROM professores LIMIT 3',
      values: [],
    });
    res.status(200).json({
      status: 'Conexão com o Railway bem-sucedida!',
      data: testData,
    });
  } catch (error) {
    res.status(500).json({ status: 'Erro!', error: error.message });
  }
}
