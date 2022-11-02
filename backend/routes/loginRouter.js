const router = require("express").Router();
const bcrypt = require("bcrypt");
const config = require("../databaseConfig");
const jwt = require("jsonwebtoken");

var connection = config.connection

router.post("", async (req, res) => {
    const { UserId, password } = req.body;
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM user WHERE UserId = ?",
            [UserId],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    }).then((results) => {
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, response) => {
                if (response) {
                    const token = jwt.sign(
                        { UserId: results[0].UserId, Perms: results[0].Perms },
                        process.env.JWT_SECRET
                    );
                    //set cookie with token and expiration date of 20 min
                    res.cookie("token", token, { httpOnly: true, maxAge: 20 * 60 * 1000 });
                    res.json({
                        user: {
                            UserId: results[0].UserId,
                            name: results[0].name,
                            email: results[0].email,
                        },
                        message: "Login successful",
                    });
                } else {
                    res.json({ message: "Wrong username/password combination" });
                }
            });
        } else {
            res.json({ message: "Wrong password combination" });
        }
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;