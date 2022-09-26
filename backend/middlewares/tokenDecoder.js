const jwt = require("jsonwebtoken");

const decodedToken = async (req, res, next) => {
  const { token } = req.body;
  if (token === undefined || token === null)
    return res.json({ status: "401", message: "Token is required" });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const { id } = decoded;
    if(id){
        res.json({ status: "200", message: id });
        next()
    }
    // console.log(decoded);
  } catch (err) {
    res.json({ status: 401, message: "Token is invalid" });
    next()
  }
};

module.exports = { decodedToken };
