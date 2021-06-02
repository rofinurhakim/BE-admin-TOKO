'use strict';
module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define('booking', {
    dorm_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date_entries: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  booking.associate = function(models) {
    // associations can be defined here

    booking.belongsTo(models.user, {
      as: 'bookingCustomer',
      foreignKey: 'user_id',
      attributes: {
        exlude: ['password', 'createdAt', 'updatedAt']
        // include: ['id', 'fullname', 'email', 'phone']
      }
    });

    booking.belongsTo(models.dorm, {
      as: 'bookingDorm',
      foreignKey: 'dorm_id',
      // attributes: {
      //   exlude: ['password', 'createdAt', 'updatedAt']
      //   // include: ['id', 'fullname', 'email', 'phone']
      // }
    });
  };
  return booking;
};