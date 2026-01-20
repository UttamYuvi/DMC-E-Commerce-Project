const jwt = require("jsonwebtoken");
const config = require("./config");
const result = require("./result");

function authorization(req, res, next) {
  const url = req.url;
  console.log("authorization: ", url);
  if (url == "/admin/signin" || url == "/admin/signup") next();
  else {
    const token = req.headers.token;
    console.log("token: ", token);
    if (token) {
      try {
        const payload = jwt.verify(token, config.SECRET);
        console.log("payload: ", payload);
        req.headers.adminId = payload.uid;
        next();
      } catch (error) {
        res.send(result.createResult("Invalid Token"));
      }
    } else {
      res.send(result.createResult("Token is missing"));
    }
  }
}

module.exports = authorization;
