// Arquivo: testDb.js
const db = require('./db.js'); // se estiver usando require/module.exports

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1'); // faz uma consulta simples
    console.log('Conexão OK:', rows);
  } catch (err) {
    console.error('Erro de conexão:', err);
  }
}

testConnection();
