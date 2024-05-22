const { verifyToken } = require("../lib/jwt");
const { getErrorName } = require("../lib/errors");
const { errorResponse } = require("../lib/response");

const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      errorResponse(res, 401, "Missing session token");

    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();

    const isUser = verifyToken(String(jwt));
    req.user = isUser;

    next();
  } catch (error) {
    const name = getErrorName(error);
    if (name === "TokenExpiredError")
      errorResponse(res, 401, "Session expired");
    else if (name === "JsonWebTokenError")
      errorResponse(res, 401, "Invalid token");
    else errorResponse(res, 400, "Invalid session");
  }
};

module.exports = auth;
