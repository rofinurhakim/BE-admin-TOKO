'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactiondetail = sequelize.define('transaction_detail', {
    id: {
        defaultValue: DataTypes.UUID4,
        type: DataTypes.UUID,
        primaryKey: true
    },
    productsId: DataTypes.STRING,
    transactionId: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {});

  return transactiondetail;
};