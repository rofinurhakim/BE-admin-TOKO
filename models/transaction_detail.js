  
"use strict";
module.exports = (sequelize, DataTypes) => {
  const transaction_detail = sequelize.define(
    "transaction_detail",
    {
      
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        default: DataTypes.UUID4
      },
      product_id: DataTypes.STRING,
      transaction_id: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER
    },
    {
        tableName: 'transaction_detail',
    }
  );
 
  return transaction_detail;
};