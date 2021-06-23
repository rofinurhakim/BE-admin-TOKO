"use strict";
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define(
    "transaction",
    {
      transaction_id: {
        defaultValue: DataTypes.UUID4,
        type: DataTypes.UUID,
        primaryKey: true,
      },
      user_id: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {}
  );
  transactions.associate = function(models) {
    // associations can be defined here
    transactions.belongsTo(models.user, {
      as: 'userData',
      foreignKey: 'user_id',
    });
  };
  return transactions;
};