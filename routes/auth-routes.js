const express = require('express');
const { check } = require('express-validator');
require('express-group-routes');

const app = express();

const validator = require('../middleware/validators/auth');
const AuthController = require('../controllers/auth-controller');

app.group('/api/v1', router => {
    router.post('/register', validator.register, AuthController.register);
    router.post('/login', validator.login, AuthController.login);
})

module.exports = app;
