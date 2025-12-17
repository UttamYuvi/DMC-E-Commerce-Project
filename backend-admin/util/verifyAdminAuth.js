const jwt = require("jsonwebtoken");
const config = require("./config");
const result = require("./result");

module.exports = (req, res, next) => {
  const authHeader = req.headers.token;

  if (!authHeader)
    return res.status(401).send(result.createResult("No token provided"));

  jwt.verify(authHeader, config.SECRET, (err, decoded) => {
    if (err) return res.send(result.createResult("Invalid Token"));
    req.vendorId = decoded.vendorId;
    next();
  });
};