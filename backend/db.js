const mysql = require('mysql2');
require('dotenv').config(); // garante que as variáveis do .env sejam carregadas

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,       // host do Railway
  user: process.env.MYSQLUSER,       // usuário do Railway
  password: process.env.MYSQLPASSWORD, // senha do Railway
  database: process.env.MYSQLDATABASE, // nome do banco
  port: process.env.MYSQLPORT,       // porta do banco (geralmente 3306)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();






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