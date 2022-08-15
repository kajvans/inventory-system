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
    connection.query(`SELECT history.sold AS sold, history.received AS received, history.deleted AS deleted, history.date AS date products.id AS id, products.name AS name, products.price AS price, products.stock AS stock, products.barcode AS barcode, products.category AS category, products.location AS location, products.expire AS expire
    FROM history INNER JOIN products ON history.product_id = products.id WHERE products.name='${search}' OR barcode='%${search}%'`, (err, result) => {
        if (result.lenhth < 2) res.send(result);
        else {
            connection.query(`SELECT name, price FROM products WHERE name LIKE '%${search}%'`, (err, result) => {
                if (err) res.status(404).send(msg = "Product not found");
                else res.send(result);
            })
        }
    })
})

router.post("/select", (req, res) => {
    const { search } = req.body;
    connection.query(`SELECT history.sold AS sold, history.received AS received, history.deleted AS deleted, history.date AS date products.id AS id, products.name AS name, products.price AS price, products.stock AS stock, products.barcode AS barcode, products.category AS category, products.location AS location, products.expire AS expire
    FROM history INNER JOIN products ON history.product_id = products.id WHERE products.name='${search}' OR barcode='%${search}%'`, (err, result) => {
        if (err) res.status(404).send(msg = "Product not found");
        else res.send(result);
    })
})

router.post("/history", (req, res) => {
    const { name} = req.body;
    connection.query(`SELECT history.sold AS sold, history.received AS received, history.deleted AS deleted, history.date AS date FROM history INNER JOIN products ON history.products_id=products.id WHERE products.name='${name}'`, (err, result) => {
        if (err) res.status(404).send(msg = "Product not found");
        else res.send(result);
    })
})

module.exports = router;