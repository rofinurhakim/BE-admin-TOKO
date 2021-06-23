const express = require('express');
const { check } = require('express-validator');
require('express-group-routes');

const app = express();

const validator = require('../middleware/validators/auth');
const AuthController = require('../controllers/auth-controller');
const UsersController = require('../controllers/auth-controller')

app.group('/api/v1', router => {
    router.post('/register', validator.register, AuthController.register);
    router.post('/login', validator.login, AuthController.login);
    
})

app.group('/api/v1/users', router => {
    router.get("/", UsersController.getall);
    router.get("/:id", UsersController.getone);
    router.put("/:id", UsersController.update);
    router.delete("/:id", UsersController.destroy);
}) 



module.exports = app;
