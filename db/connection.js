const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'veterinaria',
    port: '3306',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos!');
});

module.exports = connection;
