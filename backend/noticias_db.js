const mysql = require('mysql2');

// Pool para noticias_db
const noticiasDB = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'noticias_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

module.exports = noticiasDB;
