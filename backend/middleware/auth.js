const jwt = require("jsonwebtoken");

// status code 401 means unauthorized

const auth = (req, res, next) => {
  //const Token = req.header("x-auth-token");
  const Token = req.cookies.token;
  //refresh cookie
  res.cookie("token", Token, { httpOnly: true, maxAge: 20 * 60 * 1000 });
  if (!Token) return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(Token, process.env.JWT_SECRET);
    req.UserId = decoded.UserId;
    req.Perms = decoded.Perms;
    next();
  }
  catch (err) {
    res.status(401).json({ msg: "Token is not valid" })
  }
};

module.exports = auth;