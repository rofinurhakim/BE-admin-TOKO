const jwt = require("express-jwt");

const errorHandler = require("./error_handler");

exports.authorize = jwt({ secret: "#$et@$^asfq$%$b^^^qtat$" });
exports.handleAuthError = (err, req, res, next) => {
  if (err.name === "Unauthorized Error") {
    return errorHandler(res, 401, err.message, "");
  }
};