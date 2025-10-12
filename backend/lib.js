// Arquivo: /lib/db.js
import mysql from 'mysql2/promise';

// Esta é a nossa nova função de conexão.
// Ela é "serverless-friendly", ou seja, cria e fecha a conexão a cada chamada.
export async function query({ query, values = [] }) {
  // 1. Conecta ao banco usando as Variáveis de Ambiente que você configurou na Vercel.
  const dbconnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // Importante: O Railway pode exigir conexão segura (SSL).
    // Se a conexão falhar, podemos adicionar uma configuração de SSL aqui.
  });

  try {
    // 2. Executa a query (a consulta SQL que você quer fazer)
    const [results] = await dbconnection.execute(query, values);
    
    // 3. Fecha a conexão para liberar recursos na Vercel
    dbconnection.end();
    
    // 4. Retorna os resultados da sua consulta
    return results;
  } catch (error) {
    // Se der erro, ele será capturado e exibido nos logs da Vercel.
    console.error("Erro na query:", error.message);
    throw Error(error.message);
  }
}
