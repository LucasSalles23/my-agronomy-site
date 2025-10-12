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


import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
});

export default db;
