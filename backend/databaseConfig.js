var mysql = require('mysql');

config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

var connection = mysql.createConnection(config);

connection.connect(function (err) {
    if (err) {
        console.log('error connecting:' + err.stack);
    }
    console.log('connected successfully to DB.');
});

module.exports = {
    connection: mysql.createConnection(config)
} 