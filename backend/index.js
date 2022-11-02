const express = require("express");
const dailyUpdate = require("./dailyUpdate");
const cors = require("cors");
require("dotenv").config();
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");


// set up express
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())

// this variable is for online hosting like heroku or our localhost:5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

//if time is 00:00:00, run dailyUpdate
const time = new Date();
if (time.getHours() === 0 && time.getMinutes() === 0 && time.getSeconds() === 0) {
  dailyUpdate();
}

app.use("/login", require("./routes/loginRouter"));
app.use("/users", auth, require('./routes/userRouter')); 
app.use("/products", auth, require('./routes/productRouter'));

module.exports = app;