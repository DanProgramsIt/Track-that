const mysql = require('mysql');

// Database Connection
const connection = mysql.createConnection ({
    host: 'localhost',

    port: 3200,

    user: 'root',
    password: 'DanWillCode3000!',
});

// MySQL Connection
connection.connect(error => {
    if (error) throw error;
});

module.exports = connection;