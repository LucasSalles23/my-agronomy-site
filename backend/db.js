 /*const mysql = require('mysql2');

const pool = mysql.createPool({
 host: 'localhost',      // seu XAMPP, geralmente localhost
 user: 'root',           // usuário do MySQL
 password: '',           // senha do MySQL
 database: 'professores_db', // nome do banco que você criou
 waitForConnections: true,
 connectionLimit: 10,
 queueLimit: 0
});

module.exports = pool.promise();

*/

/* const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'turntable.proxy.rlwy.net',      // host do Railway
  user: 'root',                           // usuário do banco
  password: 'cKhJDiMEwWxTihLLbFaqyAdnrdHEXqRG', // senha
  database: 'railway',                    // nome do banco
  port: 52504                              // porta do banco
});

module.exports = db;

*/

// Arquivo: db.js
const mysql = require('mysql2/promise'); // Usando require para Node comum
require('dotenv').config();              // Carrega variáveis do .env

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,       // Host do banco
  user: process.env.MYSQL_USER,       // Usuário do banco
  password: process.env.MYSQL_PASSWORD, // Senha do banco
  database: process.env.MYSQL_DATABASE, // Nome do banco
  port: process.env.MYSQL_PORT        // Porta do MySQL (geralmente 3306)
});

module.exports = db; // Exporta para usar nos controllers
