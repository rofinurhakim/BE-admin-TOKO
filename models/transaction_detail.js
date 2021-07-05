"use strict";
module.exports = (sequelize, DataTypes) => {
  const transactions_details = sequelize.define(
    "transactions_details", // ini nama tabelnya ya sodara2 coba sesuaikan
    {
      transaction_id: {
        defaultValue: DataTypes.UUID4,
        type: DataTypes.UUID,
      },
      product_id: DataTypes.STRING,
      qty:DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER
    },
    {}
  );

  // line ini saya comment dlu ya
  // transactions_details.associate = function(models) {
  //   transactions.belongsTo(models.user, {
  //     as: 'userData',
  //     foreignKey: 'user_id',
  //   });
  // };
  return transactions_details;
};




