const { check } = require("express-validator");

const { user } = require("../../models");

exports.register = [
  check("email")
    .isEmail()
    .custom((value) => {
      return user.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("Email already taken");
        }
      });
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Min password lenght is 8"),
];

exports.login = [
  check("email").isEmail().withMessage("Please enter valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Min password lenght is 8"),
];