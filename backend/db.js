const mysql = require('mysql2');

const pool = mysql.createPool(process.env.DATABASE_URL).promise();

module.exports = pool;


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