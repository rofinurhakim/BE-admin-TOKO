'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.dorm, {
      as: 'dormsList',
      foreignKey: 'owner'
    });
  };

  user.authenticate = async (email, password) => {
    const userData = await user.findOne({where: {email}});

    if (userData) {
      if (await bcrypt.compare(password, userData.password)) {
        return userData;
      }
    }
    return false;
  }

  user.authorize = async (userId) => {
    const token = await jwt.sign({userId}, 'mamikost-key');
    const userData = await user.findOne({
      where: {id: userId},
      attributes: ['fullname', 'email', 'phone']
    });
    
    return {userData, token};
  }

  return user;
};