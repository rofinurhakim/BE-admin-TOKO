const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const errorHandler = require('../middleware/error_handler');
const { user } = require('../models');

exports.register = async (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
        return errorHandler(res, 422, 'Error Input', err.errors);
    }

    const { password } = req.body;
    const passwordHashed = bcrypt.hashSync(password, 10);

    try {
        let userData = await user.create(
            {...req.body, password: passwordHashed}
            // Object.assign(req.body, {password: passwordHashed})
        );
        if (userData) {
            const dataReturn = await user.authorize(userData.id);
            return res.status(201).json(dataReturn);
        }

    } catch (err) {
        return errorHandler(res, 500, 'Internal Server Error', err);
    }
}

exports.login = async (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
        return errorHandler(res, 422, 'Error Input', err.errors);
    }

    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Masukan email dan password'
        });
    }

    // const User = user;
    try {
        const userData = await user.authenticate(email, password);
        if (userData) {
            const dataReturn = await user.authorize(userData.id);
            return res.status(200).json(dataReturn);
        }

        return errorHandler(res, 422, 'Login failed', 'Email or password wrong');
    } catch (err) {
        return errorHandler(res, 500, 'Internal Server Error', err);
    }
}
