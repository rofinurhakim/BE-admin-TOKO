const jwt = require('express-jwt');

const errorHandler = require('./error_handler');

exports.authorize = jwt({secret: 'mamikost-key'});
exports.handleAuthError = (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        return errorHandler(res, 401, err.message, '');
    }
}
