const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const permAuth = require("../middleware/permAuth");
const config = require("../databaseConfig");
const auth = require("../middleware/auth");

var connection = config.connection

router.post("/register", permAuth(10), async (req, res) => {
    const { UserId, name, email, password, Perms } = req.body;
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
            res.json({ message: "User already exists" });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    connection.query(
                        "INSERT INTO user SET ?",
                        {
                            UserId: UserId,
                            name: name,
                            email: email,
                            password: hash,
                            Perms: Perms,
                        },
                        (err, results) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({ message: "User registered" });
                            }
                        }
                    );
                }
            });
        }
    }).catch((err) => {
        console.log(err);
    });
});

router.post("/delete", permAuth(10), async (req, res) => {
    const { UserId } = req.body;
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
            connection.query(
                "DELETE FROM user WHERE UserId = ?",
                [UserId],
                (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ message: "User deleted" });
                    }
                }
            );
        } else {
            res.json({ message: "User does not exist" });
        }
    }).catch((err) => {
        console.log(err);
    });
});

router.post("/resetPassword", permAuth(10), async (req, res) => {
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
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    connection.query(
                        "UPDATE user SET password = ? WHERE UserId = ?",
                        [hash, UserId],
                        (err, results) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({ message: "Password changed" });
                            }
                        }
                    );
                }
            });
        } else {
            res.json({ message: "User does not exist" });
        }
    }).catch((err) => {
        console.log(err);
    });
});

router.post("/updatePassword", async (req, res) => {
    const { old, password } = req.body;
    const UserId = req.user.UserId;
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
            bcrypt.compare(old, results[0].password, (err, response) => {
                if (response) {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                        } else {
                            connection.query(
                                "UPDATE user SET password = ? WHERE UserId = ?",
                                [hash, UserId],
                                (err, results) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.json({ message: "Password changed" });
                                    }
                                }
                            );
                        }
                    });
                } else {
                    res.json({ message: "Wrong password combination" });
                }
            });
        } else {
            res.json({ message: "User does not exist" });
        }
    }).catch((err) => {
        console.log(err);
    });
});

router.post("/updatePerms", permAuth(10), async (req, res) => {
    const { UserId, Perms } = req.body;
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
            connection.query(
                "UPDATE user SET Perms = ? WHERE UserId = ?",
                [Perms, UserId],
                (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ message: "Permissions changed" });
                    }
                }
            );
        } else {
            res.json({ message: "User does not exist" });
        }
    }).catch((err) => {
        console.log(err);
    });
});

router.post("/updateEmail", async (req, res) => {
    const { email } = req.body;
    const UserId = req.UserId;
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
            connection.query(
                "UPDATE user SET email = ? WHERE UserId = ?",
                [email, UserId],
                (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ message: "Email changed" });
                    }
                }
            );
        } else {
            res.json({ message: "User does not exist" });
        }
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;