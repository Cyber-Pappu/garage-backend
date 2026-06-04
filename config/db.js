const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cyberpaul@981',
    database: 'car_mech_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Database Connection Failed', err);
        return;
    }

    console.log('MySQL Connected Successfully');
});

module.exports = connection;