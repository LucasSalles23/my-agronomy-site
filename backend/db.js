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




// backend/db.js
const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env' }); // garante que pegue o .env no backend

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306, // converte string para número
});

module.exports = db;
