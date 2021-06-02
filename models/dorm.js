'use strict';
module.exports = (sequelize, DataTypes) => {
  const dorm = sequelize.define('dorm', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM('Campur', 'Putra', 'Putri'),
    rooms_avaible: DataTypes.INTEGER,
    address: DataTypes.STRING,
    full_address: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    price: DataTypes.INTEGER,
    width: DataTypes.FLOAT,
    lenght: DataTypes.FLOAT,
    features: DataTypes.STRING,
    city: DataTypes.STRING,
    desc: DataTypes.STRING,
    images: DataTypes.STRING,
    owner: DataTypes.INTEGER
  }, {});
  dorm.associate = function(models) {
    // associations can be defined here
    dorm.belongsTo(models.user, {
      as: 'dormOwner',
      foreignKey: 'owner',
      attributes: {
        exlude: ['password', 'createdAt', 'updatedAt']
        // include: ['id', 'fullname', 'email', 'phone']
      }
    });
  };
  return dorm;
};