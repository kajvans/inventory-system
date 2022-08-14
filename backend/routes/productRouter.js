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
    //query is not correctly working only selects products when in history also first there must be a query for only the name of the product
    //this is so that we can create buttons when a button is pressed than get the other information and the history of the current date
    //when clicked on the history button show all the history from that product
    const { search } = req.body;
    connection.query(`SELECT products.name, products.price, products.stock, products.location, products.barcode, history.sold, history.received 
    from history INNER JOIN products ON history.Product_id=products.id WHERE products.name LIKE '%${search}%' OR products.barcode='${search}'`, (err, results) => {
        if (err) {
            return res.status(404).json({ msg: "No results found" });
        }
        return res.status(200).json(results);
    });
})

module.exports = router;