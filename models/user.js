"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      nama_lengkap: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {}
  );

  // user.associate = function(models) {
  //   user.hasMany(models.dorm, {
  //     as: 'dormsList',
  //     foreignKey: 'owner'
  //   });
  // };

  user.authenticate = async (email, password) => {
    const userData = await user.findOne({ where: { email } });

    if (userData) {
      if (await bcrypt.compare(password, userData.password)) {
        return userData;
      }
    }
    return false;
  };

  user.authorize = async (userId) => {
    const token = await jwt.sign({ userId }, "#$et@$^asfq$%$b^^^qtat$");
    const userData = await user.findOne({
      where: { id: userId },
      attributes: ["nama_lengkap", "email", "id"],
    });

    return { userData, token };
  };

  return user;
};