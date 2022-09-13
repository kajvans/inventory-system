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
    if (err) return console.log(err);
    console.log("Connected!");
});

router.post("/search", (req, res) => {
    const { name } = req.body;
    return new Promise((resolve, reject) => {
        var sql = `SELECT name, price FROM products WHERE name LIKE ?`;
        connection.query(sql, ["%" + name + "%"], (err, result) => {
            if (err) reject(err);
            else if (result.length === 0) reject("No results found");
            resolve(result);
        }
        );
    }).then(result => {
        if (result.length === 1) {
            return new Promise((resolve, reject) => {
                var sql = `SELECT products.name AS name, products.price AS price, products.stock AS stock, products.barcode AS barcode, products.category AS category, products.location AS location, products.expire AS expire, history.sold AS sold, history.received AS received, history.deleted AS deleted, DATE_FORMAT(history.date, '%e/%c/%Y') AS date FROM products INNER JOIN history ON history.products_name = products.name WHERE name = ? ORDER BY history.date DESC LIMIT 1`;
                var inserts = [name];
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
    const { name } = req.body;
    return new Promise((resolve, reject) => {
        var sql = `SELECT history.sold AS sold, history.received AS received, history.deleted AS deleted, DATE_FORMAT(history.date, '%e/%c/%Y') AS date, products.name AS name, products.price AS price, products.stock AS stock, products.barcode AS barcode, products.category AS category, products.location AS location, products.expire AS expire FROM products INNER JOIN history ON history.products_name = products.name WHERE name = ? ORDER BY history.date DESC LIMIT 1`;
        var inserts = [name];
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
        var sql = `SELECT history.sold AS sold, history.received AS received, history.deleted AS deleted, DATE_FORMAT(history.date, '%e/%c/%Y') AS date FROM history INNER JOIN products ON history.products_name = products.name WHERE name = ? ORDER BY history.date DESC`;
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

//change the stock of multiple products with a for loop
router.post("/sold", (req, res) => {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < req.body.length; i++) {
            const { name, sold } = req.body[i];
            var sql = `UPDATE products SET stock = stock - ? WHERE name = ?`;
            var inserts = [sold, name];
            connection.query(sql, inserts, (err, result) => {
                if (err) reject(err);
                else {
                    var sql = `UPDATE history SET sold = sold + ? WHERE products_name = ? AND date = CURRENT_DATE`;
                    var inserts = [sold, name];
                    connection.query(sql, inserts, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                }
            });
        }
        resolve("Success");
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
})

router.post("/received", (req, res) => {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < req.body.length; i++) {
            const { name, received } = req.body[i];
            var sql = `UPDATE products SET stock = stock + ? WHERE name = ?`;
            var inserts = [received, name];
            connection.query(sql, inserts, (err, result) => {
                if (err) reject(err);
                else {
                    var sql = `UPDATE history SET received = received + ? WHERE products_name = ? AND date = CURRENT_DATE`;
                    var inserts = [received, name];
                    connection.query(sql, inserts, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                }
            });
        }
        resolve("Success");
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
})

router.get('/getlow', (req, res) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT name, stock, location FROM products WHERE stock < ${process.env.MIN_CHECK}`;
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        }
        );
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
})

router.get('/getexpire', (req, res) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT name, expire FROM products WHERE expire < DATE_ADD(CURDATE(),INTERVAL ${process.env.EXPIRE} DAY)`;
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        }
        );
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
})

router.post('/getprice', (req, res) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT price FROM products WHERE name = ?`;
        var inserts = [req.body.name];
        connection.query(sql, inserts, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
})

router.post("/setstock" , (req, res) => {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < req.body.length; i++) {
            const { name, newStock } = req.body[i];
            var sql = `SELECT stock FROM products WHERE name = ?`;
            var inserts = [name];
            connection.query(sql, inserts, (err, result) => {
                const oldStock = result[0].stock;
                if (err) reject(err);
                else {
                    var sql = `UPDATE products SET stock = ? WHERE name = ?`;
                    var inserts = [newStock, name];
                    connection.query(sql, inserts, (err, result) => {
                        if (err) reject(err);
                        if(oldStock > newStock){
                            var sql = `UPDATE history SET deleted = deleted + ? WHERE products_name = ?`;
                            var inserts = [oldStock - newStock, name];
                            connection.query(sql, inserts, (err, result) => {
                                if (err) reject(err);
                                else resolve(result);
                            });
                        }else{
                            var sql = `UPDATE history SET added = added + ? WHERE products_name = ?`;
                            var inserts = [newStock - oldStock, name];
                            connection.query(sql, inserts, (err, result) => {
                                if (err) reject(err);
                                else resolve(result);
                            });
                        }
                    });
                }
            });
        }
        resolve("Success");
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
})

router.post("/setexpire", (req, res) => {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < req.body.length; i++) {
            const { name, expire } = req.body[i];
            var sql = `UPDATE products SET expire = ? WHERE name = ?`;
            var inserts = [expire, name];
            connection.query(sql, inserts, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
            );
        }
        resolve("Success");
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
})

router.get("/userchanges", (req, res) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT `change`, user,DATE_FORMAT(CURRENT_TIMESTAMP, '%H:%i %d-%m-%y') AS date FROM `change` WHERE products_name = ?";
        var inserts = [req.query.name];
        connection.query(sql, inserts, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
})

router.get("/userhistory", (req, res) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT `change`, products_name AS procuct, DATE_FORMAT(CURRENT_TIMESTAMP, '%H:%i %d-%m-%y') AS date FROM `change` WHERE user = ?";
        var inserts = [req.query.user];
        connection.query(sql, inserts, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
})

module.exports = router;