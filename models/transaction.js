'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    userId: {
        defaultValue: DataTypes.UUID,
        type: DataTypes.UUID,
        primaryKey: true
    },
    status: DataTypes.INTEGER,
   
  }, {});

  return transaction;
};