const mysql = require('mysql');

// Database Connection
const connection = mysql.createConnection ({
    host: "localhost",

    port: 3306,

    user: "root",
    password: "DanWillCode3000!",
    database: "Track_tdb",
});

// MySQL Connection
connection.connect(error => {
    if (error) throw error;
});

module.exports = connection;