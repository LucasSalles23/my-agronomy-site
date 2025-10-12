import { query } from '../backend/lib/db'; // Note o caminho para o arquivo db.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const professores = await query({
        query: 'SELECT * FROM professores',
        values: [],
      });
      res.status(200).json(professores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar professores' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
