const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, dc) => {
      if (err) {
        console.log(err.message);
        res.json({ status: "404", Message: "Token invalid" });
      } else {
        res.json({ status: "200", Message: "Authrized" });
        next()
      }
    });
  } else {
    // res.json({ status: "404", Message: "unAuthrized"});
    next();
  }


};

module.exports = { requireAuth };
