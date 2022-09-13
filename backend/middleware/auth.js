const jwt = require("jsonwebtoken");

// status code 401 means unauthorized

const auth = (req, res, next) => {
  try {
    // checking x-auth-token with our jwt token
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
    }
    // Grabbing out jwt token, passing our JWT_SECRET and checking it cordinates with our user we have selected
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    }
    req.user = verified.id;
    next();
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

//write an auth middleware to check if the user has the correct API key for the route they are trying to access
const authAPI = (req, res, next) => {
  try {
    // checking x-auth-token with our jwt token
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
    }
    // Grabbing out jwt token, passing our JWT_SECRET and checking it cordinates with our user we have selected
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    }
    req.user = verified.id;
    //get the route the user is trying to access
    const route = req.originalUrl;
    
    //get api key from jws token
    const APIkey = verified.APIkey;

    //check if the user can acces the route with the api key
    switch (route) {
      case "/products/search" || "/products/select" || "/products/history" || "/products/getlow" || "/products/getexpire" || "/products/getprice":
        if (APIkey === process.env.API_KEY_VIEW || APIkey === process.env.API_KEY_ADMIN || APIkey === process.env.API_KEY_EDIT) {
          next();
        }
        break;
      case "/products/setstock" || "/products/setexpire" || "/products/sold" || "/products/received":
        if (APIkey === process.env.API_KEY_EDIT || APIkey === process.env.API_KEY_ADMIN) {
          next();
        }
        break;

      case "/products/userchanges" || "/products/userhistory":
        if (APIkey === process.env.API_KEY_ADMIN) {
          next();
        }
        break;
  
      default:
        res.status(401).json({ msg: "You are not authorized to access this route." });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

module.exports = auth;