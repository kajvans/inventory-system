const router = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

router.post("/search", (req, res) => {
    const { search } = req.body;
    return new Promise((resolve, reject) => {
        var sql = `SELECT name, price FROM products WHERE name LIKE ?`;
        connection.query(sql, ["%" + search + "%"], (err, result) => {
            if (err) reject(err);
            else if (result.length === 0) reject("No results found");
            resolve(result);
        }
        );
    }).then(result => {
        if (result.length === 1) {
            return new Promise((resolve, reject) => {
                var sql = `SELECT products.name AS name, products.price AS price, products.stock AS stock, products.barcode AS barcode, products.category AS category, products.location AS location, products.expire AS expire, history.sold AS sold, history.received AS received, history.deleted AS deleted, DATE_FORMAT(history.date, '%e/%c/%Y') AS date FROM products INNER JOIN history ON history.products_id = products.id WHERE name = ? ORDER BY history.date DESC LIMIT 1`;
                var inserts = [search];
                connection.query(sql, inserts, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
                );
            }).then(result => {
                res.json(result);
            }).catch(err => {
                res.json(err);
            });
        }
        else {
            res.json(result);
        }
    }).catch(err => {
        res.json(err);
    });
})

router.post("/select", (req, res) => {
    const { search } = req.body;
    return new Promise((resolve, reject) => {
        var sql = `SELECT history.sold AS sold, history.received AS received, history.deleted AS deleted, DATE_FORMAT(history.date, '%e/%c/%Y') AS date, products.name AS name, products.price AS price, products.stock AS stock, products.barcode AS barcode, products.category AS category, products.location AS location, products.expire AS expire FROM products INNER JOIN history ON history.products_id = products.id WHERE name = ? ORDER BY history.date DESC LIMIT 1`;
        var inserts = [search];
        connection.query(sql, inserts, (err, result) => {
            if (err) reject(err);
            else if (result.length === 0) reject("No results found");
            resolve(result);
        });
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
})

router.post("/history", (req, res) => {
    const { search } = req.body;
    return new Promise((resolve, reject) => {
        var sql = `SELECT history.sold AS sold, history.received AS received, history.deleted AS deleted, DATE_FORMAT(history.date, '%e/%c/%Y') AS date FROM history INNER JOIN products ON history.products_id = products.id WHERE name = ? ORDER BY history.date DESC`;
        var inserts = [search];
        connection.query(sql, inserts, (err, result) => {
            if (err) reject(err);
            else if (result.length === 0) reject("No results found");
            resolve(result);
        });
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
})

router.post("/sold", (req, res) => {
    const { search, number } = req.body;
    return new Promise((resolve, reject) => {
        var sql = `SELECT id FROM products WHERE name = ?`;
        var inserts = [search];
        connection.query(sql, inserts, (err, result) => {
            if (err) reject(err);
            else if (result.length === 0) reject("No results found");
            resolve(result);
        });
    }).then(result => {
        var sql = `UPDATE products SET stock = stock - ? WHERE id = ?; UPDATE history SET sold = sold + ? WHERE products_id = ? WHERE date = CURRENT_TIMESTAMP `;
        var inserts = [number, result[0].id, number, result[0].id];
        return new Promise((resolve, reject) => {
            connection.query(sql, inserts, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
            );
        }).then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    }).catch(err => {
        res.json(err);
    });
})

router.post("/received", (req, res) => {
    const { search, number } = req.body;
    return new Promise((resolve, reject) => {
        var sql = `SELECT id FROM products WHERE name = ?`;
        var inserts = [search];
        connection.query(sql, inserts, (err, result) => {
            if (err) reject(err);
            else if (result.length === 0) reject("No results found");
            resolve(result);
        }
        );
    }).then(result => {
        var sql = `UPDATE products SET stock = stock + ? WHERE id = ?; UPDATE history SET received = received + ? WHERE products_id = ? WHERE date = CURRENT_TIMESTAMP`;
        var inserts = [number, result[0].id, number, result[0].id];
        return new Promise((resolve, reject) => {
            connection.query(sql, inserts, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        }).then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    }).catch(err => {
        res.json(err);
    })
})

module.exports = router;