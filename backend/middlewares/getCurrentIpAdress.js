const ip = require("ip");

const getCUrrentAdress = (req, res, next) => {
  return res.json({ ip: ip.address() });
};

module.exports = { getCUrrentAdress };
