const jwt = require("jsonwebtoken");

const config = require("../config")

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"].split(' ')[1];

  if (!token) {
    return res.status(403).send("Authentication required");
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Authentication");
  }
  return next();
};

module.exports = verifyToken;