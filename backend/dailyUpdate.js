const mysql = require("mysql");


function update(){
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    
    connection.connect(function (err) {
        if (err) return console.log(err);
        console.log("yes!");
    });
    var sql = `SELECT name FROM products`;
    new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    }).then(result => {
        createHistoryRow(result, connection);
    }).catch(err => {
        console.log(err);
    });
}

function createHistoryRow(result, connection){
    new Promise((resolve, reject) => {
        for(var i = 0; i < result.length; i++){
            var sql = `INSERT INTO history (products_name, sold, received, deleted, date) VALUES (?, 0, 0, 0, CURRENT_DATE)`;
            var inserts = [result[i].name];
            connection.query(sql, inserts, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
            );
        }
    }).then(result => {
        console.log("done");
        connection.end();
    }
    ).catch(err => {
        console.log(err);
    });
}

module.exports = update;