const { sign, verify } = require("jsonwebtoken");

const generateToken = (user) => {
  const jwt = sign({ ...user }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return jwt;
};

const verifyToken = (token) => {
  const isOk = verify(token, process.env.JWT_SECRET);

  return isOk;
};

module.exports = {
  generateToken,
  verifyToken,
};
