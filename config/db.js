const mysql = require('mysql2');

const connection = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.connect((err) => {
    if (err) {
        console.error('Database Connection Failed', err);
        return;
    }

    console.log('MySQL Connected Successfully');
});

module.exports = connection;