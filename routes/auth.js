const jwt = require("jsonwebtoken");

const config = require("../config")

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"].split(' ')[1];

  if (!token) {
    return res.send({
      data: {},
      message: "Authentificattion requis",
      status: 400,
    });
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
  } catch (err) {
    return res.send({
      data: {},
      message: "Session invalid",
      status: 401,
    });
  }
  return next();
};

module.exports = verifyToken;